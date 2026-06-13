const BASE = import.meta.env.VITE_API_URL || '';

export async function createGame(playerName) {
  console.log('ENV:', import.meta.env);
console.log('API:', import.meta.env.VITE_API_URL);
  const res = await fetch(`${BASE}/game`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ p1: { name: playerName } }),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json(); // returns Game object with id
}

export async function joinGame(gameId, playerName) {
  const res = await fetch(`${BASE}/game/${gameId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ p2: { name: playerName } }),
  });
  if (!res.ok) throw new Error('Failed to join game');
  return res;
}

export async function makeOnlineMove(gameId, positions, playerTurn) {
  const res = await fetch(`${BASE}/game/${gameId}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pt: playerTurn, // 1 for P1, 2 for P2
      move: positions, // [{row, col}, ...]
    }),
  });
  if (!res.ok) throw new Error('Failed to make move');
  return res;
}

export async function getGameData(gameId) {
  const res = await fetch(`${BASE}/game/${gameId}`);
  if (!res.ok) throw new Error('Failed to get game data');
  return res.json();
}

export function subscribeToGame(gameId, onMessage) {
  const es = new EventSource(`${BASE}/game/${gameId}/events`);
  es.onmessage = (event) => {
    const game = JSON.parse(event.data);
    onMessage(game);
  };
  es.onerror = () => {
    // SSE will auto-reconnect
  };
  return es;
}
