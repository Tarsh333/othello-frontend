import React, { useState } from 'react';
import Cell from './cell.jsx';
import './Board.css';
import { ROWS, COLS } from '../constants/Constants.js';
import { initializeBoard } from '../util/util.js';
import { makeMove } from '../hooks/Move.js';

function Board() {
  const [board, setBoard] = useState(initializeBoard());
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
function handleMove(row, col) {
  const newBoard = makeMove(
    board,
    row,
    col,
    isPlayer1Turn, changeTurn
  );

  setBoard(newBoard);
  // setIsPlayer1Turn(prev => !prev);
}
const changeTurn=()=>{
  setIsPlayer1Turn(prev => !prev);
}
    return (
      <div className="board-container">
  <div className="board">
    {
      board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={i + "-" + j}
            i={i}
            j={j}
            cell={cell}
            setBoard={setBoard}
            handleMove={handleMove}
          />
        ))
      )
    }
  </div>
  </div>
);
}

export default Board;