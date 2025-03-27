import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();
    // Session information to store
    const [athlete, setAthlete] = useState('');
    const [opponent, setOpponent] = useState('');
    const [competition, setCompetition] = useState('');
    const [division, setDivison] = useState('');

    async function postData() {
        try {
            // Post data in server
        } catch (error) {
            console.error('Error saving match data:', error);
            alert('Error: Failed to save match data!');
        }
    }
    
    // ensures postData is completed before navigation
    async function startAnalysis() {
        try {
            await postData();
            navigate('/round1');  
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Failed to save match data!');
        }
    }

    return(
        <>
        <div className="tagline container" id='input-warning'>
            <div className="row">
                <div className="col">
                    <Link to="/"><button id="goBack-button">&#60;</button></Link>
                </div>

                <div className="col-10">
                    <h2>Please fill in the following information regarding the athletes and the match</h2>
                </div>

                <div className="col"></div>
            </div>
        </div>
        
        <div className="container" id='athlete-info'>
            <h2>ATHLETES INFORMATION</h2>
            <div className="row athlete-input">
                <div className="col-2">
                    <p>ATHLETE:</p>
                </div>
                <div className="col">
                    <input id="athlete-input" value={athlete} onChange={(e) => setAthlete(e.target.value)} type="text" placeholder="Athlete's Name"/>
                </div>
                <div className="col-2">
                    <p>OPPONENT:</p>
                </div>
                <div className="col">
                    <input id="opponent-input" value={opponent} onChange={(e) => setOpponent(e.target.value)} type="text" placeholder="Opponent's Name"/>
                </div>
            </div>
        </div>
        
        <div className="container" id='match-info'>
            <h2>MATCH INFORMATION</h2>
            <div className="row competition-input">
                <div className="col-2">
                    <p>COMPETITION:</p>
                </div>
                <div className="col">
                    <input id="competition-input" value={competition} onChange={(e) => setCompetition(e.target.value)} type="text" placeholder="Competition"/>
                </div>
                <div className="col-2">
                    <p>DIVISION:</p>
                </div>
                <div className="col">
                    <input id="division-input" value={division} onChange={(e) => setDivison(e.target.value)} type="text" inputMode="numeric" placeholder="Division (Kg)"/>
                </div>
            </div>
        </div>

        <div id='match-start'>
            <button onClick={startAnalysis}>Start!</button>
        </div>
        </>
    )
}

export default StartPage