"""
Lights Out Game Solver

This module provides a function to solve the Lights Out puzzle using linear algebra
over the finite field Z₂ (binary arithmetic).
"""

def resolver_lights_out(tablero):
    """
    Solves the Lights Out puzzle for a given board configuration.

    Args:
        tablero (list of list of int): n x n matrix where 0 represents off, 1 represents on.

    Returns:
        list of int: A list of length n*n where 1 indicates the light should be pressed,
                     0 otherwise. Returns None if no solution exists.
    """
    if not tablero or not tablero[0]:
        return []

    n = len(tablero)
    if any(len(row) != n for row in tablero):
        raise ValueError("Board must be square")

    size = n * n

    # Create adjacency matrix A (size x size)
    A = [[0] * size for _ in range(size)]

    for r in range(n):
        for c in range(n):
            i = r * n + c
            # Self
            A[i][i] = 1
            # Up
            if r > 0:
                A[(r-1)*n + c][i] = 1
            # Down
            if r < n-1:
                A[(r+1)*n + c][i] = 1
            # Left
            if c > 0:
                A[r*n + (c-1)][i] = 1
            # Right
            if c < n-1:
                A[r*n + (c+1)][i] = 1

    # Flatten board into vector b
    b = []
    for row in tablero:
        b.extend(row)

    # Create augmented matrix [A | b]
    augmented = [row[:] + [b[i]] for i, row in enumerate(A)]

    # Gauss-Jordan elimination over Z2
    for col in range(size):
        # Find pivot
        pivot_row = None
        for row in range(col, size):
            if augmented[row][col] == 1:
                pivot_row = row
                break
        if pivot_row is None:
            continue  # No pivot, skip

        # Swap rows if needed
        if pivot_row != col:
            augmented[col], augmented[pivot_row] = augmented[pivot_row], augmented[col]

        # Eliminate
        for row in range(size):
            if row != col and augmented[row][col] == 1:
                for j in range(size + 1):
                    augmented[row][j] ^= augmented[col][j]

    # Check for inconsistencies
    for row in range(size):
        if all(augmented[row][j] == 0 for j in range(size)) and augmented[row][-1] == 1:
            return None  # Inconsistent

    # Extract solution
    solution = [augmented[i][-1] for i in range(size)]
    return solution


def simulate_press(board, presses):
    """
    Simulates pressing the lights according to the solution and returns the final board.

    Args:
        board (list of list of int): Original board.
        presses (list of int): Which lights to press (1=press, 0=don't).

    Returns:
        list of list of int: Final board state.
    """
    n = len(board)
    result = [row[:] for row in board]

    for i, press in enumerate(presses):
        if press == 1:
            r, c = divmod(i, n)
            # Toggle self and adjacent
            positions = [(r, c)]
            if r > 0: positions.append((r-1, c))
            if r < n-1: positions.append((r+1, c))
            if c > 0: positions.append((r, c-1))
            if c < n-1: positions.append((r, c+1))
            for pr, pc in positions:
                result[pr][pc] ^= 1

    return result