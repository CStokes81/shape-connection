import React from "react";
import Cell from './Cell';
import { StyledGrid } from './styles/StyledGrid';

const Grid = ({ grid }) => (
    <StyledGrid width={grid[0].length} height={grid.length}>
        {grid.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledGrid>);

    export default Grid;