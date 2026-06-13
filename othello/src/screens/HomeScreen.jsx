import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>OTHELLO</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Choose how you'd like to play
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '250px',
          }}
        >
          <button
            onClick={() => navigate('/online')}
            style={{
              padding: '1rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: '#2563eb',
              color: 'white',
            }}
          >
            🌐 Play Online
          </button>

          <button
            onClick={() => navigate('/offline')}
            style={{
              padding: '1rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: '#16a34a',
              color: 'white',
            }}
          >
            🎮 Play Offline
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;