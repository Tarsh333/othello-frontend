import React, { useState } from 'react';
import Cell from './cell.jsx';
import './Board.css';
import { ROWS, COLS } from '../constants/Constants.js';
import { initializeBoard } from '../util/util.js';

function Board() {
  const [board, setBoard] = useState(initializeBoard());


    // for (let row = 0; row < ROWS; row++) {
        // const rowCells = [];

        // for (let col = 0; col < COLS; col++) {
        //     const index = row * COLS + col;

        //     rowCells.push(
        //         <Cell key={index} row={row} col={col} />
        //     );
        // }

        // grid.push(
        //     <div className="row" key={row}>
        //         {rowCells}
        //     </div>
        // );
        
    // }

    return (
  <div
    className="board"
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${COLS}, 60px)`,
      width: "fit-content"
    }}
  >
    {
      board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={i + "-" + j}
            i={i}
            j={j}
            cell={cell}
            setBoard={setBoard}
          />
        ))
      )
    }
  </div>
);
}

export default Board;