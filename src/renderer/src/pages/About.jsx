import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright.jsx'

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

        <div className="container context-information">
            <h2>Acknowledgments</h2>
            <p>This application was inspired by my Taekwondo coach, Carlos Amezcua, who identified the need for an easy and 
                efficient way to improve the analysis of athlete by tracking points and kicks during matches. His insight 
                and feedback played a key role in shaping the features of this app. I am grateful for his support and guidance 
                throughout the development process.</p>
        </div>

        <div className="container context-information">
            <h2>Contact Information</h2>
            {/* <p>For suggestions or questions, feel free to reach out via email:{' '}
                <a href="mailto:camila.guzman023@hotmail.com">camila.guzman023@hotmail.com</a>
            </p>
            <h4>Relevant profiles</h4> */}
            <ul>
                <li><b>Website</b>: <a href="https://camilaguzman.me">camilaguzman.me</a></li>
                <li><b>LinkedIn</b>: <a href="https://www.linkedin.com/in/camila-guzman023/">LinkedIn Profile</a></li>
                {/* <li><a href="https://www.instagram.com/goldencami1/"></a>Instagram</li> */}
            </ul>
        </div>

        <div className="container context-information">
            <h2>Version Information</h2>
            <ul>
                <li><b>Version</b>: 1.0.0</li>
                <li><b>Release Date</b>: February 2025</li>
            </ul>
        </div>

        <Copyright />
        </>
    )
}

export default About