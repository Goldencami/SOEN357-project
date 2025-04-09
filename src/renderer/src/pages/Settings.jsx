import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright.jsx'

function Settings() {
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
                    <h1>Settings</h1>
                </div>
                <div className="col"></div>
            </div>
        </div>
        <Copyright />
        </>
    )
}

export default Settings