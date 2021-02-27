import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from "../tetrominos"

const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default React.memo(Cell);
//React.memo ensures react renders the component and memorizes the results
//In this instance it will ensure React only renders the changed cells 