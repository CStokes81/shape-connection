import { useEffect, useRef } from 'react';

/*useRef is used when you want a piece of information that continues for the 
lifetime of the component, not just during the render cycle*/

export function useInterval(callback, delay) {
    const savedCallback = useRef();
    //remembers the last callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    //sets up the interval
    useEffect(() => {
        function drop() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(drop, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}