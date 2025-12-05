import React, { useState } from 'react';
import Wrapper from './style';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    alert(`Welcome ${name}, your account is created!`);

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
          <div className="signup-box">
            <h2>Create Account</h2>

            <div className="social-login">
              <button className="social-btn google" onClick={handleGoogleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
                Sign up with Google
              </button>
              <button className="social-btn apple" onClick={handleAppleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" />
                Sign up with Apple
              </button>
            </div>

            <div className="divider">or</div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>

            <div className="footer-text">
              Already registered? <Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
