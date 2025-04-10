import React, { useState, useEffect, useContext } from 'react';
import { roundContext, buttonContext } from '../../../shared/context.jsx';
import { lowerCaseAttack } from '../../../shared/attacks.js';
import Swal from 'sweetalert2';

function TrackContainter({ attack }) {
    const round = useContext(roundContext);
    const nextRound = useContext(buttonContext);
    // attack observing
    const attackName = lowerCaseAttack(attack)
    // points states
    const [openLeft, setOpenLeft] = useState(0);
    const [openRight, setOpenRight] = useState(0);
    const [closedLeft, setClosedLeft] = useState(0);
    const [closedRight, setClosedRight] = useState(0);
    const [trunk, setTrunk] = useState(0);
    const [head, setHead] = useState(0);
    const [hasScored, setHasScored] = useState(0);

    async function updatePoints(attack, info, points) {
        try {
            await window.api.setPoints({ round, attack, info, points });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
            });
        }
    }

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const data = await window.api.getPoints({ round });
                setOpenLeft(data[attackName].open_left);
                setOpenRight(data[attackName].open_right);
                setClosedLeft(data[attackName].closed_left);
                setClosedRight(data[attackName].closed_right);
                setTrunk(data[attackName].trunk);
                setHead(data[attackName].head);
                setHasScored(data[attackName].hasScored);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                });
            }
        };

        fetchPoints();
    }, []);

    function addScoredPoint() {
        if(hasScored < (openLeft + openRight + closedLeft + closedRight + trunk + head) && attackName != 'cancel') {
            setHasScored(prevPoint => prevPoint + 1)
        }
    }
    
    useEffect(() => {
        if(nextRound) {
            updatePoints(attackName, 'open_left', openLeft);
            updatePoints(attackName, 'open_right', openRight);
            updatePoints(attackName, 'closed_left', closedLeft);
            updatePoints(attackName, 'closed_right', closedRight);
            updatePoints(attackName, 'trunk', trunk);
            updatePoints(attackName, 'head', head);
            updatePoints(attackName, 'hasScored', hasScored);
        }
    }, [nextRound])

    return(
        <>
        <tr className='move-row'>
            <td>{attack}</td>
            <td>
                <button className='substract-btn' onClick={() => { if(openLeft > 0) setOpenLeft(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{openLeft}</p>
                <button className='add-btn' onClick={() => setOpenLeft(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(openRight > 0) setOpenRight(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{openRight}</p>
                <button className='add-btn' onClick={() => setOpenRight(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(closedLeft > 0) setClosedLeft(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{closedLeft}</p>
                <button className='add-btn' onClick={() => setClosedLeft(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(closedRight > 0) setClosedRight(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{closedRight}</p>
                <button className='add-btn' onClick={() => setClosedRight(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(trunk > 0) setTrunk(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{trunk}</p>
                <button className='add-btn' onClick={() => setTrunk(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(head > 0) setHead(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{head}</p>
                <button className='add-btn' onClick={() => setHead(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => { if(hasScored > 0) setHasScored(prevPoint => prevPoint - 1)}}>-</button>
                <p className='tracker'>{hasScored}</p>
                <button className='add-btn' onClick={addScoredPoint}>+</button>
            </td>
        </tr>
        </>
    )
}

export default TrackContainter;