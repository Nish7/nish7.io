---
title: "Copy-and-Patch with Zig"
date: "2025-11"
---

Copy-and-Patch (CnP) Compilation presents an interesting approach for building a [baseline JIT](https://stackoverflow.com/a/59668640). CnP was originally introduced by this [paper](https://fredrikbk.com/publications/copy-and-patch.pdf), which proposes reusing existing Ahead-of-Time (AOT) compiler code generation. Instead of relying on a full optimizing backend ([LLVM](https://clang.llvm.org/)), it produces machine code directly by generating small code snippets for each operation. These snippets are then patched together at runtime to form executable code segments efficiently.

- “stencils” are pre-compiled machine code fragments with “holes” for things like constants, stack offsets or branch targets.

For runtime, the algorithm is simple:

1. Choose appropriate stencil variant based on the AST or bytecode to compile.
2. Copy the selected stencils binary code into an output memory
3. Patch the “hole” with concrete value for the invocation (eg. literal values, actual jump offset) to produce final machine code.

This achieved a good balance of low compile overhead and decent execution performance

Fun Fact: Several high performance runtime relies on CnP 

- V8 (Chrome Javascript Engine) — Used in their previous baseline JIT (TurboFan)
- [LuaJIT (LuaJIT Remake)](https://sillycross.github.io/2023/05/12/2023-05-12/)
- [PyPy](https://docs.python.org/3/whatsnew/3.13.html#an-experimental-just-in-time-jit-compiler)

Most of the [work](https://scot.tg/2024/12/22/worked-example-of-copy-and-patch-compilation/) around CnP (JIT as well) usually uses C and C++ for its stencil library, and that’s entirely reasonable. You get meta-programming, memory control, and low-level control. Also, nearly every example uses the x86-64 architecture, with either none or little relevance given to the support provided for other architectures. One of the benefits of CnP is also being architecture/platform agnostic (to some degree), since it relies on the AOT compiler backend to produce the stencils for various architectures. 

I’ve been messing around with Zig for some time now, and I thought it would be interesting to see how Zig holds up against C and C++ in the compiler domain.

For those new to it, here’s a quick primer on Zig: a relatively new language with explicit memory control (think C, but with guardrails), compile-time code execution, and an extensive build system. [Read more here](https://ziglang.org/learn/overview/).

To understand CnP better, our goal will be to create standalone Copy and Patch Compiler using Zig.

## Objective

To keep things scoped, my first milestone these are my objectives:

- Generate a Stencil Library for supported operations.
- Parse basic arithmetic “calculator” expressions and produce a bytecode stream.
    - “2 + 3” = 5 . “2 * 4" = 8
- Choose appropriate stencil based on bytecode and allocate on an executable buffer
- Code Generation on ARM64 (AArch64)
    - Scoped to ARM64 due lack of any documentation available
    - However, will be try to keep it agnostic as much as possible

## Frontend

To keep things simple on the frontend side, I will stick to using “[Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)” as my expression input notation and use a stack based approach to evaluate and emit appropriate stencil. 

Implementation is trivial: Use `std.mem.tokenizeScalar` as a lexer (delimiting on whitespace) and parse using a `switch`-case. See `expression.zig` if interested. It returns a slice of `Expression` structs representing the operations, along with an allocator to use.

```zig
    /// Parse a simple RPN expression
    /// Format: "2 3 + 4 *" means (2 + 3) * 4
    pub fn parse(allocator: std.mem.Allocator, input: []const u8) !Expression {
        var ops: std.ArrayList(Operation) = .empty;
        errdefer ops.deinit(allocator);

        var iter = std.mem.tokenizeScalar(u8, input, ' ');
        while (iter.next()) |token| {
            if (std.mem.eql(u8, token, "+")) {
                try ops.append(allocator, .{ .op_type = .add });
            } else if (std.mem.eql(u8, token, "-")) {
                try ops.append(allocator, .{ .op_type = .sub });
            } else if (std.mem.eql(u8, token, "*")) {
                try ops.append(allocator, .{ .op_type = .mul });
            } else if (std.mem.eql(u8, token, "/")) {
                try ops.append(allocator, .{ .op_type = .div });
            } else if (std.mem.eql(u8, token, "neg")) {
                try ops.append(allocator, .{ .op_type = .neg });
            } else {
                // Try to parse as number
                const value = std.fmt.parseInt(i64, token, 10) catch {
                    std.debug.print("Error: unknown token '{s}'\n", .{token});
                    return error.InvalidToken;
                };
                try ops.append(allocator, .{ .op_type = .load_const, .value = value });
            }
        }

        const operations = try ops.toOwnedSlice(allocator);
        return Expression{
            .operations = operations,
            .allocator = allocator,
        };
    }

```

## Copy

Now we go into more interesting stuff, as the name suggest we will start by discussing “copy” part of the technique. We need to decide on operations our compiler needs support for basic arithmetic calculations:

Instruction set stays intentionally small and self-explanatory.

```zig
1. add
2. sub
3. div
4. mul
5. push_const
6. pop_return
```

### Stencils Library

CnP is built around small, pre-compiled “stencils” that implement each operation in the instruction set. At first glance this looks straightforward. You might imagine writing a simple `add` function that takes two arguments and returns their sum:

```zig
pub fn add(a: i32, b: i32) i32 {
    return a + b;
}
```

But that naïve approach doesn’t work. The copy-and-patch model doesn’t call functions in the traditional sense, as it copies their machine code into a runtime buffer and executes it directly. 

Standard calling conventions break here because each stencil must integrate seamlessly into a continuous stream of generated code. Will discuss more on calling conventions later.

To make this work, every stencil will operate on a shared context pointer `ctx`, passed in a fixed register. This context holds the virtual machine’s state: stack, registers, instruction pointer, etc. Each stencil will read and write through that pointer. 

```zig
pub export fn add_stencil(ctx: *Context) callconv(.c) void {
    @setRuntimeSafety(false);
    ctx.sp -= 1;
    const b = ctx.stack[ctx.sp];
    ctx.sp -= 1;
    const a = ctx.stack[ctx.sp];
    ctx.stack[ctx.sp] = a + b;
    ctx.sp += 1;
}
```

Context Structure looks something like this:

```zig

pub const Context = struct {
    stack: [256]i64,
    sp: usize,

    pub fn init() Context {
        return .{
            .stack = [_]i64{ 3, 5 } ++ [_]i64{undefined} ** 254,
            .sp = 2,
        };
    }
};
```

We can simply follow same pattern across stencils for each operation.

### Tail Call vs Continuous Buffer

One of the key design decisions is how stencils connect to one another. There are two main strategies: tail call chaining and direct concatenation.

Tail call chaining treats each stencil like a self-contained function that ends by jumping to the next operation’s entry point:

- This design is conceptually simple and modular. Each stencil is a callable unit.
- However, it does introduce branch overhead.
- Every transition between stencils becomes a control-flow jump.
- Which can degrade instruction cache locality and slow down tight loops.

[More on Tail Call Optimization](https://exploringjs.com/es6/ch_tail-calls.html)

```zig
[stencil-A code] → jump → [stencil-B code] → jump → [stencil-C code] …
```

Concatenation: eliminates those jumps entirely. Instead we will link stencils through calls, the compiler directly copies their machine code into a single continuous buffer.

- Each stencil flows into the next, forming a single native code block.
- This avoids branch penalties and improves locality
- Complexity: Manually mange memory alignment, patching, buffer growth safety.

```asm
[stencil-A code][stencil-B code][stencil-C code]…
```

Most existing implementations and tutorials rely on the tail call model because of its simplicity. However, it would be interesting explore the performance implications of implementing a continuous layout.

### Calling Convention

Before we start assembling stencils into executable sequences, we first must understand how and what each stencil emits that requires stitching. Modern compilers generate machine code according to a calling convention, which defines how functions pass arguments, return values, and manage registers at the CPU level. When working with these low-level code fragments, it becomes critical to understand how registers are allocated, how argument values persist across fragments, and how return results are handled. Without a clear model of register and value management, stitched stencils cannot execute coherently or safely. 

Different Application Binary Interfaces (ABIs) define their own conventions for example, which registers hold arguments, where return values are placed, and which registers must be preserved across calls. 

This rules are enforced through stack frame management using the frame pointer and link register (return address) to maintain call structure.  Function prologues and epilogues handle this setup in the compiled programs.  The system ABI documentation like [System V AMD64 ABI](https://refspecs.linuxbase.org/elf/x86_64-abi-0.99.pdf) for more information.

```bash
stp     x29, x30, [sp, #-16]!    // prologue
mov     x29, sp

mov     w0, #42                  // body: return value in w0

ldp     x29, x30, [sp], #16      // epilogue
ret
```

In copy-and-patch, we are primarily concerned with the bodies of stencils, these are the  instruction sequences that implement actual behaviour. We deliberately omit function prologues and epilogues, since there is no stack frame to manage within stitched regions. Only the entry stencil requires a prologue to establish the initial frame, and only the final stencil needs an epilogue to restore state and return. Everything between them remains as raw, frame-free instruction bodies ready for direct concatenation or patching. This is fantastic [introductory](https://www.bottomupcs.com/ch08s07.html) resource for ABIs and Calling Conventions.

The real question is how to implement this. This is where Zig becomes problematic. Zig currently lacks [support](https://ziglang.org/documentation/master/std/#std.builtin.CallingConvention) for [`preserve_none`](https://clang.llvm.org/docs/AttributeReference.html#preserve-none)` and the GCC-style callee-saved calling conventions. This limitation exposes Zig’s immaturity.

```c
__attribute__((preserve_none))
void stencil_op(int64_t *ctx);
```

In C, we could use  `__attribute__((preserve_none))` allows direct emission of the *instruction body* without prologue or epilogue, producing exactly the raw code needed for a stencil. Zig does offers a `naked` calling convention that produces similar output. stripped of stack setup and teardown but it is primarily intended for inline assembly blocks. This means while `naked` functions can approximate the desired behaviour but they do not provide the same  register preservation or ABI flexibility that `preserve_none` enables.

Zig also has handy [`setRuntimeSafety`](https://zig.guide/master/language-basics/runtime-safety/) builtin to disable bounds checking and other safety features in the stencil bodies. This is necessary because runtime safety checks introduce additional instructions and branches that would interfere with our patching offsets and break the predictable instruction layout we depend on.  

We’ll handle this manually by writing helper functions to strip prologues and epilogues from generated stencils. This must be done per ISA, since each architecture will be emitting different entry and exit sequences. Not the most elegant but it works.

### Executable Buffer

To Execute the stitched machine code produced by our library, we need a region of memory that is both writable and executable. The simplest to way to this on POSIX is to allocate a page aligned buffer using `mmap`.

```zig
pub fn allocateExecutableMemory(size: usize) ![]align(std.heap.pageSize()) u8 {
    const page = std.heap.pageSize();
    const aligned_size = std.mem.alignForward(usize, size, page);

    const prot = std.posix.PROT.READ | std.posix.PROT.WRITE;
    const flags = std.posix.MAP{ .TYPE = .PRIVATE, .ANONYMOUS = true, .JIT = true };

    const ptr = try std.posix.mmap(
        null,
        aligned_size,
        prot,
        flags,
        -1,
        0,
    );

    const aligned_ptr: [*]align(page) u8 = @ptrCast(@alignCast(ptr));
    return aligned_ptr[0..aligned_size];
}
```

This returns a page-aligned `[]u8` slice backed by memory suitable for JIT code. The alignment is required because most operating systems enforce page-granularity permission changes when converting RW pages to RX.

If you write into an RX or protected JIT region without disabling protection, you will run into  `SIGBUS` or `EXC_BAD_ACCESS` if your write is performed via normal stores. This due to the fact Apple platforms (my local machine) with hardened runtime, executable pages are subject to write-xor-execute ([W^X](https://en.wikipedia.org/wiki/W%5EX)) enforcement (similar to [DEP](https://learn.microsoft.com/en-us/windows/win32/memory/data-execution-prevention) in Windows and [`allow_execmem`](https://unix.stackexchange.com/questions/271451/filebased-selinux-booleans) in Linux).   If you skip [`pthread_jit_write_protect_np`](https://keith.github.io/xcode-man-pages/pthread_jit_write_protect_np.3.html) and try to write into the buffer, the kernel blocks the write.  What we need to fix this:

1. `pthread_jit_write_protect_np(0)` (disable JIT write protection). 
2. Copy your stencil bytes into the buffer.
3. `pthread_jit_write_protect_np(1)` (re-enable protection)
4. Use `mprotect` to flip RW → RX

Now we we can simply `memcpy` function bytes and let it rip

```zig
test "allocate executable memory" {
    const memory = try allocateExecutableMemory(4096);
    defer freeExecutableMemory(memory);

    try std.testing.expect(memory.len >= 4096);

    pthread_jit_write_protect_np(0);

    // Write a simple "return 42" function
    // mov x0, #42; ret
    const code = [_]u8{ 0x40, 0x05, 0x80, 0xD2, 0xC0, 0x03, 0x5F, 0xD6 };
    std.debug.print("code: {X}\n", .{code});
    @memcpy(memory[0..code.len], &code);

    pthread_jit_write_protect_np(1);

    try std.posix.mprotect(memory, std.posix.PROT.READ | std.posix.PROT.EXEC);

    const func: *const fn () callconv(.c) i64 = @ptrCast(@alignCast(memory.ptr));
    const result = func();

    try std.testing.expectEqual(@as(i64, 42), result);
}
```

## Patch

With the parser, the stencil library and executable buffer allocated, the next piece is the patch half of the CnP workflow. We will discuss the patching mechanism and design choices to make here.

### Patch Marker “hole”

For most stencils in the instruction set, we don’t need any patchable “holes” because they operate entirely through the shared context pointer and manipulate the virtual stack to perform arithmetic. The `push_const` stencil is the exception. It must embed a literal value, but that value is only known at compile time for the caller, not when the stencil itself is generated. To handle this, the stencil needs a placeholder inside its machine-code bytes. That placeholder is the patch marker, and it will be overwritten at runtime with the actual constant.

Although we store single type of value in hole, production system may have:

- register or stack offsets
- branch targets
- continuation address with the tail-call systems

So to finalize the `push_const` stencil, we deliberately insert a marker value (ideally 64 bits) into the generated code. This marker gives us a reliable location to patch later. At runtime, the compiler scans for that marker, identifies the corresponding offset in the stencil, and overwrites it with the actual constant that needs to be pushed.

### Relocations

The [common](https://transactional.blog/copy-and-patch/tutorial) way to implement patching is to rely on the relocation table that the compiler and linker generate for an object file. When we compile a stencil ahead of time, we deliberately reference an external symbol of a chosen type. That reference becomes a placeholder in the machine code. The compiler and linker then emit a relocation entry that points to the exact offset in the binary where that placeholder lives.

At runtime, we simply read the relocation metadata and patch the value directly into the copied stencil. The relocation table tells us precisely where each hole is and how large it is.

so we could expect something like this for our stencil for x86.

```zig
pub extern var HOLE_MARKER: u64;

pub export fn push_const_stencil(ctx: *Context) callconv(.c) void {
    @setRuntimeSafety(false);
    const value: i64 = @bitCast(HOLE_MARKER);
    ctx.stack[ctx.sp] = value;
    ctx.sp += 1;
}
```

```bash
$ zig build-obj stencils.zig -O ReleaseFast -target x86_64-linux -fno-PIC && objdump -d --reloc stencils.o

00000040 <push_const_stencil>:
      40: 55                           	pushl	%ebp
      41: 89 e5                        	movl	%esp, %ebp
      43: 8b 45 08                     	movl	0x8(%ebp), %eax
      46: f2 0f 10 05 00 00 00 00      	movsd	0x0, %xmm0
			0000004a:  R_386_32	HOLE_MARKER
      4e: 8b 88 00 08 00 00            	movl	0x800(%eax), %ecx
      54: f2 0f 11 04 c8               	movsd	%xmm0, (%eax,%ecx,8)
      59: ff 80 00 08 00 00            	incl	0x800(%eax)
      5f: 5d                           	popl	%ebp
      60: c3                           	retl
      61: 66 2e 0f 1f 84 00 00 00 00 00	nopw	%cs:(%eax,%eax)
      6b: 0f 1f 44 00 00               	nopl	(%eax,%eax)
```

On x86-64, this produces the expected output: a move-immediate instruction containing a relocation entry referring to `HOLE_MARKER`. In the object file you’ll see a relocation against that symbol.

But AArch64 doesn’t give the same result:

```bash
$  zig build-obj stencils.zig -O ReleaseFast -target aarch64-macos && objdump -d --reloc stencils.o

0000000000000040 <_push_const_stencil>:
      40: a9bf7bfd     	stp	x29, x30, [sp, #-0x10]!
      44: 910003fd     	mov	x29, sp
      48: 90000008     	adrp	x8, 0x0 <ltmp0>
		0000000000000048:  ARM64_RELOC_GOT_LOAD_PAGE21	_HOLE_MARKER
      4c: f9400108     	ldr	x8, [x8]
		000000000000004c:  ARM64_RELOC_GOT_LOAD_PAGEOFF12	_HOLE_MARKER
      50: f9400108     	ldr	x8, [x8]
      54: f9440009     	ldr	x9, [x0, #0x800]
      58: f8297808     	str	x8, [x0, x9, lsl #3]
      5c: f9440008     	ldr	x8, [x0, #0x800]
      60: 91000508     	add	x8, x8, #0x1
      64: f9040008     	str	x8, [x0, #0x800]
      68: a8c17bfd     	ldp	x29, x30, [sp], #0x10
      6c: d65f03c0     	ret
```

There are several reasons:

1. AArch64 does not support arbitrary 64-bit immediates in one instruction.
    
    The architecture cannot encode a full 64-bit constant directly inside a single instruction. It must synthesize it through multiple instructions (typically ADRP + LDR). Because of that, the compiler does not generate a relocatable immediate the way x86 does.
    
2. The relocation model is more complex.
    
    [ARM64 relocations](https://github.com/ARM-software/abi-aa/blob/main/aaelf64/aaelf64.rst#relocation) often target *pages* (high 21 bits) and *page offsets*, not a raw literal slot. This is ideal for position-independent code but inconvenient when you want a simple “write 8 bytes here” hole.
    
3. The compiler may fold, optimize, or lower the constant differently.
    
    Even with an external symbol, the compiler might choose a code sequence that scatters the relocation across multiple instructions rather than creating a single memory location to patch.
    
4. Literal pools are separate structures.
    
    AArch64 may place the referenced constant into a literal pool instead of inline, so the relocation refers to a pool entry rather than an immediate embedded in the instruction stream. That’s useless for CnP unless you specifically design around literal pools.
    

### Magic Number

Instead, what we are going to do is embed magic constant directly into the instruction stream, We can then scan for that value inside the stencil’s machine code. The scanner finds the constant, records the offset, and at patch time we overwrite that slot with the real value.

You can also skip scanning entirely by precomputing the offset once, storing it alongside the stencil, and reusing it every time. 

For example, the magic number something like:

```zig
const value: i64 = 0x123456780ABCDEF0; // 16 bits
```

The compiler is forced to create this constant and emit a sequence that will store it in a register. This constant is intentionally chosen to be large and odd-shaped to avoid the code generator (LLVM) optimizations.  The compiler then must materialize it somehow; on AArch64 it does so using a standard sequence of [MOVZ/MOVK](https://developer.arm.com/documentation/ddi0602/latest/Base-Instructions/MOVZ--Move-wide-with-zero-) instructions that reconstruct the 64-bit value in a register.

Note: Sometimes it instead uses a PC-relative load from a literal pool usually for very large values

```bash
...
10: f2a15789     	movk	x9, #0xabc, lsl #16
14: f2cacf09     	movk	x9, #0x5678, lsl #32
18: f2e24689     	movk	x9, #0x1234, lsl #48
...
```

Each `mov{z,k}` encodes a 16-bit chunk of the constant. Those chunks appear directly in the instruction encoding

This is how we can patch the immediate fields of those instructions with the new pieces.

```zig
patchArm64Immediate(patched_code[4..8], @intCast((bits >> 0) & 0xFFFF));
```

```zig
fn patchArm64Immediate(instruction: []u8, imm16: u16) void {
	if (instruction.len < 4) return;
  var current_instr = std.mem.readInt(u32, instruction[0..4], .little);     
  current_instr &= ~(@as(u32, 0xFFFF) << 5);
  current_instr |= (@as(u32, imm16) << 5);
  std.mem.writeInt(u32, instruction[0..4], current_instr, .little);
}
```

### Results

We can now compile and execute a full expression. The following Zig test drives the entire pipeline end-to-end:

```zig
test "compile expression" {
    var compiler = try CnPCompiler.init(std.testing.allocator, 4096);
    defer compiler.deinit();

    const expr = try expression.Expression.parse(std.testing.allocator, "5 3 8 * 2 / + 4 6 * -");
    defer expr.deinit();

    const func = try compiler.compile(expr);

    var ctx = Context.init();
    const result = func(&ctx);
    
    std.debug.print("= {d}\n", .{result});
    try std.testing.expectEqual(@as(i64, -7), result);
}
```

This test exercises multiple stencil types, forces patching of immediate, and verifies that the stitched machine code behaves correctly when executed through a raw function pointer. 

The evaluation is performed entirely by the generated native code.

```bash
$ zig test compiler.zig -O ReleaseFast --test-filter "compile expression"

Expression: Expression: 5 3 8 * 2 / + 4 6 * - = -7
All 1 tests passed.
```

We can also dump the executable buffer to inspect the generated assembly bytes.

This is for `try expression.Expression.parse(std.testing.allocator, "2 + 3");`

```bash
0x00000000:  FD 7B BF A9    stp   x29, x30, [sp, #-0x10]!
0x00000004:  FD 03 00 91    mov   x29, sp
0x00000008:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x0000000C:  49 00 80 D2    movz  x9, #0x2
0x00000010:  09 00 A0 F2    movk  x9, #0x0, lsl #16
0x00000014:  09 00 C0 F2    movk  x9, #0x0, lsl #32
0x00000018:  09 00 E0 F2    movk  x9, #0x0, lsl #48
0x0000001C:  09 78 28 F8    str   x9,  [x0, x8, lsl #3]
0x00000020:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000024:  08 05 00 91    add   x8,  x8, #1
0x00000028:  08 00 04 F9    str   x8,  [x0, #0x800]
0x0000002C:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000030:  09 05 00 D1    sub   x9,  x8, #1
0x00000034:  09 00 04 F9    str   x9,  [x0, #0x800]
0x00000038:  09 78 69 F8    ldr   x9,  [x0, x9, lsl #3]
0x0000003C:  08 09 00 D1    sub   x8,  x8, #2
0x00000040:  08 00 04 F9    str   x8,  [x0, #0x800]
0x00000044:  0A 78 68 F8    ldr   x10, [x0, x8, lsl #3]
0x00000048:  49 01 09 8B    add   x9,  x10, x9
0x0000004C:  09 78 28 F8    str   x9,  [x0, x8, lsl #3]
0x00000050:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000054:  08 05 00 91    add   x8,  x8, #1
0x00000058:  08 00 04 F9    str   x8,  [x0, #0x800]
0x0000005C:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000060:  69 00 80 D2    movz  x9, #0x3
0x00000064:  09 00 A0 F2    movk  x9, #0x0, lsl #16
0x00000068:  09 00 C0 F2    movk  x9, #0x0, lsl #32
0x0000006C:  09 00 E0 F2    movk  x9, #0x0, lsl #48
0x00000070:  09 78 28 F8    str   x9,  [x0, x8, lsl #3]
0x00000074:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000078:  08 05 00 91    add   x8,  x8, #1
0x0000007C:  08 00 04 F9    str   x8,  [x0, #0x800]
0x00000080:  08 00 44 F9    ldr   x8,  [x0, #0x800]
0x00000084:  08 05 00 D1    sub   x8,  x8, #1
0x00000088:  08 00 04 F9    str   x8,  [x0, #0x800]
0x0000008C:  00 78 68 F8    ldr   x0,  [x0, x8, lsl #3]
0x00000090:  FD 7B C1 A8    ldp   x29, x30, [sp], #0x10
0x00000094:  C0 03 5F D6    ret
```

### Challenges

- Architecture Fragility: The approach depends heavily on whatever code sequences the AOT compiler emits. When LLVM changes it logic, you stencil may silently change. Your patch logic become tied to exact instruction encoding. ARM64 is especially brittle due to MOVZ/MOVk encoding rules.
- In Theory, CnP is architecture-agnotic. In practice, i ended up writing ISA-specific strip logic, patch -logic, immediate encoding, scanner tooling. each architecture has own quirks:
    - x86: many ways to encode the sam constant
    - ARM64: require multi instruction materialization
    
    Keeping one portable code path is difficult.
    
- Debugging Burden: CnP Debugging happens after compilation. When a stencil misbehaves, we will have to inspect disassemble and machine encoding mismatches. Tooling around this is poor right now. We start to rely on the manual inspection using `objdump` .

### Future Work

- Extend the instruction set to handle control-flow (branches, loops, calls).
- Conduct large-scale benchmarks (e.g., Fibonacci recursion, summing 1 billion elements) to assess performance and compilation trade-offs.
- Address architecture-agnostic behaviour: verify and support multiple ISAs (x86-64, AArch64, RISCV, etc) and ensure stencil extraction, relocation and patching work uniformly.

Hopefully, this documents a practical, minimally viable CnP implementation on ARM64 using Zig. Noting, real constraints with LLVM, AVI and explain why typical x86 based work might not generalize.  

btw github link: https://github.com/Nish7/Mini-CnP/
