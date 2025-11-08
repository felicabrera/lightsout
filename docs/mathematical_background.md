# Mathematical Background

## The Lights Out Puzzle

The Lights Out game consists of an n×n grid of lights, each of which can be either on (1) or off (0). Pressing a light toggles its state and the states of its adjacent lights (up, down, left, right).

## Linear Algebra Formulation

The puzzle can be modeled as a system of linear equations over the finite field Z₂ (binary arithmetic, where 1+1=0).

### Variables
- **xᵢⱼ**: 1 if light at position (i,j) should be pressed, 0 otherwise
- **bᵢⱼ**: Initial state of light at position (i,j) (1 = on, 0 = off)

### Equations
For each light (i,j), the final state must be 0:

bᵢⱼ + xᵢⱼ + xᵢ₋₁ⱼ + xᵢ₊₁ⱼ + xᵢⱼ₋₁ + xᵢⱼ₊₁ ≡ 0 (mod 2)

Where terms are omitted if indices are out of bounds.

### Matrix Form
This becomes the system **Ax = b**, where:
- A is the n²×n² adjacency matrix
- x is the solution vector of length n²
- b is the initial board vector of length n²

## Gaussian Elimination over Z₂

The system is solved using Gauss-Jordan elimination adapted for binary arithmetic:
- All operations use XOR (^) instead of addition/subtraction
- No division needed since we're working modulo 2
- Row operations: Fᵢ ← Fᵢ ⊕ Fⱼ

## Solvability

Not all configurations are solvable. The rank of the adjacency matrix determines which initial states have solutions. For example:
- 3×3: Rank 8, most configurations solvable
- Larger grids may have unsolvable states

## Complexity

Time complexity: O(n⁶) for Gaussian elimination on n²×n² matrices, making it practical for small to medium grids.