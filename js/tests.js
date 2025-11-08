/**
 * JavaScript Tests for Lights Out Game
 * These tests run in the browser and validate the actual implementation used by the web app
 */

import { solveLightsOut, simulatePress } from './js/solver.js';

// Test utilities
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function boardsEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((row, i) => arraysEqual(row, b[i]));
}

// Test cases
function test3x3Example() {
    console.log("Running 3x3 example test...");
    const board = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const solution = solveLightsOut(board);
    assert(solution !== null, "Solution should exist");

    const finalBoard = simulatePress(board, solution);
    const solved = finalBoard.every(row => row.every(cell => cell === 0));
    assert(solved, "Board should be solved");

    console.log("✓ 3x3 test passed");
}

function testAlreadySolved() {
    console.log("Running already solved test...");
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const solution = solveLightsOut(board);
    const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    assert(arraysEqual(solution, expected), "Solution should be all zeros");

    console.log("✓ Already solved test passed");
}

function test4x4() {
    console.log("Running 4x4 test...");
    const board = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    const solution = solveLightsOut(board);
    console.log(`4x4 solution exists: ${solution !== null}`);

    if (solution !== null) {
        const finalBoard = simulatePress(board, solution);
        const solved = finalBoard.every(row => row.every(cell => cell === 0));
        console.log(`4x4 solved: ${solved}`);
        assert(solved, "4x4 should be solvable");
    }

    console.log("✓ 4x4 test passed");
}

function test5x5() {
    console.log("Running 5x5 test...");
    const board = Array(5).fill().map(() => Array(5).fill(0));
    board[2][2] = 1; // Center light

    const solution = solveLightsOut(board);
    console.log(`5x5 solution exists: ${solution !== null}`);

    if (solution !== null) {
        const finalBoard = simulatePress(board, solution);
        const solved = finalBoard.every(row => row.every(cell => cell === 0));
        console.log(`5x5 solved: ${solved}`);
        assert(solved, "5x5 should be solvable");
    }

    console.log("✓ 5x5 test passed");
}

// Run tests when this script is loaded
window.runJSTests = function() {
    try {
        test3x3Example();
        testAlreadySolved();
        test4x4();
        test5x5();
        console.log("🎉 All JavaScript tests passed!");
        return true;
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        return false;
    }
};

// Auto-run tests if this is loaded directly (for debugging)
if (typeof window !== 'undefined' && window.location) {
    console.log("JavaScript tests loaded. Run window.runJSTests() to execute.");
}