import React, { useState } from 'react';
import { createGrid, checkCollision } from '../gameHelper';
import { StyledGameWrapper, StyledGame } from "./styles/StyledGame";

import { useInterval } from "../hooks/useInterval";
import { usePlayer } from '../hooks/usePlayer';
import { useGrid } from '../hooks/useGrid';
import { useGameStatus } from "../hooks/useGameStatus";


import Grid from "./Grid";
import Stat from "./Stat";
import GameButton from "./GameButton";


const Game = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
  
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [grid, setGrid, rowsCleared] = useGrid(player, resetPlayer);
    const [
      score,
      setScore,
      rows,
      setRows,
      level,
      setLevel
    ] = useGameStatus(rowsCleared);
  
    // console.log('re-render');
  
    const movePlayer = dir => {
      if (!checkCollision(player, grid, { x: dir, y: 0 })) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    }
  
    const startGame = () => {
      // this resets the complete game 
      setGrid(createGrid());
      setDropTime(1000);
      resetPlayer();
      setGameOver(false);
      setScore(0);
      setRows(0);
      setLevel(1);
    }
  
    const drop = () => {
      // Increases the game level once the player has cleared 10 rows
      if (rows > (level + 1) * 10) {
        setLevel(prev => prev + 1);
        // Also increases speed
        setDropTime(1000 / (level + 1) + 200);
      }
  
      if (!checkCollision(player, grid, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        // Game Over
        if (player.pos.y < 1) {
          setGameOver(true);
          setDropTime(null);
          console.log("GAME OVER!!!");
        }
        updatePlayerPos({ x: 0, y: 0, collided: true })
      }
    }
  
    const keyUp = (keyCode) => {
      if (!gameOver) {
        if (keyCode === 40) {
          setDropTime(1000 / (level + 1) + 200);
        }
      }
    }
  
    const dropPlayer = () => {
      drop();
    }
  
    const move = ({ keyCode }) => {
      if (!gameOver) {
        switch (keyCode) {
          case 37:  // left
            movePlayer(-1);
            break;
          case 39:  // right
            movePlayer(1);
            break;
          case 40: // down
            dropPlayer();
            break;
          case 38: // up
            playerRotate(grid, 1);
            break;
          default:
        }
      }
    }
  
    useInterval(() => {
      drop();
    }, dropTime);
  
    return (
        <div class="background">
      <StyledGameWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp}>
        <StyledGame>
          <Grid grid={grid} />
          <aside>
            {gameOver ? (
              <Stat gameOver={gameOver} text="Game Over" />
            ) : (
                <div class="side-panel">
                  <Stat text={`Score: ${score}`} />
                  <Stat text={`Rows: ${rows}`} />
                  <Stat text={`Level: ${level}`} />
                </div>
              )}
            <GameButton callback={startGame} />
          </aside>
          </StyledGame>
    </StyledGameWrapper>
    </div>
    );
  };
  
  export default Game;