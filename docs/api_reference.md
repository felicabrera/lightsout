# API Reference

## `resolver_lights_out(tablero)`

Solves the Lights Out puzzle for a given board configuration.

**Parameters:**
- `tablero` (list of list of int): n×n matrix where 0 represents off, 1 represents on

**Returns:**
- list of int: Length n*n where 1 indicates the light should be pressed, 0 otherwise. Returns None if no solution exists.

**Raises:**
- `ValueError`: If board is not square or contains invalid values

**Example:**
```python
board = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
solution = resolver_lights_out(board)
# Returns [1, 0, 1, 0, 0, 1, 1, 1, 0]
```

## `simulate_press(board, presses)`

Simulates pressing the lights according to the solution.

**Parameters:**
- `board` (list of list of int): Original board state
- `presses` (list of int): Which lights to press (1=press, 0=don't)

**Returns:**
- list of list of int: Final board state after presses

**Example:**
```python
board = [[1, 0], [0, 0]]
presses = [1, 0, 0, 0]  # Press position 0
final = simulate_press(board, presses)
# Returns [[0, 1], [1, 0]]
```