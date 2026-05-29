import { ROWS,COLS ,CellState} from "../constants/Constants";


export function initializeBoard() {

  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      color: CellState.EMPTY
    }))
  );
}