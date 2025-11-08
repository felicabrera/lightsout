/**
 * Lights Out Game Logic Module
 *
 * Core game mechanics for the Lights Out puzzle game.
 */

/**
 * Toggles a light and its adjacent neighbors on the board.
 * @param {number[][]} board - The current game board
 * @param {number} row - Row index of the light to toggle
 * @param {number} col - Column index of the light to toggle
 * @returns {number[][]} - New board state after toggling
 */
export function toggleLight(board, row, col) {
    const n = board.length;
    const newBoard = board.map(row => [...row]); // Deep copy

    // Toggle center light
    newBoard[row][col] = 1 - newBoard[row][col];

    // Toggle adjacent lights (up, down, left, right)
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
            newBoard[newRow][newCol] = 1 - newBoard[newRow][newCol];
        }
    }

    return newBoard;
}

/**
 * Checks if the game is won (all lights are off).
 * @param {number[][]} board - The game board to check
 * @returns {boolean} - True if all lights are off, false otherwise
 */
export function checkWinCondition(board) {
    return board.every(row => row.every(cell => cell === 0));
}

/**
 * Creates a random initial board state.
 * @param {number} size - Size of the board (n x n)
 * @returns {number[][]} - Randomly initialized board
 */
export function createRandomBoard(size) {
    let board = Array(size).fill().map(() => Array(size).fill(0));

    // Toggle random lights to create initial puzzle
    const lightsToToggle = Math.floor(Math.random() * (size * size / 2)) + 1;
    for (let i = 0; i < lightsToToggle; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        board = toggleLight(board, row, col);
    }

    return board;
}

/**
 * Creates an empty board of given size.
 * @param {number} size - Size of the board (n x n)
 * @returns {number[][]} - Empty board (all lights off)
 */
export function createEmptyBoard(size) {
    return Array(size).fill().map(() => Array(size).fill(0));
}