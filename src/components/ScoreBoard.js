import React from 'react';
import './ScoreBoard.css';

function ScoreBoard({ score, timeLeft }) {
  return (
    <div className="score-board">
      <div className="score">Score: {score}</div>
      <div className="timer">Time: {timeLeft}s</div>
    </div>
  );
}

export default ScoreBoard; 