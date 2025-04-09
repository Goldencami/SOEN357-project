import React, { useState, useEffect, useContext } from 'react';
import { roundContext, buttonContext } from '../../../shared/context.jsx';

function ScoreBoard() {
    const round = useContext(roundContext);
    const nextRound = useContext(buttonContext);
    // State for athlete and opponent names
    const [athlete, setAthlete] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [athletePoints, setAthletePoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const [intensity, setIntensity] = useState(0);
    const [gamjeoms, setGamjeoms] = useState(0);

    async function updateInfo() {
        try {
            await window.api.setRoundInfo({ round, intensity, gamjeoms });
        } catch (error) {
            console.error('Error saving match data:', error);
            alert(error);
        }
    }

    async function postAthleteScore() {
        try {
            await window.api.setAthleteScore({ round, athletePoints });
        } catch (error) {
            console.error('Error saving match data:', error);
            alert(error);
        }
    }

    async function postOpponentScore() {
        try {
            await window.api.setOpponentScore({ round, opponentPoints });
        } catch (error) {
            console.error('Error saving match data:', error);
            alert(error);
        }
    }

    // get athletes names and round-info from session storage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const names = await window.api.getMatchData();
                setAthlete(names.athlete);
                setOpponent(names.opponent);
                
                const info = await window.api.getRoundInfo({ round });
                setIntensity(info.intensity);
                setGamjeoms(info.gamjeoms);

                const athleteScore = await window.api.getAthleteScore({ round });
                setAthletePoints(athleteScore);

                const opponentScore = await window.api.getOpponentScore({ round });
                setOpponentPoints(opponentScore);
            } catch (error) {
                console.error('Error fetching match data:', error);
                alert(error);
            }
        };
        
        fetchData();
    }, []);

    // save round info before going to next round
    useEffect(() => {
        if(nextRound) {
            postAthleteScore();
            postOpponentScore();
            updateInfo();
        }
    }, [nextRound]);

    return(
        <>
        <div className="container intensity-gamjeom">
            <div className="row">
                <div className="col">
                    <label htmlFor="round-intensity">ROUND INTENSITY (1-5)</label>
                    <select name="select-intensity" id="select-intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="round-gamjeom">GAMJEOMS</label>
                    <input type="number" id='select-intensity' value={gamjeoms} onChange={(e) => setGamjeoms(e.target.value)} min={0} />
                </div>
            </div>
        </div>

        <table className="score-table">
            <thead>
                <tr>
                    <th className="round-score" colSpan={2}>ROUND SCORE</th>
                </tr>
            </thead>
            <tbody className="points-values">
                <tr>
                    <td>{athlete}</td>
                    <td>{opponent}</td>
                </tr>
                <tr className="points-row">
                    <td>
                        <input type="number" 
                        value={athletePoints}
                        onChange={(e) => setAthletePoints(e.target.value)} 
                        onKeyDown={(e) => {
                            if(e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') e.preventDefault();
                        }}
                        min={0} />
                    </td>
                    <td>
                        <input type="number" 
                        value={opponentPoints} 
                        onChange={(e) => setOpponentPoints(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') e.preventDefault();
                        }}
                        min={0} />
                    </td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default ScoreBoard