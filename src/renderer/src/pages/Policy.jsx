import { Link } from 'react-router-dom';
import Copyright from "../components/Copyright";

function Policy() {
    return(
        <>
        <div className="goBack-container container">
            <div className="row">
                <div className="col">
                    <Link to="/"><button id="goBack-button">&#60;</button></Link>
                </div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
        </div>
    
        <div className='container' id='privacy-policy'>
            <h2>Privacy Policy</h2>
            <p>The Taekwondo Hit Counter app values your privacy. At this time, the application does not collect, 
                store, or share any personal data. All actions and information tracked during matches remain local 
                to your device and are not transmitted to external servers or third parties.</p>
            <p>As the app evolves, future updates may include features that require data storage, such as saving 
                match history or user accounts. If these features are implemented, this Privacy Policy will be updated 
                accordingly to reflect how your data is managed.</p>
            <p>If you have any questions or concerns about this policy, please contact us at {' '}
                <a href="mailto:inflUXofPengUIns@hotmail.com">inflUXofPengUIns@hotmail.com</a>.</p>
        </div>
    
        <div className='container' id='terms-of-use'>
            <h2>Terms of Use</h2>
            <p>Welcome to the Taekwondo Hit Counter! By using this application, you agree to the following terms:</p>
            <ol>
                <li>
                    <strong>Purpose:</strong> The app is designed for personal use by Taekwondo athletes, coaches,
                    and enthusiasts. It helps track points and kicks during matches or training sessions.
                </li>
                <li>
                    <strong>No Guarantees:</strong> The app is provided "as is" without any warranties, guarantees
                    of performance, or fitness for a particular purpose. While we strive to ensure the app is
                    accurate and reliable, errors may occur, and users assume all responsibility for its use.
                </li>
                <li>
                    <strong>Updates and Changes:</strong> We may update the app and these terms over time. Continued
                    use of the app after updates constitutes acceptance of the revised terms.
                </li>
                <li>
                    <strong>Contact Information:</strong> For questions, feedback, or suggestions, please reach out to{' '}
                    <a href="mailto:inflUXofPengUIns@hotmail.com">inflUXofPengUIns@hotmail.com</a>.
                </li>
            </ol>
        </div> 
        <Copyright />
        </>
    )
}

export default Policy