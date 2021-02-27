import { useState, useEffect, useCallback } from 'react';
//useState is used to return a stateful value and a function to undate it. 
//useEffect - functions passed to useEffect run after the render is committed to the screen.
/*useCallback is used to return a memorized version of the callback function that is passed.
it is also used to prevent unnecessary re-renders when it's props change*/

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
     // eslint-disable-next-line 
    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        //gets the score
        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared -1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
        
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
    calcScore();
}, [calcScore, rowsCleared, score]);

return [score, setScore, rows, setRows, level, setLevel];
};

