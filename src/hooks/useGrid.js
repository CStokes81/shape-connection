import { useState, useEffect } from "react";
import { createGrid } from "../gameHelper";

export const useGrid = (player, resetPlayer) => {
    const [grid, setGrid] = useState(createGrid());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const checkRows = newGrid =>
        newGrid.reduce((acc, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                setRowsCleared(prev => prev +1);
                acc.unshift(new Array(newGrid[0].length).fill([0, "clear"]));

                return acc;
            }
            acc.push(row);

            return acc;
        }, []);

        const updateGrid = prevGrid => {
            let newGrid = [];

            for (let y = 0; y < prevGrid.length; y++) {
                for (let x = 0; x < prevGrid[x].length; x++) {
                    prevGrid[y][x] = 
                    prevGrid[y][x][1] === "clear" ? [0, "clear"] : prevGrid[y][x];
                }
                newGrid.push(prevGrid[y]);
            }
            for (let y = 0; y < player.tetromino.length; y++) {
                for (let x = 0; x < player.tetromino[y].length; x++) {
                    if (player.tetromino[y][x] !== 0 && y + player.pos.y >= 0) {
                        newGrid[y + player.pos.y][x + player.pos.x] = [
                            player.tetromino[y][x],
                            `${player.collided ? "merged" : "clear"}`
                        ];
                    }
                }
            }
            //checks to see if a tetromino has collided
            if (player.collided) {
                if (player.pos.y > 0) {
                    resetPlayer(player);
                }
                return checkRows(newGrid);
            }
            return newGrid;
        };
        setGrid(prev => updateGrid(prev));
    }, [player, resetPlayer]);
    return [grid, setGrid, rowsCleared];
};