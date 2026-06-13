import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { subscribeToGame, makeOnlineMove, getGameData } from '../api/gameApi';
import { CellState, Player1Color, Player2Color } from '../constants/Constants';
import Cell from '../ui/cell.jsx';
import '../ui/Board.css';

// Backend Cell enum: 0 = Empty, 1 = P1 (black), 2 = P2 (white)
function backendToFrontendBoard(backendBoard) {
  if (!backendBoard) return null;
  return backendBoard.map(row =>
    row.map(cell => ({
      color: cell === 1 ? 'black' : cell === 2 ? 'white' : null,
    }))
  );
}

const DIRECTIONS = [
  [0, 1], [0, -1], [1, 0], [-1, 0],
  [1, 1], [-1, -1], [1, -1], [-1, 1],
];

function isValidMove(board, row, col, player) {
  for (const [dx, dy] of DIRECTIONS) {
    let i = row + dx, j = col + dy;
    let foundOpponent = false;
    while (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
      if (board[i][j].color === CellState.EMPTY) break;
      if (board[i][j].color === player) return foundOpponent;
      foundOpponent = true;
      i += dx;
      j += dy;
    }
  }
  return false;
}

// Returns array of {row, col} positions that get flipped + the placed cell
function computeFlips(board, row, col, player) {
  const flipped = [];
  for (const [dx, dy] of DIRECTIONS) {
    let i = row + dx, j = col + dy;
    const cells = [];
    while (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
      if (board[i][j].color === CellState.EMPTY) break;
      if (board[i][j].color === player) {
        flipped.push(...cells);
        break;
      }
      cells.push({ row: i, col: j });
      i += dx;
      j += dy;
    }
  }
  return flipped;
}

function OnlineGameScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName, role } = location.state || {};

  const [board, setBoard] = useState(null);
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(true);

  const myTurn = role === 'p1' ? 1 : 2;
  const myColor = role === 'p1' ? Player1Color : Player2Color;

  function getCurrentTurn(gameData) {
    if (!gameData?.bs?.Board) return 1;
    let p1Count = 0, p2Count = 0;
    for (const row of gameData.bs.Board) {
      for (const cell of row) {
        if (cell === 1) p1Count++;
        if (cell === 2) p2Count++;
      }
    }
    return p1Count <= p2Count ? 1 : 2;
  }

  useEffect(() => {
    if (!role) {
      navigate('/online');
      return;
    }

    getGameData(id).then((g) => {
      setGame(g);
      setBoard(backendToFrontendBoard(g.bs?.Board));
      if (g.p2) setWaiting(false);
    });

    const es = subscribeToGame(id, (g) => {
      setGame(g);
      setBoard(backendToFrontendBoard(g.bs?.Board));
      if (g.p2) setWaiting(false);
    });

    return () => es.close();
  }, [id, role, navigate]);

  async function handleMove(row, col) {
    if (waiting) return;
    const currentTurn = getCurrentTurn(game);
    if (currentTurn !== myTurn) return;
    if (board[row][col].color !== CellState.EMPTY) return;
    if (!isValidMove(board, row, col, myColor)) return;

    const flipped = computeFlips(board, row, col, myColor);
    // All positions to set: the placed piece + all flipped pieces
    const positions = [{ row, col }, ...flipped];

    try {
      await makeOnlineMove(id, positions, myTurn);
    } catch {
      setError('Invalid move');
      setTimeout(() => setError(''), 2000);
    }
  }

  if (!board) {
    return (
      <div className="board-container">
        <p>Loading...</p>
      </div>
    );
  }

  const currentTurn = getCurrentTurn(game);
  const isMyTurn = currentTurn === myTurn;

  let blackCount = 0, whiteCount = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.color === 'black') blackCount++;
      if (cell.color === 'white') whiteCount++;
    }
  }

  return (
    <div className="board-container">
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.5rem' }}>Game #{id}</h2>
        <p style={{ margin: '0 0 0.3rem' }}>
          You: <strong>{playerName}</strong> ({role === 'p1' ? 'Black' : 'White'})
        </p>
        {waiting ? (
          <p style={{ color: '#e65100', fontWeight: 'bold' }}>Waiting for opponent to join...</p>
        ) : (
          <p style={{ color: isMyTurn ? '#2563eb' : '#666', fontWeight: 'bold' }}>
            {isMyTurn ? 'Your turn' : "Opponent's turn"}
          </p>
        )}
        <p style={{ margin: '0.3rem 0' }}>
          Black: {blackCount} | White: {whiteCount}
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <Cell
              key={i + '-' + j}
              i={i}
              j={j}
              cell={cell}
              setBoard={() => {}}
              handleMove={handleMove}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OnlineGameScreen;
