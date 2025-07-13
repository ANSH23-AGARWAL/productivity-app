import React, { useState } from 'react';
import Wrapper from './style';

const VerifyCode = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      alert(`OTP entered: ${enteredOtp}`);
    } else {
      alert('Please enter all 6 digits');
    }
  };

  return (
    <Wrapper>
      <div className="background">
        <div className="overlay">
          <div className="otp-container">
            <h2>Verify Code</h2>
            <p>Enter the 6-digit code sent to your email</p>
            <form onSubmit={handleSubmit}>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
              <button type="submit">Verify</button>
              <p className="resend-text">Didn't receive code? <span>Resend</span></p>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifyCode;
