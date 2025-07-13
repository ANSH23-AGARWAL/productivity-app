import styled from 'styled-components';

const Wrapper = styled.div`
  .background {
    height: 100vh;
    width: 100vw;
    background: url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1350&q=80')
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

  .otp-container {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 40px 30px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    width: 400px;
    text-align: center;
    color: #fff;
    font-family: 'Segoe UI', sans-serif;
  }

  .otp-container h2 {
    font-size: 26px;
    margin-bottom: 10px;
  }

  .otp-container p {
    font-size: 14px;
    margin-bottom: 24px;
    color: #ddd;
  }

  .otp-inputs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .otp-inputs input {
    width: 48px;
    height: 48px;
    font-size: 20px;
    text-align: center;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    outline: none;
    transition: box-shadow 0.3s ease;
  }

  .otp-inputs input:focus {
    box-shadow: 0 0 0 2px #007bff;
  }

  button {
    padding: 12px;
    width: 100%;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .resend-text {
    margin-top: 16px;
    font-size: 13px;
    color: #ccc;
  }

  .resend-text span {
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default Wrapper;
