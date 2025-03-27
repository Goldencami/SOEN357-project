import { Link } from 'react-router-dom';

function HomePage() {
    return(
        <>
        <div className="container-fluid" id="tagline">
            <div className="row">
                <div className="col"></div>
                <div className="col-10">
                    <h1 style={{marginBottom: '1.2em'}}>Taekwondo Hit Counter App</h1>
                    <h2>Track your kicks and points during Taekwondo matches or trainings. Start your analysis today!</h2>
                </div>
                <div className="col"></div>
            </div>
        </div>

        <div id='menu'>
            <Link to="/startPage"><button className='pagesBtn'>Start</button></Link>
            <Link to="/tutorial"><button className='pagesBtn'>Tutorial</button></Link>
            <Link to="/about"><button className='pagesBtn'>About</button></Link>
        </div>

        <div id='policy-link'>
            <Link to='/policy'><h5>Policy & Terms of Use</h5></Link>
        </div>
        </>
    )
}

export default HomePage