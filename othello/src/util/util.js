import { ROWS,COLS } from "../constants/Constants";

export function initializeBoard() {
  const size = 8;

  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      color:null
    }))
  );
}