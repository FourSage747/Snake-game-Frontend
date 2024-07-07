import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Food from './Food';
import ScoreBoard from './ScoreBoard';
import RecordHolders from './RecordHolders';
import './CSS/App.css';

const Game = () => {
  // State variables
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(getRandomFood());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [paused, setPaused] = useState(false);

  // Effect to handle snake movement
  useEffect(() => {
    const moveSnake = () => {
      if (paused || gameOver) return;

      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'RIGHT':
          head.x += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        default:
          break;
      }

      if (head.x < 0) head.x = 19;
      if (head.y < 0) head.y = 19;
      if (head.x >= 20) head.x = 0;
      if (head.y >= 20) head.y = 0;

      // Check for collisions
      if (checkCollision(head, newSnake)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (
        (head.x === food.x && head.y === food.y) ||
        ((food.points === 5 || food.points === 10) &&
          head.x >= food.x &&
          head.x <= food.x + 1 &&
          head.y >= food.y &&
          head.y <= food.y + 1)
      ) {
        setScore(score + food.points);
        setFood(getRandomFood());
        if ((score + food.points) % 50 === 0) {
          setSpeed(speed => speed * 0.9);
        }
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, speed);

    return () => clearInterval(interval);
  }, [snake, direction, food, score, gameOver, speed, paused]);

  // Effect to handle keyboard input
  useEffect(() => {
    const handleKeyDown = e => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case 'Escape':
          setPaused(!paused);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction, paused]);

  const checkCollision = (head, snake) => {
    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  };

  function getRandomFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const points = Math.random() < 0.5 ? 1 : Math.random() < 0.75 ? 5 : 10;
    return { x, y, points };
  }

  return (
    <div className="game-container">
      <Snake snake={snake} />
      <Food food={food} />
      <ScoreBoard score={score} />
      {gameOver && <div className="game-over">Game Over</div>}
      <RecordHolders score={score} gameOver={gameOver} />
    </div>
  );
};

export default Game;
