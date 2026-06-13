import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Screen from './screens/GameScreen';
import Home from './screens/HomeScreen';
import OnlineLobby from './screens/OnlineLobby';
import OnlineGameScreen from './screens/OnlineGameScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offline" element={<Screen />} />
        <Route path="/online" element={<OnlineLobby />} />
        <Route path="/online/:id" element={<OnlineGameScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;