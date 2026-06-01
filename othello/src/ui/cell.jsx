import react from 'react';
import './cell.css';
import { getColorForCell } from '../util/util';

function Cell({i, j, cell, setBoard,handleMove}) {
    var color=getColorForCell(cell);
    const updateBoard=()=>{
        handleMove(i,j)
    }
    return(
        <div className="cell" onClick={updateBoard}>
        <div className="piece" style={{ backgroundColor: color }}>
            
            
        </div>
        </div>
    );
}

export default Cell;