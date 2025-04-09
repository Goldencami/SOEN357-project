import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableContainer from '../components/TableContainer.jsx';
import ScoreBoard from '../components/ScoreBoard.jsx' 
import RoundComments from '../components/RoundComments.jsx';
import { roundContext, buttonContext } from '../../shared/context.jsx';
import '../assets/match.css'

function Round1() {
    const [isClicked, setIsClicked] = useState(false);

    // when clicking button to go to next page, notify TableContainer, ScoreBoard and RoundComments to save their data
    function nextPage() {
        setIsClicked(prev => !prev);
    }

    return(
        <>
        <roundContext.Provider value={3}>
            <buttonContext.Provider value={isClicked}>
                <TableContainer />
                <ScoreBoard />
                <RoundComments />
            </buttonContext.Provider>
        </roundContext.Provider>

        <div className='round-buttons'>
            <Link to='/round2'>
                <button 
                    id="goBack-button"
                    style={{
                        marginRight: '10rem'
                    }}>
                        &#60; Round 2
                </button>
            </Link>
            <Link to='/overview'>
                <button 
                    id='goNext-button' 
                    onClick={nextPage}
                    style={{
                        marginLeft: '10rem'
                    }}>
                        Overview!
                </button>
            </Link>
        </div>
        </>
    )
}

export default Round1