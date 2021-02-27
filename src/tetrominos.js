/* I thought it would be neat to name this file Tetrominos because according to Wikipedia, 
Tetrominos is a geometric shape composed of (4) squares connected orthogonally (at the edges & not the corners).  
And the corresponding polycube, called a tetracube, is a geometric shape composed of four cubes connected orthogonally.*/

//I gathered the colors for the tetrominos from https://www.color-hex.com/color/364df8

export const TETROMINOS = { 
    0: { shape: [[0]], color: '0, 0, 0' }, //this represents a clean cell w/out tetrominos
    I: { 
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],  
        ],
        color: '54, 194, 248', //hex #36c2f8
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 0],
        ],
        color: '248, 162, 54', //hex #f8a236
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
        ],
        color: '227, 248, 54', //hex #e3f836
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        color: '54, 77, 248', //hex #364df8
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: '248, 54, 54', //hex #f83636
    },
    S: {
        shape: [
            [0, 'S','S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: '65, 182, 17', //hex #41b611
    },
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0],
        ],
        color: '140, 14, 148', //hex #8c0e94
    }
};


//the function below generates random tetrominos(game pieces)
export const randomTetromino = () => {
    const tetrominos = 'ILOJZST';
    const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
}