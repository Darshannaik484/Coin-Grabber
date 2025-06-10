import React, { useState, useEffect, useCallback } from 'react';
import Coin from './Coin';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import './GameBox.css';

const GAME_DURATION = 30; // seconds
const SPAWN_INTERVAL = 300; // milliseconds (3-4 coins per second)
const MAX_COINS = 50; // Increased max coins for more challenge
const COINS_PER_SECOND = 3; // Number of coins to spawn per second

function GameBox() {
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameOver, setIsGameOver] = useState(false);

  const spawnCoin = useCallback(() => {
    if (coins.length >= MAX_COINS) return;
    
    const newCoin = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 50), // Random x position
      y: -50, // Start above the game box
    };
    
    setCoins(prevCoins => [...prevCoins, newCoin]);
  }, [coins.length]);

  const removeCoin = useCallback((id, shouldIncrementScore) => {
    setCoins(prevCoins => prevCoins.filter(coin => coin.id !== id));
    if (shouldIncrementScore) {
      setScore(prevScore => prevScore + 1);
    }
  }, []);

  // Separate effect for timer
  useEffect(() => {
    if (isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver]);

  // Separate effect for coin spawning
  useEffect(() => {
    if (isGameOver) return;

    const spawnInterval = setInterval(spawnCoin, SPAWN_INTERVAL);
    return () => clearInterval(spawnInterval);
  }, [spawnCoin, isGameOver]);

  const handleRestart = () => {
    setCoins([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsGameOver(false);
  };

  return (
    <div className="game-container">
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <div className="game-box">
        {coins.map(coin => (
          <Coin
            key={coin.id}
            id={coin.id}
            x={coin.x}
            y={coin.y}
            onCollect={removeCoin}
          />
        ))}
      </div>
      {isGameOver && (
        <GameOver score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default GameBox; 