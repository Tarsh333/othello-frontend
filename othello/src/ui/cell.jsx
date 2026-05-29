import react from 'react';
import './cell.css';
import { getColorForCell } from '../util/util';

function Cell({i, j, cell, setBoard}) {
    var color=getColorForCell(cell);
    //dynamic
    return(
        <div className="cell" style={{ backgroundColor: color }}>
            
            
        </div>
    );
}

export default Cell;