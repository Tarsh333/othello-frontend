import { ROWS,COLS } from "../constants/Constants";

export function initializeBoard() {

  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      color:null
    }))
  );
}