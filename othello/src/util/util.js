import { ROWS,COLS ,CellState} from "../constants/Constants";


export function initializeBoard() {

  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      color: CellState.EMPTY
    }))
  );
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