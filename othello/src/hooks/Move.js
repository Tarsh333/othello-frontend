import {
  CellState,
  Player1Color,
  Player2Color
} from '../constants/Constants';

function flip(board, row, col, player) {
  const directions = [
    [0, 1], [0, -1],
    [1, 0], [-1, 0],
    [1, 1], [-1, -1],
    [1, -1], [-1, 1]
  ];

  for (const [dx, dy] of directions) {
    let i = row + dx;
    let j = col + dy;

    const cells = [];

    while (
      i >= 0 &&
      i < board.length &&
      j >= 0 &&
      j < board[0].length
    ) {
      if (board[i][j].color === CellState.EMPTY) {
        break;
      }

      if (board[i][j].color === player) {
        for (const [x, y] of cells) {
          board[x][y].color = player;
        }
        break;
      }

      cells.push([i, j]);
      i += dx;
      j += dy;
    }
  }

  return board;
}

export function makeMove(board, row, col, isPlayer1Turn,changeTurn) {
  if (board[row][col].color !== CellState.EMPTY) {
    return board;
  }

  const newBoard = board.map(row =>
    row.map(cell => ({ ...cell }))
  );

    const player = isPlayer1Turn
  ? Player1Color
  : Player2Color;

if (!isValidMove(board, row, col, player)) {
  return board;
}

  newBoard[row][col].color = player;

  flip(newBoard, row, col, player);

  changeTurn();
  return newBoard;
}

function isValidMove(board, row, col, player) {

  const directions = [
    [0, 1], [0, -1],
    [1, 0], [-1, 0],
    [1, 1], [-1, -1],
    [1, -1], [-1, 1]
  ];

  for (const [dx, dy] of directions) {

    let i = row + dx;
    let j = col + dy;

    let foundOpponent = false;

    while (
      i >= 0 &&
      i < board.length &&
      j >= 0 &&
      j < board[0].length
    ) {

      if (board[i][j].color === CellState.EMPTY) {
        break;
      }

      if (board[i][j].color === player) {
        if (foundOpponent) {
          return true;
        }
        break;
      }

      foundOpponent = true;

      i += dx;
      j += dy;
    }
  }

  return false;
}