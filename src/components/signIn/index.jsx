import React, { useState } from 'react';
import axios from 'axios';
import Wrapper from './style';
import { Link, useNavigate } from 'react-router-dom';
import { notifySuccess, notifyError } from '../../utils/toast';

import { FiArrowLeft } from 'react-icons/fi';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/').replace(/\/+$/, '');
const LOGIN_ENDPOINT = '/user/login';

const persistAuthUser = (user) => {
  if (!user) return;
  try {
    const serialized = JSON.stringify(user);
    sessionStorage.setItem('authUser', serialized);
    localStorage.setItem('authUser', serialized);
  } catch (storageError) {
    console.warn('Unable to persist auth user data', storageError);
  }
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    const sanitizedEmail = email.trim().toLowerCase();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}${LOGIN_ENDPOINT}`,
        {
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

      const message = response?.data?.message || 'Login successful';
      notifySuccess(message);

      if (response?.data?.user) {
        persistAuthUser(response.data.user);
      }

      setTimeout(() => {
        navigate('/dash');
      }, 800);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const fallbackMessage = error.message === 'Network Error' ? 'Unable to reach server. Please try again.' : 'Login failed. Please try again.';
      notifyError(serverMessage || fallbackMessage);
      console.error('Login API error:', error);
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
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
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
