import styled from 'styled-components';

const Wrapper = styled.div`
  /* 🔹 Main background for contact page */
  .contact-bg {
    background: linear-gradient(145deg, #0A0F1F, #111625);
    min-height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0;
  }

  /* 🔹 Container for all contact content */
  .contact-container {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    padding: 64px 24px 48px 24px;
    position: relative; /* For back button positioning if needed */
  }

  /* 🔹 Page heading gradient text */
  .contact-heading-gradient {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(90deg, #4452FE, #2FAFCC, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 48px;
    text-align: left;
    letter-spacing: 1.5px;
    filter: drop-shadow(0 2px 10px rgba(68, 82, 254, 0.3));
  }

  /* 🔹 Layout for left (info) and right (form) sections */
  .contact-content {
    display: flex;
    gap: 48px;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  /* 🔹 Left side - contact info */
  .contact-info {
    flex: 1 1 320px;
    min-width: 280px;
    max-width: 350px;
  }

  .section-heading {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 18px;
    text-align: left;
  }

  .contact-info p {
    color: #94a3b8;
    font-size: 1.15rem;
    margin-bottom: 28px;
    line-height: 1.7;
  }

  .contact-detail {
    color: #cbd5e1;
    font-size: 1.1rem;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .contact-icon {
    font-size: 1.2em;
    margin-right: 8px;
    filter: drop-shadow(0 0 5px rgba(68, 82, 254, 0.4));
  }

  /* 🔹 Social icons under contact info */
  .contact-socials {
    display: flex;
    gap: 18px;
    margin-top: 18px;
  }

  .social-icon {
    color: #2FAFCC;
    font-size: 1.5rem;
    background: rgba(10, 15, 31, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .social-icon:hover {
    background: #4452FE;
    color: #fff;
    border-color: #4452FE;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 12px rgba(68, 82, 254, 0.4);
  }

  /* 🔹 Contact form (right side) */
  .contact-form {
    flex: 1 1 340px;
    min-width: 300px;
    max-width: 400px;
    background: rgba(10, 15, 31, 0.6);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 18px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #f7f8fa;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .contact-form:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: rgba(68, 82, 254, 0.3);
  }

  /* 🔹 Form labels and inputs */
  .contact-form label {
    font-size: 1.1rem;
    color: #cbd5e1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .contact-form input,
  .contact-form textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 8px;
    padding: 12px 14px;
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
  }

  .contact-form input::placeholder,
  .contact-form textarea::placeholder {
    color: #64748b;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: #4452FE;
    box-shadow: 0 0 0 3px rgba(68, 82, 254, 0.2);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.08);
  }

  /* 🔹 Submit button with minimal header-like hover effect */
  .contact-form button {
    margin-top: 10px;
    background: linear-gradient(90deg, #4452FE, #3a45c9);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 14px 0;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(68, 82, 254, 0.3);
  }

  .contact-form button:hover {
    background: linear-gradient(90deg, #3a45c9, #4452FE);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(68, 82, 254, 0.5);
  }

  .contact-form button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(68, 82, 254, 0.2);
  }

  /* 🔹 Back Button */
  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);
    z-index: 10;
  }

  .back-btn:hover {
    background: rgba(68, 82, 254, 0.8);
    transform: scale(1.05);
  }

  /* 🔹 Responsive styles */
  @media (max-width: 900px) {
    .contact-content {
      flex-direction: column;
      gap: 32px;
      align-items: center;
    }
    .contact-form {
      padding: 24px 16px;
      width: 100%;
    }
    .contact-heading-gradient {
      font-size: 2.1rem;
      text-align: center;
    }
    .section-heading {
      font-size: 1.2rem;
      text-align: center;
    }
    .contact-info {
      text-align: center;
    }
    .contact-detail {
      justify-content: center;
    }
    .contact-socials {
      justify-content: center;
    }
    .back-btn {
        top: 10px;
        left: 10px;
        padding: 8px 12px;
        font-size: 0.9rem;
    }
  }
`;

export default Wrapper;
