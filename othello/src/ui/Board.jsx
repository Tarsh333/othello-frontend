import React from 'react';
import Cell from './cell.jsx';
import { ROWS, COLS } from '../constants/Constants.js';

function Board() {
    const grid = [];

    for (let row = 0; row < ROWS; row++) {
        const rowCells = [];

        for (let col = 0; col < COLS; col++) {
            const index = row * COLS + col;

            rowCells.push(
                <Cell key={index} row={row} col={col} />
            );
        }

        grid.push(
            <div className="row" key={row}>
                {rowCells}
            </div>
        );
    }

    return <div className="board">{grid}</div>;
}

export default Board;