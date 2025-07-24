import styled from 'styled-components';

const Wrapper = styled.div`
  .background {
    height: 100vh;
    width: 100vw;
    background: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')
      no-repeat center center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(10, 10, 10, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .signup-box {
    width: 420px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
  }

  .signup-box h2 {
    margin-bottom: 24px;
    font-size: 28px;
    font-weight: 600;
  }

  .social-login {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .google-btn,
  .apple-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 20px;
    font-size: 15px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .google-btn {
    background-color: #ffffff;
    color: #333;
  }

  .apple-btn {
    background-color: #000000;
    color: #ffffff;
  }

  .google-btn:hover {
    background-color: #f1f1f1;
  }

  .apple-btn:hover {
    background-color: #1a1a1a;
  }

  .google-btn img,
  .apple-btn img {
    width: 28px;
    height: 28px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    padding: 2px;
    margin-right: 10px;
  }
  .google-btn span,
  .apple-btn span {
    flex: 1;
    text-align: left;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
  .google-btn,
  .apple-btn {
    min-height: 48px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    transition: box-shadow 0.2s;
  }
  .google-btn:hover,
  .apple-btn:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .divider {
    color: #ccc;
    margin: 20px 0;
    font-size: 14px;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    height: 1px;
    width: 40%;
    background-color: #ccc;
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
    gap: 18px;
  }

  input {
    padding: 12px 16px;
    font-size: 15px;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
  }

  input:focus {
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.4);
  }

  button[type='submit'] {
    padding: 12px;
    font-size: 16px;
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
    margin-top: 18px;
    font-size: 14px;
    color: #ddd;
  }

  .footer-text span {
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default Wrapper;
