#include <stdio.h>

int** SudokuSolver(int** board, int boardSize, int** solved) {
  for (int i = 0; i < boardSize; i++) {
    for (int j = 0; j < boardSize; j++) { printf("%d ", board[i][j]); }
    printf("\n");
  }
  return board;
}