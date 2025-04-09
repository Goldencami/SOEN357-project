import React, { useState, useEffect, useContext } from 'react';
import { roundContext, buttonContext } from '../../shared/context.jsx';

function TrackContainter({ attack }) {
    const round = useContext(roundContext);
    const nextRound = useContext(buttonContext);
    // attack observing
    const attackName = lowerCaseAttack()
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
            // Post points in server
        } catch (error) {
            console.error('Error saving data:', error);
            alert(`Error: ${error}`);
        }
    }

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                // Fetch data from server
            } catch (error) {
                console.error('Error fetching match data:', error);
                alert(`Error: ${error}`);
            }
        };

        fetchPoints();
    }, []);

    function lowerCaseAttack() {
        switch (attack) {
            case 'ROUNDHOUSE':
                return 'roundHouse';
            case 'BACK KICK': 
                return 'backKick';
            case 'SPIN HOOK':
                return 'spinHook';
            default:
                return attack.toLowerCase();
        }
    }
    
    useEffect(() => {
        if(nextRound) {
            updatePoints(lowerCaseAttack(), 'open_left', openLeft);
            updatePoints(lowerCaseAttack(), 'open_right', openRight);
            updatePoints(lowerCaseAttack(), 'closed_left', closedLeft);
            updatePoints(lowerCaseAttack(), 'closed_right', closedRight);
            updatePoints(lowerCaseAttack(), 'trunk', trunk);
            updatePoints(lowerCaseAttack(), 'head', head);
            updatePoints(lowerCaseAttack(), 'hasScored', hasScored);
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
                <button className='substract-btn' onClick={() => setClosedLeft(prevPoint => prevPoint - 1)}>-</button>
                <p className='tracker'>{closedLeft}</p>
                <button className='add-btn' onClick={() => setClosedLeft(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => setClosedRight(prevPoint => prevPoint - 1)}>-</button>
                <p className='tracker'>{closedRight}</p>
                <button className='add-btn' onClick={() => setClosedRight(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => setTrunk(prevPoint => prevPoint - 1)}>-</button>
                <p className='tracker'>{trunk}</p>
                <button className='add-btn' onClick={() => setTrunk(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => setHead(prevPoint => prevPoint - 1)}>-</button>
                <p className='tracker'>{head}</p>
                <button className='add-btn' onClick={() => setHead(prevPoint => prevPoint + 1)}>+</button>
            </td>
            <td>
                <button className='substract-btn' onClick={() => setHasScored(prevPoint => prevPoint - 1)}>-</button>
                <p className='tracker'>{hasScored}</p>
                <button className='add-btn' onClick={() => setHasScored(prevPoint => prevPoint + 1)}>+</button>
            </td>
        </tr>
        </>
    )
}

export default TrackContainter;