#!/usr/bin/env python3
"""
Interactive Lights Out Game Solver
"""

from src.lights_out import resolver_lights_out, simulate_press

def main():
    print("Welcome to the Lights Out Game Solver!")
    print("Enter the board size (n for n x n grid):")
    try:
        n = int(input().strip())
        if n <= 0:
            raise ValueError
    except ValueError:
        print("Invalid size. Using default 3x3.")
        n = 3

    print(f"Enter the {n}x{n} board, one row per line, with 0s and 1s separated by spaces.")
    print("Example for 3x3: 1 0 1")
    board = []
    for i in range(n):
        while True:
            try:
                row = list(map(int, input(f"Row {i+1}: ").strip().split()))
                if len(row) != n or any(x not in (0, 1) for x in row):
                    raise ValueError
                board.append(row)
                break
            except ValueError:
                print(f"Invalid row. Enter {n} numbers (0 or 1) separated by spaces.")

    print("\nInitial board:")
    for row in board:
        print(" ".join(map(str, row)))

    solution = resolver_lights_out(board)
    if solution is None:
        print("No solution exists for this configuration.")
        return

    print("\nSolution (positions to press, 0-based flattened):")
    presses = [i for i, p in enumerate(solution) if p == 1]
    print("Press positions:", presses)

    # Visualize the presses on the grid
    press_grid = [[0] * n for _ in range(n)]
    for pos in presses:
        r, c = divmod(pos, n)
        press_grid[r][c] = 1

    print("\nPress grid (1 = press):")
    for row in press_grid:
        print(" ".join(map(str, row)))

    final_board = simulate_press(board, solution)
    print("\nFinal board (should be all 0s):")
    for row in final_board:
        print(" ".join(map(str, row)))

    solved = all(all(cell == 0 for cell in row) for row in final_board)
    print(f"\nPuzzle solved: {solved}")

if __name__ == "__main__":
    main()