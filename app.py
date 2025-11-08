import streamlit as st
import sys
import os

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from lights_out import resolver_lights_out, simulate_press

st.set_page_config(page_title="Lights Out Game Solver", page_icon="💡", layout="centered")

st.title("💡 Lights Out Game Solver")
st.markdown("""
Welcome to the **Lights Out** puzzle solver! This app uses advanced mathematics (linear algebra over finite fields)
to solve any solvable Lights Out configuration.

**How to play:**
1. Select your board size
2. Click on lights to set your initial puzzle (yellow = on, gray = off)
3. Click "Solve Puzzle" to find the solution
4. See which lights to press and watch the final result
""")

# Board size selector
col1, col2, col3 = st.columns(3)
with col1:
    if st.button("3×3 Board"):
        st.session_state.board_size = 3
        st.session_state.board = [[0] * 3 for _ in range(3)]
        st.session_state.solution = None
        st.session_state.solved_board = None
with col2:
    if st.button("4×4 Board"):
        st.session_state.board_size = 4
        st.session_state.board = [[0] * 4 for _ in range(4)]
        st.session_state.solution = None
        st.session_state.solved_board = None
with col3:
    if st.button("5×5 Board"):
        st.session_state.board_size = 5
        st.session_state.board = [[0] * 5 for _ in range(5)]
        st.session_state.solution = None
        st.session_state.solved_board = None

# Initialize session state
if 'board_size' not in st.session_state:
    st.session_state.board_size = 3
    st.session_state.board = [[0] * 3 for _ in range(3)]
    st.session_state.solution = None
    st.session_state.solved_board = None

n = st.session_state.board_size
board = st.session_state.board

st.subheader(f"🎯 Set Your {n}×{n} Puzzle")

# Display interactive board
cols = st.columns(n)
for i in range(n):
    with cols[i]:
        for j in range(n):
            # Create unique key for each button
            key = f"cell_{i}_{j}"
            # Display current state
            if board[i][j] == 1:
                button_label = "🟡"  # Yellow for on
            else:
                button_label = "⚪"  # White/gray for off

            if st.button(button_label, key=key, help=f"Toggle light at ({i},{j})"):
                board[i][j] = 1 - board[i][j]  # Toggle
                st.session_state.solution = None  # Reset solution when board changes
                st.session_state.solved_board = None
                st.rerun()

st.markdown("---")

# Solve button
if st.button("🔍 Solve Puzzle", type="primary", use_container_width=True):
    with st.spinner("Solving with advanced mathematics..."):
        solution = resolver_lights_out(board)
        st.session_state.solution = solution
        if solution is not None:
            st.session_state.solved_board = simulate_press(board, solution)
        else:
            st.session_state.solved_board = None

# Display results
if st.session_state.solution is not None:
    st.success("✅ Puzzle solved!")

    # Show solution presses
    st.subheader("🎯 Lights to Press")
    solution = st.session_state.solution
    press_positions = [i for i, press in enumerate(solution) if press == 1]

    if press_positions:
        # Create visual press grid
        st.markdown("**Press Grid (🔴 = press this light):**")
        press_cols = st.columns(n)
        for i in range(n):
            with press_cols[i]:
                for j in range(n):
                    idx = i * n + j
                    if idx in press_positions:
                        st.markdown("🔴")
                    else:
                        st.markdown("⚪")

        st.markdown(f"**Positions to press:** {press_positions} (0-based flattened indices)")
    else:
        st.info("No lights need to be pressed - puzzle is already solved!")

    # Show final board
    st.subheader("✨ Final Result")
    final_board = st.session_state.solved_board
    final_cols = st.columns(n)
    for i in range(n):
        with final_cols[i]:
            for j in range(n):
                if final_board[i][j] == 0:
                    st.markdown("⚪")
                else:
                    st.error("❌")  # Should never happen

    st.success("All lights are now OFF! 🎉")

elif st.session_state.solution is None and 'solution' in st.session_state:
    st.error("❌ This puzzle configuration has no solution!")

# Reset button
if st.button("🔄 Reset Board", use_container_width=True):
    st.session_state.board = [[0] * n for _ in range(n)]
    st.session_state.solution = None
    st.session_state.solved_board = None
    st.rerun()

st.markdown("---")
st.markdown("""
### About the Solver
This app uses **Gaussian elimination over the finite field Z₂** to solve Lights Out puzzles mathematically.
It's guaranteed to find the optimal solution or determine that no solution exists.

**Mathematical complexity:** O(n⁶) for n×n grids, making it perfect for small to medium puzzles.
""")

# Footer
st.markdown("---")
st.markdown("Built with ❤️ using Streamlit and advanced mathematics")