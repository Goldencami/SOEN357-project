import React, { useEffect } from 'react';
import { initializeRoundData } from '../../../shared/data.js';
import { lowerCaseAttack } from '../../../shared/attacks.js';

function AllPoints({ attack, data }) {
    const { 
        round1 = initializeRoundData(),
        round2 = initializeRoundData(),
        round3 = initializeRoundData()
    } = data;

    var overall = round1[lowerCaseAttack(attack)].hasScored +
                    round2[lowerCaseAttack(attack)].hasScored +
                    round3[lowerCaseAttack(attack)].hasScored;

    return(
        <tr className='move-row' key={attack}>
            <td>{attack}</td>
            <td>{round1[lowerCaseAttack(attack)].hasScored}</td>
            <td>{round2[lowerCaseAttack(attack)].hasScored}</td>
            <td>{round3[lowerCaseAttack(attack)].hasScored}</td>
            <td>{overall}</td>
        </tr>
    )
}

export default AllPoints