---
title: "A Copy-and-Patch JIT for Threaded Interpreters"
date: "2026-09-08"
---

Paper by **Dave Mason and Nishil Kapadia**, published for the [International Workshop on Smalltalk Technologies (IWST 2026)](https://conf.researchr.org/track/iwst-2026/iwst-2026-papers#program).

## Abstract

Threaded interpreters are a practical foundation for dynamic language virtual machines, but their frequent indirect dispatch incurs significant execution overhead. At the other end of the design spectrum, optimizing JIT compilers can reduce this cost but require substantial compiler infrastructure and long-term engineering investment. This paper presents a copy-and-patch JIT compiler for threaded interpreters in the Zag Smalltalk VM, implemented in Zig, as a middle-tier alternative between pure interpretation and full optimizing compilation. Our approach reuses existing threaded functions as machine-code templates. At runtime, the system extracts patchable threaded-function regions, copies them into executable memory, relocates PC-relative instructions, and rewrites control-flow edges to construct method-specific native execution paths. The current version targets a bounded but practical subset of Smalltalk threaded functions, including stack operations, control-flow operations, inline arithmetic primitives, and send/return paths. On AArch64, the copy-and-patch tier preserves observed behavior and delivers consistent speedups of about five percent on tested Fibonacci inputs, while dispatch-heavy micro-benchmarks reach up to 1.54× speedup over the threaded baseline. These gains remain bounded by send-heavy execution paths and by the current prototype implementation.

[Read the paper](https://zenodo.org/records/22658315)
