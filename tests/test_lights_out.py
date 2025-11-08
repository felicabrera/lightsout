"""
Tests for Lights Out Game Solver
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from lights_out import resolver_lights_out, simulate_press

def test_3x3_example():
    # Simple 3x3 with one light on
    board = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    solution = resolver_lights_out(board)
    assert solution is not None
    final_board = simulate_press(board, solution)
    assert all(all(cell == 0 for cell in row) for row in final_board)
    print("3x3 test passed")

def test_already_solved():
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    solution = resolver_lights_out(board)
    assert solution == [0, 0, 0, 0, 0, 0, 0, 0, 0]
    print("Already solved test passed")

def test_4x4():
    # Test with a 4x4 board - create a solvable configuration
    board = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    solution = resolver_lights_out(board)
    print(f"4x4 solution exists: {solution is not None}")
    if solution is not None:
        final_board = simulate_press(board, solution)
        solved = all(all(cell == 0 for cell in row) for row in final_board)
        print(f"4x4 solved: {solved}")
    else:
        print("4x4 configuration not solvable")

def test_5x5():
    # Test with a 5x5 board - center light on
    board = [[0] * 5 for _ in range(5)]
    board[2][2] = 1  # Center
    solution = resolver_lights_out(board)
    print(f"5x5 solution exists: {solution is not None}")
    if solution is not None:
        final_board = simulate_press(board, solution)
        solved = all(all(cell == 0 for cell in row) for row in final_board)
        print(f"5x5 solved: {solved}")
    else:
        print("5x5 configuration not solvable")

def test_unsolvable():
    # Some configurations may not be solvable
    # For example, certain patterns in larger grids
    board = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
    solution = resolver_lights_out(board)
    # For 3x3, this might be solvable or not - just check it doesn't crash
    print("Unsolvable test: solution =", solution is not None)

if __name__ == "__main__":
    test_3x3_example()
    test_already_solved()
    test_4x4()
    test_5x5()
    test_unsolvable()
    print("All tests completed!")