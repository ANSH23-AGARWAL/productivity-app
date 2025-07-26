import styled from 'styled-components';

const Wrapper = styled.div`
  .container {
    display: flex;
    height: 100vh;
    width: 100%;
  }

  .left-panel {
    flex: 1;
    background: url('/ebf92a52.png') no-repeat center center;
    background-size: cover;
  }

  .right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
  }

  .signup-box {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .signup-box h2 {
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
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
    gap: 10px;
    justify-content: center;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
    background: #fff;
  }

  .social-btn img {
    width: 20px;
    height: 20px;
  }

  .social-btn.google:hover {
    background: #f0f0f0;
  }

  .social-btn.apple:hover {
    background: #e8e8e8;
  }

  .divider {
    margin: 15px 0;
    font-size: 14px;
    color: #777;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    height: 1px;
    width: 40%;
    background: #ccc;
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
    gap: 12px;
  }

  form input {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
  }

  form button {
    margin-top: 10px;
    padding: 10px;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  form button:hover {
    background: #4338ca;
  }

  .footer-text {
    margin-top: 16px;
    font-size: 14px;
  }

  .footer-text a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .left-panel {
      display: none;
    }

    .right-panel {
      flex: none;
      height: 100vh;
    }
  }
`;

export default Wrapper;
