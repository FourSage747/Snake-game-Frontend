import React from 'react';
import Game from './Snake/Game';
import './Snake/CSS/App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Snake Game</h1>
      <Game />
    </div>
  );
};

export default App;
