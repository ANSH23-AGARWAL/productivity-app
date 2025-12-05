import React, { useState } from 'react';
import Wrapper from './style';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    alert('Form submitted');

    navigate('/verification');
  };

  const handleGoogleLogin = () => {
    alert('Google login clicked');
  };

  const handleAppleLogin = () => {
    alert('Apple login clicked');
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="left-panel" />

        <div className="right-panel">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Back
          </button>
          <div className="signin-box">
            <h2>Sign In</h2>

            <div className="social-login">
              <button className="social-btn google" onClick={handleGoogleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
                Sign in with Google
              </button>
              <button className="social-btn apple" onClick={handleAppleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" />
                Sign in with Apple
              </button>
            </div>

            <div className="divider">or</div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
            </form>

            <div className="footer-text">
              Don’t have an account? <Link to="/sign-up">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignIn;
