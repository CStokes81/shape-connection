import React from 'react';
import { StyledGameButton } from './styles/StyledGameButton';

const GameButton = ({ callback }) => (
    <StyledGameButton onClick={callback}>
        Start Game
    </StyledGameButton>
);

export default GameButton;