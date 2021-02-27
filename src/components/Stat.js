import React from 'react';
import { StyledStats } from "./styles/StyledStats";

const Stat = ({ gameOver, text }) => (
    <StyledStats gameOver={gameOver}>{text}</StyledStats>
);

export default Stat;