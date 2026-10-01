---
title: "Object Encodings for Dynamically Typed Languages"
date: "2026-09-08"
---

Paper by **Dave Mason and Nishil Kapadia**, published for the [International Workshop on Smalltalk Technologies (IWST 2026)](https://conf.researchr.org/track/iwst-2026/iwst-2026-papers#program).

## Abstract

In dynamically typed programming languages, variables and expressions do not have types associated with them; instead, values have types. This means that selecting the correct machine instructions to operate on data requires run-time dispatch based on the types associated with the values. The simplest encoding strategy is to store every object in a memory heap, where each object is tagged with its type. This approach places significant pressure on both the memory subsystem and the memory allocation system. At the other extreme, the most complex encoding strategies place as many values as possible into immediate representations to reduce this pressure.

This paper describes seven different encoding strategies, ranging from all-memory representations to NaN-based encodings and evaluates their relative performance compared with a baseline implementation that uses no encoding. We evaluate their relative performance on two architectures (AArch64 and x86-64) using recursive Fibonacci benchmarks that stress both integer and floating-point arithmetic paths under inlined and non-inlined dispatch. Our results reveal a fundamental performance trade-off: encoding with minimal tag-width achieves the fastest integer arithmetic but must heap-allocate floats, while NaN-boxing stores doubles without the overhead but penalizes integer extractions. Heap-only (ptr) encodings incur order-of-magnitude penalties from cache pressure regardless of architecture. Spur encoding achieves good performance in some cases, but loses in more complex situations. This paper also introduces the Zag encoding, which achieves better overall performance to NaN-boxing across both workloads while offering a wider immediate integer range (55-bit versus 47-bit) and direct class identification without memory lookups.

[Read the paper](https://zenodo.org/records/22657740)
