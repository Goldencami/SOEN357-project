import React, { useState, useEffect } from 'react';
import TrackerSummary from './TrackerSummary.jsx';
import CommentSummary from './CommentSummary.jsx';
import ScoresSummary from './ScoresSummary.jsx';
import { attacks, lowerCaseAttack } from '../../shared/attacks.js';

function SummaryTable({ round }) {
    const [data, setData] = useState({});
    const [matchData, setMatchData] = useState({});
    const [oppScore, setOppScore] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from server
            } catch (error) {
                console.error('Error fetching match data:', error);
                alert(`Error: ${error}`);
            }
        };

        fetchData();
    }, [round]);

    return(
        <>
        <table className='techniques-table'>
            <thead>
                <tr className='round-number'>
                    <th colSpan={8}>ROUND {round}</th>
                </tr>
                <tr className='stance-row'>
                    <th colSpan={1}></th>
                    <th colSpan={2}>OPEN</th>
                    <th colSpan={2}>CLOSED</th>
                    <th colSpan={3}>SECTION</th>
                </tr>
                <tr className='section-row'>
                    <th style={{width: "10%"}}>TECHNIQUES</th>
                    <th>LEFT</th>
                    <th>RIGHT</th>
                    <th>LEFT</th>
                    <th>RIGHT</th>
                    <th>TRUNK</th>
                    <th>HEAD</th>
                    <th># SCORED</th>
                </tr>
            </thead>
            <tbody>
                {attacks.map((attack) => (
                    <TrackerSummary
                        key={attack}
                        attack={attack}
                        data={data[lowerCaseAttack(attack)] || {}}
                        />
                ))}
            </tbody>
        </table>

        <ScoresSummary data={data || {}} matchData={matchData || {}} oppScore={oppScore} />
        <CommentSummary data={data.comments || ''} />
        </>
    )
}

export default SummaryTable