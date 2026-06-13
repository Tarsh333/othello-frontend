import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame, joinGame } from '../api/gameApi';

function OnlineLobby() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [createdCode, setCreatedCode] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState(null); // 'create' | 'join'

  async function handleCreate() {
    if (!name.trim()) return setError('Enter your name');
    try {
      const game = await createGame(name.trim());
      setCreatedCode(game.id);
      setError('');
    } catch {
      setError('Failed to create game');
    }
  }

  function goToGame() {
    navigate(`/online/${createdCode}`, { state: { playerName: name, role: 'p1' } });
  }

  async function handleJoin() {
    if (!name.trim()) return setError('Enter your name');
    if (!gameCode.trim()) return setError('Enter game code');
    try {
      await joinGame(gameCode.trim(), name.trim());
      navigate(`/online/${gameCode.trim()}`, { state: { playerName: name, role: 'p2' } });
    } catch {
      setError('Failed to join game. Check the code.');
    }
  }

  const btnStyle = {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
      <div style={{ textAlign: 'center', padding: '2rem', width: '320px' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Online Mode</h1>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>Create or join a game</p>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '0.7rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem', boxSizing: 'border-box' }}
        />

        {!mode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button onClick={() => setMode('create')} style={{ ...btnStyle, background: '#2563eb' }}>Create Game</button>
            <button onClick={() => setMode('join')} style={{ ...btnStyle, background: '#16a34a' }}>Join Game</button>
          </div>
        )}

        {mode === 'create' && !createdCode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button onClick={handleCreate} style={{ ...btnStyle, background: '#2563eb' }}>Create</button>
            <button onClick={() => setMode(null)} style={{ ...btnStyle, background: '#666' }}>Back</button>
          </div>
        )}

        {mode === 'create' && createdCode && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <p style={{ fontSize: '1.1rem' }}>Share this code with your opponent:</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', letterSpacing: '4px' }}>{createdCode}</p>
            <button onClick={goToGame} style={{ ...btnStyle, background: '#2563eb' }}>Enter Game</button>
          </div>
        )}

        {mode === 'join' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <input
              type="text"
              placeholder="Game code"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <button onClick={handleJoin} style={{ ...btnStyle, background: '#16a34a' }}>Join</button>
            <button onClick={() => setMode(null)} style={{ ...btnStyle, background: '#666' }}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineLobby;
