// make game logic variables like move (player 1 or 2),add helper fxn which calculates new game state when a move is done
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
            if (board[i][j] === "") {
                break;
            }

            // same player
            if (board[i][j] === player) {

                for (let k = 0; k < cells.length; k++) {

                    const [x, y] = cells[k];

                    board[x][y] = player;
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
}