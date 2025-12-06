import React, { useState } from 'react';
import axios from 'axios';
import Wrapper from './style';
import { Link, useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../../utils/toast';

import { FiArrowLeft } from 'react-icons/fi';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/').replace(/\/+$/, '');
const SIGNUP_ENDPOINT = '/user/send-otp';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }


    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}${SIGNUP_ENDPOINT}`,
        {
          name: sanitizedName,
          email: sanitizedEmail,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const message = response?.data?.message || 'OTP sent successfully';
      notifySuccess(message);

      const pendingUser = {
        name: sanitizedName,
        email: sanitizedEmail,
        password,
      };

      try {
        sessionStorage.setItem('pendingUser', JSON.stringify(pendingUser));
      } catch (storageError) {
        console.warn('Unable to persist pending user in sessionStorage', storageError);
      }

      setTimeout(() => {
        navigate('/verification', { state: { pendingUser } });
      }, 800);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const fallbackMessage = error.message === 'Network Error' ? 'Unable to reach server. Please try again.' : 'Failed to send OTP. Please try again.';
      notifyError(serverMessage || fallbackMessage);
      console.error('Sign up API error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending OTP...' : 'Sign Up'}
              </button>
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
