# Lights Out: The Game

A Python implementation of the Lights Out puzzle solver using linear algebra over the finite field Z₂.

## Description

The Lights Out game is a puzzle where pressing a light toggles its state and the states of its adjacent lights. The goal is to turn all lights off. This project provides a mathematical solution using Gaussian elimination to solve any solvable configuration.

## Features

- Solves Lights Out puzzles of any size n×n
- Uses efficient Gaussian elimination over Z₂
- Includes simulation to verify solutions
- Handles unsolvable configurations

## Installation

Clone the repository and ensure Python 3.x is installed.

```bash
git clone https://github.com/felicabrera/lightsout
cd lightsout
```

No additional dependencies required.

## Usage

### As a Module

```
python
from src.lights_out import resolver_lights_out, simulate_press

board = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

solution = resolver_lights_out(board)
if solution:
    print("Presses:", solution)
    final_board = simulate_press(board, solution)
    print("Final board:", final_board)
else:
    print("No solution")
```


### Running Tests

```bash
python tests/test_lights_out.py
```

### Interactive Play

Run the main script for an interactive experience:

```bash
python main.py
```

You'll be prompted to enter the board size and the initial configuration. The solver will show you which positions to press and verify the solution.

## Project Structure

```
lightsout/
├── src/
│   └── lights_out.py      # Main solver module
├── tests/
│   └── test_lights_out.py # Unit tests
├── docs/
├── main.py
└── README.md
```

## Algorithm

The solver models the puzzle as a system of linear equations over Z₂ and uses Gaussian elimination to find the solution vector indicating which lights to press.
