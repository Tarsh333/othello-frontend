import { ROWS,COLS ,CellState} from "../constants/Constants";


export function initializeBoard() {

  const board = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      color: CellState.EMPTY
    }))
  );

  const midRow = ROWS / 2;
  const midCol = COLS / 2;

  board[midRow - 1][midCol - 1].color = CellState.WHITE;
  board[midRow][midCol].color = CellState.WHITE;

  board[midRow - 1][midCol].color = CellState.BLACK;
  board[midRow][midCol - 1].color = CellState.BLACK;

  return board;
}

export function getColorForCell(cell) {

  switch (cell.color) {
    case CellState.EMPTY:
      return "green"
    case CellState.BLACK:
      return "black"
    case CellState.WHITE:
      return "white"
  
    default:
      return "white";
  }
}