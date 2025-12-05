import styled from 'styled-components';

const Wrapper = styled.div`
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .left-panel {
    flex: 1;
    background: url('/ebf92a52.png') no-repeat center center/cover;
  }

  .right-panel {
    flex: 1;
    background: #0A0F1F;
    background: radial-gradient(circle at 90% 10%, #151b30 0%, #0A0F1F 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  /* ✅ Back Button */
  .back-btn {
    position: absolute;
    top: 40px;
    left: 40px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .back-btn:hover {
    color: #4452FE;
    transform: translateX(-5px);
  }

  /* ✅ Glassmorphism Box */
  .signin-box {
    width: 400px;
    padding: 32px 28px;
    background: rgba(10, 15, 31, 0.6);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(68, 82, 254, 0.3);
    border-radius: 18px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #f7f8fa;
    transform-style: preserve-3d;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .signin-box:hover {
    transform: perspective(1000px) translateZ(8px);
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
  }

  /* ✅ Animated Heading like Welcome */
  .signin-box h2 {
    margin-bottom: 24px;
    font-size: 2.4rem;
    font-weight: 900;
    background: linear-gradient(
      270deg,
      #4452FE,
      #2FAFCC,
      #9B5CFF,
      #4452FE
    );
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 6s linear infinite;
    letter-spacing: 1px;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ✅ Social Buttons */
  .social-login {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;
}

/* ✅ Social Button Base Style */
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  max-width: 320px;
  height: 48px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05); /* 🔥 Glass effect */
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ Social Button Icon Fix */
.social-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* ✅ Hover Effect same as Sign In Button */
.social-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #2FAFCC;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.social-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.divider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 0.9rem;
  margin: 20px 0;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  margin: 0 10px;
}


  /* ✅ Form */
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 10px;
  }

  input {
    padding: 12px;
    border-radius: 8px;
    border: 1.5px solid rgba(68, 82, 254, 0.3);
    background: rgba(10, 15, 31, 0.3);
    color: #f7f8fa;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(107, 179, 166, 0.1);
  }

  input:focus {
    border: 1.5px solid #4452FE;
    box-shadow:
      0 0 0 3px rgba(68, 82, 254, 0.2),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transform: translateY(-1px);
  }

  /* ✅ Sign In Button with Welcome hover effect */
  button[type='submit'] {
    margin-top: 10px;
    background: #4452FE;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 14px 0;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  button[type='submit']:hover {
    background: #2FAFCC;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  button[type='submit']:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  /* ✅ Footer */
  .footer-text {
    margin-top: 14px;
    font-size: 0.9rem;
    color: #ddd;
  }

  .footer-text a {
    color: #4452FE;
    text-decoration: none;
    font-weight: 600;
  }

  .footer-text a:hover {
    text-decoration: underline;
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
    .signin-box {
      width: 90%;
      padding: 24px 20px;
    }
  }
`;

export default Wrapper;
