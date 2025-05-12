// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InfoSection from './components/InfoSection';
import Team from './components/Team';
import Footer from './components/Footer';
import SunSignPage from './components/SunSignPage';
import IntroPage from './components/IntroPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOutIntro, setFadeOutIntro] = useState(false);

  const handleStart = () => {
    setFadeOutIntro(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000); // match the CSS animation duration (1s)
  };

  return (
    <Router>
      <div className="background-blur"></div>
      {showIntro ? (
        <IntroPage onStart={handleStart} fadeOut={fadeOutIntro} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <InfoSection />
                  <Team />
                </>
              }
            />
            <Route path="/sun-sign" element={<SunSignPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
