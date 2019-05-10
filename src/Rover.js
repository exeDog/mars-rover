import React from 'react'

export const Rover = ({ facing, ghost }) => {
    return <span className={`rover ${facing} ${ghost ? ghost: ''}`}>🛦</span>
};
