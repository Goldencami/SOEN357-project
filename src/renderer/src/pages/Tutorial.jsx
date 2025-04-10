import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright';
import formImg from '../assets/img/filled-form.png';
import round_table from '../assets/img/round-table.png';
import score_section from '../assets/img/score-section.png';
import overall_results from '../assets/img/overall-results.png';
import overall_scores from '../assets/img/overall-scores.png';
import chart from '../assets/img/chart.png';

function Tutorial() {
    return(
        <>
        <div className="container-fluid" id="tagline">
            <div className="row">
                <div className="col">
                    <Link to="/">
                        <button 
                            id="goBack-button" 
                            style={{position: 'fixed', top:'88px'}}
                        >&#60;</button>
                    </Link>
                </div>
                <div className="col-10">
                    <h1>Learn how to use the application. Easy and Simple!</h1>
                </div>
                <div className="col">
                </div>
            </div>
        </div>

        <div>
            <div className='container tutorial-img'>
                <h2>Use to keep track of your athelte's hits for each round</h2>
                <img src={round_table} height={500} alt='form' />
            </div>
            <div className='container tutorial-img'>
                <h2>Get your results at the end of the analysis!</h2>
                <img src={overall_results} height={500} alt='form' />
                <img src={overall_scores} height={500} alt='form' />
            </div>
            <div className='container tutorial-img'>
                <h2>Get your feedback based on the hit scored successfully!</h2>
                <h3>Download your analysis with a simple click!</h3>
                <img src={chart} height={500} alt='form' />
            </div>
        </div>
        <Copyright />
        </>
    )
}

export default Tutorial