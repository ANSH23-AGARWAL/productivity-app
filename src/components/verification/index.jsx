import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wrapper from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { notifySuccess, notifyError } from '../../utils/toast';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/').replace(/\/+$/, '');
const VERIFY_ENDPOINT = '/user/verify-otp';

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

const VerifyCode = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [pendingUser, setPendingUser] = useState(() => {
    if (location.state?.pendingUser) {
      return location.state.pendingUser;
    }
    try {
      const stored = sessionStorage.getItem('pendingUser');
      return stored ? JSON.parse(stored) : null;
    } catch (storageError) {
      console.warn('Unable to read pending user from sessionStorage', storageError);
      return null;
    }
  });

  useEffect(() => {
    if (location.state?.pendingUser) {
      try {
        sessionStorage.setItem('pendingUser', JSON.stringify(location.state.pendingUser));
      } catch (storageError) {
        console.warn('Unable to persist pending user in sessionStorage', storageError);
      }
      setPendingUser(location.state.pendingUser);
    }
  }, [location.state]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = Array(6)
      .fill('')
      .map((_, idx) => pasted[idx] || '');
    setOtp(newOtp);
    document.getElementById(`otp-${Math.min(pasted.length, 5)}`)?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setFormError('Please enter all 6 digits');
      return;
    }

    if (!pendingUser?.name || !pendingUser?.email || !pendingUser?.password) {
      setFormError('Registration data missing. Please restart the sign-up process.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}${VERIFY_ENDPOINT}`,
        {
          name: pendingUser.name,
          email: pendingUser.email,
          password: pendingUser.password,
          otp: enteredOtp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      const message = response?.data?.message || 'User registered successfully';
      notifySuccess(message);
      if (response?.data?.user) {
        persistAuthUser(response.data.user);
      }

      try {
        sessionStorage.removeItem('pendingUser');
      } catch (storageError) {
        console.warn('Unable to clear pending user from sessionStorage', storageError);
      }

      setTimeout(() => {
        navigate('/dash');
      }, 1000);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const fallbackMessage = error.message === 'Network Error' ? 'Unable to reach server. Please try again.' : 'Failed to verify OTP. Please try again.';
      notifyError(serverMessage || fallbackMessage);
      console.error('Verify OTP API error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        {/* ✅ Left Image Panel */}
        <div className="left-panel" />

        {/* ✅ Right OTP Panel */}
        <div className="right-panel">
          <div className="otp-box">
            <h2>Verify Code</h2>
            <p>Enter the 6-digit code sent to your email</p>

            <form onSubmit={handleSubmit}>
              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              <button type="submit" disabled={isSubmitting || !pendingUser}>
                {isSubmitting ? 'Verifying...' : 'Verify'}
              </button>

              {!pendingUser && (
                <p className="form-error" role="alert">
                  We are missing your registration details. Please go back and sign up again.
                </p>
              )}

              <p className="resend-text">
                Didn't receive code? <span>Resend</span>
              </p>
  
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifyCode;
