# Lights Out

A minimalist implementation of the classic Lights Out puzzle game. Click lights to toggle them and their neighbors - turn all lights off to win!

## Description

Lights Out is an electronic game released by Tiger Electronics in 1995. The game consists of a grid of lights. When you press any light, it toggles its state and the states of its adjacent lights. The goal of the puzzle is to switch all the lights off, preferably with as few button presses as possible.

## Features

- **Real-time gameplay**: Click any light to instantly see the effect on the grid
- **Custom grid sizes**: Play with any size from 2×2 to 12×12
- **Win detection**: Automatic win detection when all lights are off
- **Move counter**: Track your efficiency
- **Minimalist dark theme**: Clean, distraction-free interface
- **Responsive design**: Works on desktop and mobile

## How to Play

1. **Start**: Click "New Game" to begin with a random configuration
2. **Play**: Click any light to toggle it and its neighbors
3. **Win**: Turn all lights off to complete the puzzle
4. **Challenge**: Try to solve it with the fewest moves possible

## Local Development

**Web version:** (Recommended for local development)
```bash
# Start local HTTP server on port 8000
python -m http.server 8000

# Then open in your browser:
# http://localhost:8000
```

## Algorithm

The game implements the same mathematical logic in both Python and JavaScript:

- **Python solver** (`src/lights_out.py`): Reference implementation using Gaussian elimination over finite field Z₂
- **JavaScript solver** (`js/solver.js`): Web implementation ported from Python
- **Game logic** (`js/game-logic.js`): Core mechanics for real-time gameplay

The mathematical solver uses Gaussian elimination over finite field Z₂ to find optimal solutions. The game implements the same logic for real-time play.

### Running Tests

**Python tests** (mathematical validation):

```bash
python -m pytest tests/ -v
```

**JavaScript tests** (web implementation validation):

- Open `test-js.html` in browser and click "Run JavaScript Tests"
- Or in browser console after loading `index.html`: `window.runJSTests()`

## Project Structure

```text
lightsout/
├── src/
│   ├── __init__.py
│   └── lights_out.py      # Main solver module (Python)
├── js/
│   ├── game-logic.js      # Core game mechanics (JavaScript)
│   ├── solver.js          # Mathematical solver (JavaScript port)
│   ├── tests.js           # JavaScript unit tests
│   └── ui.js              # User interface and rendering
├── tests/
│   └── test_lights_out.py # Unit tests
├── docs/
│   ├── mathematical_foundation.md    # Mathematical analysis
│   └── implementation_architecture.md # Implementation details
├── index.html             # Main web application
├── test-js.html          # JavaScript test runner
├── LICENSE
├── .gitignore
├── README.md
└── Development Summary Report_ Lights Out Game in Pyt.md
```

## Mathematical Background

The solver models the puzzle as a system of linear equations over Z₂ and uses Gaussian elimination to find the solution vector indicating which lights to press.
