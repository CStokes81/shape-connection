import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../tetrominos";
import { GRID_WIDTH, checkCollision } from "../gameHelper";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino:  TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (field, dir) => {
        const rotatedTetro = field.map((_, index) =>
        field.map(col => col[index])
        );
        if (dir > 0) {
            return rotatedTetro.map(row => row.reverse());
        }
        return rotatedTetro.reverse();
    };
    const playerRotate = (grid, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));

        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;

        while (checkCollision(clonedPlayer, grid, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided
        }));
    };
    const resetPlayer = useCallback(currentPlayer => {
        let y =
        (currentPlayer && currentPlayer.pos.y - currentPlayer.tetromino.length) < 
        0 
        ? currentPlayer.pos.y - currentPlayer.tetromino.length 
        : 0;

        setPlayer({
            pos: { x: GRID_WIDTH / 2 - 2, y },
            tetromino: randomTetromino().shape,
            collided: false
        });
    }, []);
    return [player, updatePlayerPos, resetPlayer, playerRotate];
};