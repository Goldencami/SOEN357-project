function ScoresSummary({ data, matchData, oppScore }) {
    const { totalScore, intensity, gamjeoms } = data;
    const { athlete, opponent } = matchData;

    return(
        <>
        <table className='scores-table'>
            <thead>
                <tr>
                    <th style={{width: "20%"}}></th>
                    <th style={{width: "40%"}}>{athlete}</th>
                    <th style={{width: "40%"}}>{opponent}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>SCORES</td>
                    <td>{totalScore}</td>
                    <td>{oppScore}</td>
                </tr>
            </tbody>
        </table>

        <table className='info-table'>
            <thead>
                <tr>
                    <th style={{width: "20%"}}></th>
                    <th style={{width: "40%"}}>INTENSITY (1-5)</th>
                    <th style={{width: "40%"}}>GAMJEOMS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{width: "10%"}}>SCORES</td>
                    <td>{intensity}</td>
                    <td>{gamjeoms}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default ScoresSummary