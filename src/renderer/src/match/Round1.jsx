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
                <div className='container-fluid round-container'>
                    <div className="goBack-container container">
                        <div className="row">
                            <div className="col">
                                <Link to="/">
                                    <button 
                                        id='goBack-button'
                                        style={{
                                            position: 'absolute',
                                            left: '10px',
                                            top: '10px'
                                        }}>
                                            &#60; Exit
                                    </button>
                                </Link>
                            </div>
                            <div className="col"></div>
                            <div className="col"></div>
                        </div>
                    </div>
                    <TableContainer />
                </div>
                <ScoreBoard />
                <RoundComments />
            </buttonContext.Provider>
        </roundContext.Provider>

        <div className='round-buttons'>
            <Link to='/round2'><button id="goNext-button" onClick={nextPage}>Round 2 &gt;</button></Link>
        </div>
        
        <Copyright />
        </>
    )
}

export default Round1