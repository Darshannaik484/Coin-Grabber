import React, { useEffect, useState } from "react";
import "./Coin.css";

function Coin({ id, x, y, onCollect }) {
  const [position, setPosition] = useState({ x, y });
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      setPosition((prev) => ({
        x: prev.x,
        y: prev.y + 12,
      }));

      // Only remove coin if it goes below the game box (400px height)
      if (position.y > 400) {
        clearInterval(fallInterval);
        // Just remove the coin without incrementing score
        onCollect(id, false);
      }
    }, 16); // ~60fps

    return () => clearInterval(fallInterval);
  }, [id, onCollect, position.y]);

  const handleMouseEnter = () => {
    if (!isCollected) {
      setIsCollected(true);
      // Increment score when coin is collected by hovering
      onCollect(id, true);
    }
  };

  return (
    <div
      className={`coin ${isCollected ? "collected" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseEnter={handleMouseEnter}>
      🪙
    </div>
  );
}

export default Coin;
