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
let initialBoard = [];
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

    // Set initial max grid size based on screen width
    const maxSize = getMaxGridSize();
    gridSizeInput.max = maxSize;

    // Set up event listeners
    document.getElementById('new-game-btn').addEventListener('click', handleNewGame);
    document.getElementById('reset-btn').addEventListener('click', handleReset);

    gridSizeInput.addEventListener('input', handleGridSizeInput);
    gridSizeInput.addEventListener('change', handleGridSizeChange);

    // Handle window resize for responsive updates
    window.addEventListener('resize', handleWindowResize);

    // Initialize game
    initGame();
}

/**
 * Gets the maximum allowed grid size based on screen width
 */
function getMaxGridSize() {
    const width = window.innerWidth;
    if (width <= 360) return 5;  // Very small screens
    if (width <= 480) return 6;  // Small mobile
    if (width <= 768) return 8;  // Tablets
    return 12; // Desktop
}

/**
 * Initializes a new game with the current board size
 */
export function initGame() {
    // Use current boardSize if it's valid, otherwise read from input
    let size = boardSize;
    const maxSize = getMaxGridSize();

    if (size < 2 || size > maxSize) {
        size = parseInt(gridSizeInput.value);
        if (size < 2 || size > maxSize) {
            size = Math.min(5, maxSize); // Default fallback, respecting screen size
        }
        boardSize = size;
        gridSizeInput.value = size;
        gridSizeInput.max = maxSize; // Update the input max attribute
    }

    board = createRandomBoard(boardSize);
    initialBoard = board.map(row => [...row]); // Store the initial board state
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
    initialBoard = board.map(row => [...row]); // Deep copy of the initial board
    moves = 0;
    gameWon = false;
    renderBoard();
    updateStatus();
}

/**
 * Resets the current board to its initial state
 */
function handleReset() {
    board = initialBoard.map(row => [...row]); // Restore the initial board state
    moves = 0;
    gameWon = false;
    renderBoard();
    updateStatus();
}

/**
 * Handles grid size input validation and updates the game
 */
function handleGridSizeInput(e) {
    const maxSize = getMaxGridSize();
    let value = parseInt(e.target.value);

    // Enforce screen-size appropriate limits
    if (value < 2) {
        e.target.value = 2;
        value = 2;
    } else if (value > maxSize) {
        e.target.value = maxSize;
        value = maxSize;
    }

    // Update the max attribute dynamically
    e.target.max = maxSize;

    // If the value actually changed, start a new random game
    if (value !== boardSize) {
        boardSize = value;
        handleNewGame();
    }
}

/**
 * Handles grid size change (for browsers that don't fire input on arrow keys)
 */
function handleGridSizeChange() {
    const maxSize = getMaxGridSize();
    const value = Math.min(Math.max(parseInt(gridSizeInput.value), 2), maxSize);

    gridSizeInput.value = value;
    gridSizeInput.max = maxSize;

    if (value !== boardSize) {
        boardSize = value;
        handleNewGame();
    }
}

/**
 * Handles light click events
 */
function handleLightClick(event) {
    if (gameWon) return;

    const light = event.currentTarget;
    const row = parseInt(light.getAttribute('data-row'));
    const col = parseInt(light.getAttribute('data-col'));

    board = toggleLight(board, row, col);
    moves++;

    // Update only the affected lights instead of re-rendering everything
    updateAffectedLights(row, col);
    gameWon = checkWinCondition(board);
    updateStatus();

    // Disable all lights if game is won
    if (gameWon) {
        disableAllLights();
    }
}

/**
 * Handles touch events for better mobile support
 */
function handleLightTouch(event) {
    if (gameWon) return;

    // Prevent default to avoid double-firing with click
    event.preventDefault();

    const light = event.currentTarget;
    const row = parseInt(light.getAttribute('data-row'));
    const col = parseInt(light.getAttribute('data-col'));

    board = toggleLight(board, row, col);
    moves++;

    // Force immediate visual update
    updateAffectedLights(row, col);
    gameWon = checkWinCondition(board);
    updateStatus();

    // Disable all lights if game is won
    if (gameWon) {
        disableAllLights();
    }
}

/**
 * Renders the game board with responsive sizing
 */
function renderBoard() {
    gameBoardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    // Set CSS custom properties for responsive sizing
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    let lightSize, fontSize, gapSize, paddingSize;

    if (boardSize <= 3) {
        lightSize = isSmallMobile ? 'clamp(50px, 18vw, 70px)' : isMobile ? 'clamp(55px, 15vw, 75px)' : '60px';
        fontSize = isSmallMobile ? 'clamp(1.2em, 5vw, 1.5em)' : '1.5em';
        gapSize = '4px';
        paddingSize = '20px';
    } else if (boardSize <= 5) {
        lightSize = isSmallMobile ? 'clamp(45px, 15vw, 60px)' : isMobile ? 'clamp(50px, 12vw, 65px)' : '50px';
        fontSize = isSmallMobile ? 'clamp(1em, 4vw, 1.3em)' : '1.4em';
        gapSize = '3px';
        paddingSize = '15px';
    } else if (boardSize <= 8) {
        lightSize = isSmallMobile ? 'clamp(40px, 12vw, 55px)' : isMobile ? 'clamp(45px, 10vw, 60px)' : '45px';
        fontSize = isSmallMobile ? 'clamp(0.9em, 3.5vw, 1.2em)' : '1.2em';
        gapSize = '2px';
        paddingSize = '12px';
    } else {
        lightSize = isSmallMobile ? 'clamp(35px, 10vw, 50px)' : isMobile ? 'clamp(40px, 9vw, 55px)' : '40px';
        fontSize = isSmallMobile ? 'clamp(0.8em, 3vw, 1.1em)' : '1.1em';
        gapSize = '1px';
        paddingSize = '10px';
    }

    // Apply CSS custom properties
    gameBoardElement.style.setProperty('--light-size', lightSize);
    gameBoardElement.style.setProperty('--light-font-size', fontSize);
    gameBoardElement.style.setProperty('--grid-gap', gapSize);
    gameBoardElement.style.setProperty('--board-padding', paddingSize);

    // Clear existing lights
    gameBoardElement.innerHTML = '';

    // Create lights
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const light = document.createElement('button');
            light.className = `light ${board[i][j] ? 'on' : ''} ${gameWon ? 'disabled' : ''}`;
            light.setAttribute('data-row', i);
            light.setAttribute('data-col', j);

            // Add both mouse and touch events for better mobile support
            light.addEventListener('click', handleLightClick);
            light.addEventListener('touchstart', handleLightTouch, { passive: false });

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

/**
 * Updates only the lights affected by a toggle operation for better performance
 */
function updateAffectedLights(centerRow, centerCol) {
    const positions = [
        [centerRow, centerCol], // center
        [centerRow - 1, centerCol], // up
        [centerRow + 1, centerCol], // down
        [centerRow, centerCol - 1], // left
        [centerRow, centerCol + 1]  // right
    ];

    positions.forEach(([row, col]) => {
        if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
            const light = gameBoardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (light) {
                light.className = `light ${board[row][col] ? 'on' : ''} ${gameWon ? 'disabled' : ''}`;
            }
        }
    });
}

/**
 * Handles window resize events for responsive updates
 */
function handleWindowResize() {
    // Debounce resize events for better performance
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        renderBoard();
    }, 100);
}