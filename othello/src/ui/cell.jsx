import react from 'react';
import './cell.css';

function Cell({i, j, cell, setBoard}) {
    var color;
    //dynamic
    if(cell.color==null){
        color = "red";
    }
    else {
        color = "black";
    }
    return(
        <div className="cell" style={{ backgroundColor: color }}>
            
            
        </div>
    );
}

export default Cell;