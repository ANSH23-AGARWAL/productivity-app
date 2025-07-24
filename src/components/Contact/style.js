import styled from 'styled-components';

const Wrapper = styled.div`
  .contact-bg {
    background: #233a63;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
  }
  .contact-container {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    padding: 64px 24px 48px 24px;
  }
  .contact-heading-gradient {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(90deg, #6bb3a6 10%, #fff 50%, #f7c873 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 48px;
    text-align: left;
    letter-spacing: 1.5px;
  }
  .contact-content {
    display: flex;
    gap: 48px;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .contact-info {
    flex: 1 1 320px;
    min-width: 280px;
    max-width: 350px;
  }
  .section-heading {
    color: #6bb3a6;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 18px;
    text-align: left;
  }
  .contact-info p {
    color: #f7f8fa;
    font-size: 1.15rem;
    margin-bottom: 28px;
    line-height: 1.7;
  }
  .contact-detail {
    color: #f7f8fa;
    font-size: 1.1rem;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .contact-icon {
    font-size: 1.2em;
    margin-right: 8px;
  }
  .contact-socials {
    display: flex;
    gap: 18px;
    margin-top: 18px;
  }
  .social-icon {
    color: #f7f8fa;
    font-size: 1.5rem;
    background: #1a3557;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.18s, color 0.18s, transform 0.15s;
  }
  .social-icon:hover {
    background: #6bb3a6;
    color: #fff;
    transform: scale(1.1);
  }
  .contact-form {
    flex: 1 1 340px;
    min-width: 300px;
    max-width: 400px;
    background: transparent;
    border: 1.5px solid #3a4c6e;
    border-radius: 18px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #f7f8fa;
    box-shadow: 0 2px 16px #1a355733;
  }
  .contact-form label {
    font-size: 1.1rem;
    color: #f7f8fa;
    margin-bottom: 4px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .contact-form input,
  .contact-form textarea {
    background: transparent;
    border: 1.5px solid #3a4c6e;
    border-radius: 8px;
    padding: 10px 12px;
    color: #f7f8fa;
    font-size: 1rem;
    margin-top: 4px;
    outline: none;
    transition: border 0.18s;
  }
  .contact-form input:focus,
  .contact-form textarea:focus {
    border: 1.5px solid #6bb3a6;
  }
  .contact-form button {
    margin-top: 10px;
    background: #6bb3a6;
    color: #233a63;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 12px 0;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
  }
  .contact-form button:hover {
    background: #f7c873;
    color: #233a63;
  }
  @media (max-width: 900px) {
    .contact-content {
      flex-direction: column;
      gap: 32px;
    }
    .contact-form {
      padding: 20px 10px;
    }
    .contact-heading-gradient {
      font-size: 2.1rem;
    }
    .section-heading {
      font-size: 1.2rem;
    }
  }
`;

export default Wrapper; 