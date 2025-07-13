import React, { useState } from 'react';
import Wrapper from './style';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    alert(`Welcome back, ${email}!`);
  };

  const handleGoogleLogin = () => {
    alert('Google Login Clicked');
  };

  const handleAppleLogin = () => {
    alert('Apple Login Clicked');
  };

  return (
    <Wrapper>
      <div className="background">
        <div className="overlay">
          <div className="signin-box">
            <h2>Sign In</h2>

            <div className="social-login">
              <button className="google-btn" onClick={handleGoogleLogin}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                />
                <span>Sign in with Google</span>
              </button>
              <button className="apple-btn" onClick={handleAppleLogin}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                />
                <span>Sign in with Apple</span>
              </button>
            </div>

            <div className="divider">or</div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign In</button>
            </form>

            <p className="footer-text">
              New here? <Link to="/sign-up">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignIn;
