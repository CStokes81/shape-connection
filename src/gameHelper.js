export const GRID_WIDTH = 12;
export const GRID_HEIGHT = 20;

export const createGrid = () =>
Array.from(Array(GRID_HEIGHT), () =>
    new Array(GRID_WIDTH).fill([0, "clear"])
);

export const checkCollision = (player, grid, { x: moveX, y: moveY }) => { //x represents width & y represents height
    for (let y = 0; y < player.tetromino.length; y++) {
        for (let x = 0; x < player.tetromino[y].length; x++) {
            //this checks to see if you're on a tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    //this checks to ensure the move is inside of the grid's height
                    !grid[y + player.pos.y + moveY] ||
                    //this checks to ensure the move is inside the grid's width
                    !grid[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    //this checks to see if the cell in which the tetromino is moving to has not been set to clear
                    grid[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 
                    "clear"
                ) {
                    return true;
                }
            }
        }
    }
};