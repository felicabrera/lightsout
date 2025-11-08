/**
 * Lights Out UI Module
 *
 * Handles rendering, user interactions, and DOM manipulation.
 */

import { toggleLight, checkWinCondition, createRandomBoard, createEmptyBoard } from './game-logic.js';

/**
 * Game state
 */
let boardSize = 5;
let board = [];
let moves = 0;
let gameWon = false;

/**
 * DOM elements
 */
let gameBoardElement;
let statusElement;
let gridSizeInput;

/**
 * Initializes the UI module
 */
export function initUI() {
    gameBoardElement = document.getElementById('game-board');
    statusElement = document.getElementById('status');
    gridSizeInput = document.getElementById('grid-size');

    // Set up event listeners
    document.getElementById('new-game-btn').addEventListener('click', handleNewGame);
    document.getElementById('reset-btn').addEventListener('click', handleReset);

    gridSizeInput.addEventListener('input', handleGridSizeInput);
    gridSizeInput.addEventListener('change', handleGridSizeChange);

    // Initialize game
    initGame();
}

/**
 * Initializes a new game with the current board size
 */
export function initGame() {
    // Use current boardSize if it's valid, otherwise read from input
    let size = boardSize;
    if (size < 2 || size > 12) {
        size = parseInt(gridSizeInput.value);
        if (size < 2 || size > 12) {
            size = 5; // Default fallback
        }
        boardSize = size;
        gridSizeInput.value = size;
    }

    board = createEmptyBoard(boardSize);
    moves = 0;
    gameWon = false;
    renderBoard();
    updateStatus();
}

/**
 * Starts a new random game
 */
function handleNewGame() {
    board = createRandomBoard(boardSize);
    moves = 0;
    gameWon = false;
    renderBoard();
    updateStatus();
}

/**
 * Resets the current board
 */
function handleReset() {
    board = createEmptyBoard(boardSize);
    moves = 0;
    gameWon = false;
    renderBoard();
    updateStatus();
}

/**
 * Handles grid size input validation and updates the game
 */
function handleGridSizeInput(e) {
    let value = parseInt(e.target.value);
    if (value < 2) {
        e.target.value = 2;
        value = 2;
    } else if (value > 12) {
        e.target.value = 12;
        value = 12;
    }

    // If the value actually changed, update the game
    if (value !== boardSize) {
        boardSize = value;
        initGame();
        board = createRandomBoard(boardSize);
        renderBoard();
        updateStatus();
    }
}

/**
 * Handles grid size change (for browsers that don't fire input on arrow keys)
 */
function handleGridSizeChange() {
    const value = parseInt(gridSizeInput.value);
    if (value !== boardSize) {
        boardSize = value;
        initGame();
        board = createRandomBoard(boardSize);
        renderBoard();
        updateStatus();
    }
}

/**
 * Handles light click events
 */
function handleLightClick(row, col) {
    if (gameWon) return;

    board = toggleLight(board, row, col);
    moves++;
    renderBoard();
    gameWon = checkWinCondition(board);
    updateStatus();
}

/**
 * Renders the game board
 */
function renderBoard() {
    gameBoardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    // Adjust styling based on grid size and screen size
    const isMobile = window.innerWidth <= 600;
    let baseSize, gapSize, paddingSize;

    if (boardSize <= 3) {
        baseSize = isMobile ? 50 : 60;
        gapSize = 4;
        paddingSize = '20px';
    } else if (boardSize <= 5) {
        baseSize = isMobile ? 40 : 50;
        gapSize = 2;
        paddingSize = '15px';
    } else {
        baseSize = isMobile ? 35 : 40;
        gapSize = 1;
        paddingSize = '10px';
    }

    gameBoardElement.style.gap = `${gapSize}px`;
    gameBoardElement.style.padding = paddingSize;

    gameBoardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const light = document.createElement('button');
            light.className = `light ${board[i][j] ? 'on' : ''}`;
            light.style.width = `${baseSize}px`;
            light.style.height = `${baseSize}px`;
            light.onclick = () => handleLightClick(i, j);
            gameBoardElement.appendChild(light);
        }
    }
}

/**
 * Updates the status display
 */
function updateStatus() {
    if (gameWon) {
        statusElement.innerHTML = `
            <div class="win-message">🎉 SOLVED!</div>
            <div class="move-counter">Moves: ${moves}</div>
        `;
    } else {
        statusElement.innerHTML = `<div class="move-counter">Moves: ${moves}</div>`;
    }
}