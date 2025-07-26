import styled from 'styled-components';

const Wrapper = styled.div`
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .left-panel {
    flex: 1;
    background: url('/BoardWiseApp.png') no-repeat center center/cover;
  }

  .right-panel {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .signin-box {
    width: 400px;
    padding: 36px 28px;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    text-align: center;
    color: #000;
    font-family: 'Segoe UI', sans-serif;
  }

  .signin-box h2 {
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
  }

  .social-login {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 14px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 40px;
    max-width: 320px;
    margin: 0 auto;
  }

  .social-btn img {
    width: 18px;
    height: 18px;
  }

  .social-btn.google {
    background-color: #ffffff;
    color: #444;
  }

  .social-btn.google:hover {
    background-color: #f1f1f1;
  }

  .social-btn.apple {
    background-color: #000000;
    color: #ffffff;
  }

  .social-btn.apple:hover {
    background-color: #1a1a1a;
  }

  .divider {
    color: #555;
    margin: 20px 0;
    font-size: 13px;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    height: 1px;
    width: 40%;
    background-color: #999;
    position: absolute;
    top: 50%;
  }

  .divider::before {
    left: 0;
  }

  .divider::after {
    right: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  input {
    padding: 10px 14px;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
  }

  input:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.3);
  }

  button[type='submit'] {
    padding: 10px;
    font-size: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button[type='submit']:hover {
    background-color: #0056b3;
  }

  .footer-text {
    margin-top: 16px;
    font-size: 13px;
    color: #555;
  }

  .footer-text a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
  }

  .footer-text a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .left-panel {
      display: none;
    }

    .right-panel {
      width: 100%;
    }

    .signin-box {
      width: 90%;
    }
  }
`;

export default Wrapper;