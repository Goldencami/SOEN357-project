import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright';

function Tutorial() {
    return(
        <>
        <div className="container-fluid" id="tagline">
            <div className="row">
                <div className="col">
                    <Link to="/">
                        <button id="goBack-button">&#60;</button>
                    </Link>
                </div>
                <div className="col-10">
                    <h1>Learn how to use the application. Easy and Simple!</h1>
                </div>
                <div className="col"></div>
            </div>
        </div>
        <Copyright />
        </>
    )
}

export default Tutorial