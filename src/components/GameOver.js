import React from 'react';
import './GameOver.css';

function GameOver({ score, onRestart }) {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default GameOver; 