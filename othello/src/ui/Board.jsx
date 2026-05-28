import React from 'react';
import Cell from './cell.jsx';
import { ROWS, COLS } from '../constants/Constants.js';

function Board() {

    const totalCells = ROWS * COLS;

    return (
        <div className="board">
            {Array(totalCells).fill().map((_, index) => (
                <Cell key={index} />
            ))}
        </div>
    );
}

export default Board;