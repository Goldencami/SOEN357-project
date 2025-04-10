import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SummaryTable from '../summary/SummaryTable.jsx';
import DistributionTable from '../summary/DistributionTable.jsx';
import Chart from '../summary/Chart.jsx';
import Copyright from '../components/Copyright.jsx';
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

    function handlePrint() {
        window.api.convertToPdf();
    }

    async function handleExit() {
        try {
            const result = await Swal.fire({
                icon: 'question',
                title: 'Exit Overview',
                text: 'Are you sure you want to exit this page?',
                showCancelButton: true,
                confirmButtonText: 'Yes, exit',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await window.api.resetData();
                navigate('/startPage'); 
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
            });
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
                const matchData = await window.api.getMatchData();
                setAthlete(matchData.athlete);
                setOpponent(matchData.opponent);
                setCompetition(matchData.competition);
                setDivison(matchData.division);

                const res = await window.api.getAllRounds();
                setData(res);

                const athleteData = await window.api.getAthlAllScores();
                setAthlScores(athleteData);

                const opponentData = await window.api.getOppAllScores();
                setOppScores(opponentData);

            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong. Please try again.',
                });
            }
        }

        fetchPlayers();
    }, [])

    return(
        <>
        <div id='header'>
            <h1>Taekwondo Hit Counter</h1>
        </div>
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

        <Copyright />
        </>
    )
}

export default Overview