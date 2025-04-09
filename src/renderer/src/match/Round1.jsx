import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableContainer from '../components/TableContainer.jsx';
import ScoreBoard from '../components/ScoreBoard.jsx' 
import RoundComments from '../components/RoundComments.jsx';
import Copyright from '../components/Copyright.jsx';
import { roundContext, buttonContext } from '../../../shared/context.jsx';
import '../assets/match.css'

function Round1() {
    const [isClicked, setIsClicked] = useState(false);

    function nextPage() {
        setIsClicked(prev => !prev);
    }

    return(
        <>
        <roundContext.Provider value={1}>
            <buttonContext.Provider value={isClicked}>
                <TableContainer />
                <ScoreBoard />
                <RoundComments />
            </buttonContext.Provider>
        </roundContext.Provider>

        <div className='round-buttons'>
            <Link to='/'>
                <button 
                    id="goBack-button"
                    style={{
                        marginRight: '10rem'
                    }}>
                        &#60; Exit
                </button>
            </Link>
            <Link to='/round2'>
                <button 
                    id='goNext-button'
                    onClick={nextPage}
                    style={{
                        marginLeft: '10rem'
                    }}>
                    Round 2 &gt;
                </button>
            </Link>
        </div>
        
        <Copyright />
        </>
    )
}

export default Round1