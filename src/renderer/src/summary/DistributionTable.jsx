import AllPoints from './AllPoints.jsx';
import { attacks } from '../../../shared/attacks.js';

function DistributionTable({ data }) {
    return(
        <div className='container-fluid' id='athlete-striking'>
            <h2>Athlete Striking Distribution Table</h2>
            <table className='distribution-table'>
                <thead>
                    <tr className='section-row'>
                        <th style={{width: "20%"}}>TECHNIQUES</th>
                        <th>ROUND 1</th>
                        <th>ROUND 2</th>
                        <th>ROUND 3</th>
                        <th>OVERALL</th>
                    </tr>
                </thead>
                <tbody>
                    {attacks.map((attack) => (
                        <AllPoints
                            key={attack}
                            attack={attack}
                            data={data || []}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DistributionTable