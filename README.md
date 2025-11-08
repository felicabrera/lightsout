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

Clone the repository and install dependencies:

```bash
git clone https://github.com/felicabrera/lightsout
cd lightsout
pip install -r requirements.txt
```

## Usage

### Web App (Interactive) ⭐ Recommended

Run the Streamlit web application for the best interactive experience:

```bash
streamlit run app.py
```

This launches a beautiful web interface where you can:
- Select board size (3×3, 4×4, 5×5)
- Click lights to set your puzzle visually
- Solve and see the solution with clear visual feedback

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

### Demo

Try the interactive web app:

```bash
streamlit run app.py
```

Or the console version:

```bash
python main.py
```

## Project Structure

```
lightsout/
├── src/
│   ├── __init__.py
│   └── lights_out.py      # Main solver module
├── tests/
│   └── test_lights_out.py # Unit tests
├── docs/
│   ├── mathematical_background.md
│   ├── api_reference.md
│   └── project_structure.md
├── app.py                 # Streamlit web app
├── main.py                # Console interface
├── requirements.txt       # Dependencies
├── LICENSE
├── .gitignore
├── README.md
└── Development Summary Report_ Lights Out Game in Pyt.md
```

## Algorithm

The solver models the puzzle as a system of linear equations over Z₂ and uses Gaussian elimination to find the solution vector indicating which lights to press.
