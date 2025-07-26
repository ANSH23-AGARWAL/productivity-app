import styled from 'styled-components';

const Wrapper = styled.div`
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  /* ✅ Left Panel with Background */
  .left-panel {
    flex: 1;
    background: url('/ebf92a52.png') no-repeat center center/cover;
  }

  /* ✅ Right Panel Center Content */
  .right-panel {
    flex: 1;
    background: linear-gradient(145deg, #0a1e46, #132f62, #1d427a);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  /* ✅ OTP Box Glassmorphism */
  .otp-box {
    width: 400px;
    padding: 32px 28px;
    background: rgba(26, 53, 87, 0.4);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(58, 76, 110, 0.6);
    border-radius: 18px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #f7f8fa;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .otp-box:hover {
    transform: perspective(1000px) translateZ(8px);
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.2);
  }

  /* ✅ Animated Heading */
  .otp-box h2 {
    margin-bottom: 12px;
    font-size: 2rem;
    font-weight: 900;
    background: linear-gradient(
      270deg,
      #ff7e5f,
      #ffe066,
      #00ffd0,
      #00bfff,
      #a259e6,
      #ff7e5f
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 6s linear infinite;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .otp-box p {
    font-size: 0.9rem;
    color: #ddd;
    margin-bottom: 20px;
  }

  /* ✅ OTP Inputs */
  .otp-inputs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .otp-inputs input {
    width: 52px;
    height: 52px;
    font-size: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1.5px solid rgba(58, 76, 110, 0.6);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    transition: all 0.3s ease;
  }

  .otp-inputs input:focus {
    border: 1.5px solid #6bb3a6;
    box-shadow: 0 0 0 3px rgba(107, 179, 166, 0.2);
    outline: none;
    transform: translateY(-2px);
  }

  /* ✅ Verify Button same hover as Sign In */
  button {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #00ffd0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .resend-text {
    margin-top: 16px;
    font-size: 0.9rem;
    color: #ccc;
  }

  .resend-text span {
    color: #6bb3a6;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }

  .resend-text span:hover {
    color: #00ffd0;
  }

  /* ✅ Responsive */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    .left-panel {
      display: none;
    }
    .right-panel {
      width: 100%;
      padding: 40px 10px;
    }
    .otp-box {
      width: 90%;
    }
  }
`;

export default Wrapper;
