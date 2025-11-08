/**
 * Lights Out Solver Module
 *
 * Mathematical solver using Gaussian elimination over Z₂ (finite field).
 */

/**
 * Solves the Lights Out puzzle for a given board configuration using Gaussian elimination over Z₂.
 * @param {number[][]} board - n x n matrix where 0 represents off, 1 represents on
 * @returns {number[]|null} - Array of length n*n where 1 indicates light should be pressed, 0 otherwise.
 *                           Returns null if no solution exists.
 */
export function solveLightsOut(board) {
    if (!board || !board[0]) {
        return [];
    }

    const n = board.length;
    if (board.some(row => row.length !== n)) {
        throw new Error("Board must be square");
    }

    const size = n * n;

    // Create adjacency matrix A (size x size)
    const A = Array(size).fill().map(() => Array(size).fill(0));

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const i = r * n + c;
            // Self
            A[i][i] = 1;
            // Up
            if (r > 0) {
                A[(r-1)*n + c][i] = 1;
            }
            // Down
            if (r < n-1) {
                A[(r+1)*n + c][i] = 1;
            }
            // Left
            if (c > 0) {
                A[r*n + (c-1)][i] = 1;
            }
            // Right
            if (c < n-1) {
                A[r*n + (c+1)][i] = 1;
            }
        }
    }

    // Flatten board into vector b
    const b = [];
    for (const row of board) {
        b.push(...row);
    }

    // Create augmented matrix [A | b]
    const augmented = A.map((row, i) => [...row, b[i]]);

    // Gauss-Jordan elimination over Z₂
    for (let col = 0; col < size; col++) {
        // Find pivot
        let pivotRow = -1;
        for (let row = col; row < size; row++) {
            if (augmented[row][col] === 1) {
                pivotRow = row;
                break;
            }
        }
        if (pivotRow === -1) {
            continue; // No pivot, skip
        }

        // Swap rows if needed
        if (pivotRow !== col) {
            [augmented[col], augmented[pivotRow]] = [augmented[pivotRow], augmented[col]];
        }

        // Eliminate
        for (let row = 0; row < size; row++) {
            if (row !== col && augmented[row][col] === 1) {
                for (let j = 0; j < size + 1; j++) {
                    augmented[row][j] ^= augmented[col][j];
                }
            }
        }
    }

    // Check for inconsistencies
    for (let row = 0; row < size; row++) {
        const isZeroRow = augmented[row].slice(0, size).every(val => val === 0);
        if (isZeroRow && augmented[row][size] === 1) {
            return null; // Inconsistent
        }
    }

    // Extract solution
    const solution = augmented.map(row => row[size]);
    return solution;
}

/**
 * Simulates pressing lights according to the solution and returns the final board state.
 * @param {number[][]} board - Original board
 * @param {number[]} presses - Which lights to press (1=press, 0=don't)
 * @returns {number[][]} - Final board state
 */
export function simulatePress(board, presses) {
    const n = board.length;
    const result = board.map(row => [...row]); // Deep copy

    for (let i = 0; i < presses.length; i++) {
        if (presses[i] === 1) {
            const r = Math.floor(i / n);
            const c = i % n;

            // Toggle self and adjacent
            const positions = [[r, c]];
            if (r > 0) positions.push([r-1, c]);
            if (r < n-1) positions.push([r+1, c]);
            if (c > 0) positions.push([r, c-1]);
            if (c < n-1) positions.push([r, c+1]);

            for (const [pr, pc] of positions) {
                result[pr][pc] ^= 1;
            }
        }
    }

    return result;
}