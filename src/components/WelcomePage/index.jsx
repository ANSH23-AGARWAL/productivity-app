import React from 'react';
import Wrapper from './style';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const WelcomePage = () => {
  return (
    <Wrapper>
      <div className="welcome-container">
        <div className="welcome-left logo-only">
          <img src="/BoardWiseApp_Logo.png" alt="BoardWise logo" className="logo" />
        </div>
        <div className="welcome-right">
          <div className="header-bar">
            <span className="nav-link">Welcome</span>
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
          <div className="welcome-content left-align">
            <h2 className="welcome-heading-big">Welcome</h2>
            <p className="intro large-intro left-message">
              Welcome to BoardWise – your smart workspace for organizing tasks, managing boards, and collaborating with your team. Whether it's work, study, or ideas, BoardWise helps you stay productive, focused, and in control – all in one place.
            </p>
            <div className="auth-buttons">
              <Link to="/sign-in" className="auth-btn signin dark-btn">Sign In</Link>
              <Link to="/sign-up" className="auth-btn signup dark-btn">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WelcomePage; 