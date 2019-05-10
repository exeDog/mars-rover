import React, { useState } from 'react';


const Rover  = () => {
    const [ commands, setCommands ] = useState('');
    const [ commandsToExecute, setCommandsToExecute ] = useState('');
    const [ execute, setExecute ] = useState(false);
    const [ startPosition, setStartPosition ] = useState('00N');
    const[ test, setTest ] = useState(0);
    let startValue = '';

    const addCommand = e => {
        setCommands(commands + e.target.value);
    };

    const runSample = e => {
        setCommands(e.target.value);
    };

    const executeFunction = () => {
        let startPosition = startValue;
        if (/^[0-4][0-4][NEWS]$/.test(startPosition)) {
            setExecute(true);
            setCommandsToExecute(commands);
            setStartPosition(startPosition);
        } else {
            alert('Invalid Move');
        }
    };

    const clear = () => {
        setCommands('');
        setExecute(false);
        setCommandsToExecute('');
    };

    const validateStartPosition = e => {
        e.target.checkValidity();
    };

    const stopExecute = () => {
        setExecute(false);
    };

    let position = startPosition;
    position = position.split('').join(' ');

    return <div>

    </div>





};

export default Rover;
