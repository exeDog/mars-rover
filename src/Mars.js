import React, { useState, useEffect } from 'react'
import { Rover } from './Rover'

const MOVE_VECTOR = {
    S: [0, -1],
    W: [-1, 0],
    N: [0, 1],
    E: [1, 0]
};

const LEFT_TURNS_MAP = {
    N: "W",
    W: "S",
    S: "E",
    E: "N"
};

const RIGHT_TURNS_MAP = {
    N: "E",
    E: "S",
    S: "W",
    W: "N"
};

export const Mars = props => {

    const { size,positionProp,commands,executeProp,onDone } = props;


    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [ops, setOps] = useState([]);
    const [position, setPosition] = useState("0-0");
    const [facing, setFacing] = useState("N");
    const [path, setPath] = useState(null);
    const [error, setError] = useState(null);


    useEffect(()=>{
        reset(()=>{
            process(commands,positionProp);
        });
    }, [props.commands, props.positionProp, props.executeProp]);

    const reset = cb => {
       setStart(null);
       setEnd(null);
       setOps([]);
       setPosition("0-0");
       setFacing("N");
       setPath(null);
       setError(null);
       if(cb) cb();
    };

    const process = (commands, positionProp) => {
        if (commands === '') {
            reset();
        } else {
           if(typeof positionProp === 'string'){
               const parts = positionProp.split(" ");
               setStart(`${parts[0]}-${parts[1]}`);
               setPosition(`${parts[0]}-${parts[1]}`);
               setFacing(parts[2]);
           }

            if (executeProp) {
                execute(commands);
            }
        }
    };

    const execute = commands => {
        let ops = commands || "";
        ops =  ops.split("");
        setOps(ops);
        setTimeout(run,500);
    };

    const run = () => {
        console.log(ops);
        let opsTemp = ops.slice();
        let pathTemp = path || {};
        pathTemp[position] = facing;
        let op = opsTemp.shift();
        let newPosition = {};
        console.log(op,opsTemp);
        if (op === 'L') {
            newPosition = turnRoverLeft();
        } else if (op === "R") {
            newPosition = turnRoverRight();
        } else if (op === "M") {
            newPosition = moveRoverForward();
        } else {
            console.log("Invalid command");
        }

        if(newPosition.error) {
            alert('Can not move beyond the boundaries of Mars');
        }

        setOps(opsTemp);
        setPath(pathTemp);
        setPosition(newPosition);

        if (ops.length > 0 && !error) {
            setTimeout(run,300);
        } else {
            setEnd(position);
        }
    };

    const turnRoverLeft = () => {
      return setFacing(LEFT_TURNS_MAP[facing]);
    };

    const turnRoverRight = () => {
        return setFacing(RIGHT_TURNS_MAP[facing]);
    };

    const moveRoverForward = (size) => {
        const moveVector = MOVE_VECTOR[facing];
        const pos = position.split('-').map(Number);
        const x = pos[0] + moveVector[0];
        const y = pos[1] + moveVector[1];
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return setError(true);
        }
        return setPosition(x + '-' + y);
    };

    let cells = [];

    useEffect(() => {

        let tempPath = path === null ? {} : path;

        setPath(tempPath);

        for (let i = size - 1; i >= 0; i--) {
            for (let j = 0; j < size; j++) {
                cells.push(j + "-" + i);
            }
        }
    },[cells, path, size]);

    return(
        <ul className="mars">
            {cells.map(cell => {

                let roverElm = null;
                let roverPath = null;
                let cellStatus = '';

                if (error && end === cell) {
                    cellStatus = 'error';
                }
                if (start === cell) {
                    cellStatus += ' start';
                }
                if (end === cell) {
                    cellStatus += ' end';
                }

                if (position === cell) {
                    roverElm = <Rover facing={facing}/>;
                } else {
                    roverPath = (path[cell] ? <Rover facing={path[cell]} ghost={true}/> : null);
                }

                return (
                    <li className={`cell ${!!path[cell] ? 'path' : ''} ${cellStatus}`} key={cell}>
                        <label>{cell}</label>
                        {roverElm || roverPath}
                    </li>
                );
            })}
        </ul>
    )
};
