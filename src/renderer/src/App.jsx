import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import StartPage from './pages/StartPage.jsx';
import About from './pages/About.jsx';
import Policy from './pages/Policy.jsx';
import Round1 from './match/Round1.jsx';
import Round2 from './match/Round2.jsx';
import Round3 from './match/Round3.jsx';
import Overview from './match/Overview.jsx';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/startPage" element={<StartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        
        <Route path="/round1" element={<Round1 />} />
        <Route path="/round2" element={<Round2 />} />
        <Route path="/round3" element={<Round3 />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
    </>
  )
}

export default App