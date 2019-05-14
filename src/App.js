import React, { useState, useEffect } from 'react'
import './App.css'
import { Mars } from './Mars'

const Rover  = () => {
    const [ commands, setCommands ] = useState('');
    const [ commandsToExecute, setCommandsToExecute ] = useState('');
    const [ execute, setExecute ] = useState(false);
    const [ startPosition, setStartPosition ] = useState('00N');
    let startValue = '';

    const addCommand = e => {
        setCommands(commands + e.target.value);
    };

    const runSample = e => {
        setCommands(e.target.value);
    };

    const executeFunction = () => {
        let startPosition = startValue.value;
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

    var position = startPosition;
    useEffect(()=>{
        position = position.split('').join(' ');
    });



    return (
        <div className={'app'}>
            <h1 className={'app-name'}>Mars Rover in JavaScript / React</h1>
            <div className={`control-panel`}>
                <div className={'start-position'}>
                    <label
                        htmlFor="startPosition"
                    >
                        Start Position (Eg. 00N):
                    </label>
                    <input type="text"
                           id="startPosition"
                           maxLength={3}
                           required
                           pattern={'^[0-4][0-4][NEWS]$'}
                           defaultValue={'00N'}
                           onBlur={validateStartPosition}
                           ref={(elm) => {
                               startValue = elm
                           }}
                    />
                </div>
                <div className='commands'>
                    <button value='M' onClick={addCommand}>Move</button>
                    <button value='L' onClick={addCommand}>Left</button>
                    <button value='R' onClick={addCommand}>Right</button>
                </div>
                <div className='execution'>
                    <button onClick={clear} className='secondary'>✖</button>
                    <input type="text" readOnly value={commands}/>
                    <button className={'cta'} onClick={executeFunction}>Execute</button>
                </div>
                <div className='samples'>
                    <label>Sample: </label>
                    <ul>
                        <li>
                            <button value={'MMRMMLMMRM'} onClick={runSample}>MMRMMLMMRM</button>
                        </li>
                        <li>
                            <button value={'RMMMLMRMLM'} onClick={runSample}>RMMMLMRMLM</button>
                        </li>
                    </ul>
                </div>
            </div>
            <Mars
                size={5}
                positionProp={position}
                commands={commandsToExecute}
                executeProp={execute}
                onDone={stopExecute}
            />
        </div>
    )





};

export default Rover;
