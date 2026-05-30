// make game logic variables like move (player 1 or 2),add helper fxn which calculates new game state when a move is done
import {CellState,Player1Color, Player2Color} from '../constants/Constants';
import { useState } from 'react';
export default function getGameVars(){
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
    // const colorMap= new Map();
    // colorMap.set("")

function flip(board, row, col, player) {

    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, -1],
        [1, -1],
        [-1, 1]
    ];

    for (let d = 0; d < directions.length; d++) {

        const [dx, dy] = directions[d];

        let i = row + dx;
        let j = col + dy;

        const cells = [];

        while (
            i >= 0 &&
            i < board.length &&
            j >= 0 &&
            j < board[0].length
        ) {

            // blank
            if (board[i][j].color === CellState.EMPTY)  {
                break;
            }

            // same player
            if (board[i][j].color === player) {

                for (let k = 0; k < cells.length; k++) {

                    const [x, y] = cells[k];

                    board[x][y].color = player;
                }

                break;
            }

            // opponent
            cells.push([i, j]);

            i += dx;
            j += dy;
        }
    }

    return board;
}

function makeMove(board, row, col) {

    // occupied cell
   if (board[row][col].color !== CellState.EMPTY) {
        return board;
    }

    const newBoard = board.map(r => [...r]);

    const player = isPlayer1Turn ? Player1Color : Player2Color;

    // place piece
    newBoard[row][col].color = player;

    // flip pieces
    flip(newBoard, row, col, player);

    // change turn
    setIsPlayer1Turn(!isPlayer1Turn);

    return newBoard;
}
}