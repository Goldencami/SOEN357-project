import { Link } from 'react-router-dom';

function About() {
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
                    <h1>Master Your Technique. Track Your Progress. Excel in Taekwondo.</h1>
                </div>
                <div className="col"></div>
            </div>
        </div>
        
        <div className="container context-information">
            <h2>Purpose of the Application</h2>
            <p>The Taekwondo Hit Counter is a user-friendly and innovative application designed specifically for Taekwondo athletes, 
                coaches, and enthusiasts. Its primary purpose is to help track the number of kicks, hits, and points scored during 
                training sessions or matches. By providing real-time tracking and feedback, the app serves as a reliable companion 
                for practitioners to analyze their performance and improve their techniques over time.</p>
        </div>

        <div className="container context-information">
            <h2>Key Features</h2>
            <ul>
                <li>Track athlete's points and kicks in real-time.</li>
                <li>User-friendly interface for fast input during matches.</li>
                <li>Built to support Taekwondo matches and assist in analyzing athlete performance.</li>
            </ul>
        </div>
        </>
    )
}

export default About