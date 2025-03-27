import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryTable from '../summary/SummaryTable.jsx';
import DistributionTable from '../summary/DistributionTable.jsx';
import Chart from '../summary/Chart.jsx';
import '../assets/print.css'

function Overview() {
    const navigate = useNavigate();
    
    const [athlete, setAthlete] = useState('');
    const [opponent, setOpponent] = useState('');
    const [competition, setCompetition] = useState('');
    const [division, setDivison] = useState('');
    const [data, setData] = useState({});
    const [athlScores, setAthlScores] = useState({});
    const [oppScores, setOppScores] = useState({});

    // function that transform the page into pdf
    function handlePrint() {
        // NOTE: do we keep this function?
    }

    function handleExit() {
        const confirmExit = window.confirm("Are you sure you want to exit this page?");
        if (confirmExit) {
            navigate('/startPage'); 
        }
    }

    function calculateWinner() {
        const athleteScore = parseInt(athlScores.round1) + parseInt(athlScores.round2) + parseInt(athlScores.round3);
        const opponentScore = parseInt(Object.values(oppScores)[0]) + parseInt(Object.values(oppScores)[1]) + parseInt(Object.values(oppScores)[2]);
        
        if(athleteScore > opponentScore) { // Athlete wins
            return athlete.toUpperCase();
        }
        else if(athleteScore < opponentScore) { // Opponent wins
            return opponent.toUpperCase();
        }
        else {
            return 'TIE'
        }
    }
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                // Fetch data from server and set it on screen
            } catch (error) {
                console.error('Error fetching match data:', error);
                alert(`Error: ${error}`);
            }
        }

        fetchPlayers();
    }, [])

    return(
        <>
        <div id='winner-announcement'>
            <h3>WINNER OF THE {competition.toUpperCase()} COMPETITION</h3>
            <h2>{calculateWinner()}</h2> {/* CALCULATE WINNER */}
            <h2>-{division} KG</h2>
        </div>

        <div className='container-fuild' id='rounds-summary'>
            <div className='row'>
                <div className='col'><SummaryTable round={1} /></div>
                <div className='col'><SummaryTable round={2} /></div>
                <div className='col'><SummaryTable round={3} /></div>
            </div>
        </div>

        <DistributionTable data={data || {}}/>
        <Chart data={data || {}} />
        
        <div id='print-div'>
            <button 
                id='convertPdf' 
                onClick={handlePrint}>
                    Convert into PDF
            </button>
        </div>

        <div id='exit-container'>
            <button 
                id='exitBtn' 
                onClick={handleExit}>
                    Exit Analysis
            </button>
        </div>
        </>
    )
}

export default Overview