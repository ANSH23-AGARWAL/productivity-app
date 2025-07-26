import styled from 'styled-components';

const Wrapper = styled.div`
  /* 🔹 Main background for contact page */
  .contact-bg {
    background: linear-gradient(145deg, #0a1e46, #132f62, #1d427a);
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
  }

  /* 🔹 Page heading gradient text */
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

  /* 🔹 Social icons under contact info */
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
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .social-icon:hover {
    background: #6bb3a6;
    color: #fff;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  /* 🔹 Contact form (right side) */
  .contact-form {
    flex: 1 1 340px;
    min-width: 300px;
    max-width: 400px;
    background: rgba(26, 53, 87, 0.4);
    backdrop-filter: blur(10px);
    border: 1.5px solid rgba(58, 76, 110, 0.6);
    border-radius: 18px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #f7f8fa;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .contact-form:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.2);
  }

  /* 🔹 Form labels and inputs */
  .contact-form label {
    font-size: 1.1rem;
    color: #f7f8fa;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .contact-form input,
  .contact-form textarea {
    background: rgba(26, 53, 87, 0.3);
    border: 1.5px solid rgba(58, 76, 110, 0.6);
    border-radius: 8px;
    padding: 12px 14px;
    color: #f7f8fa;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border: 1.5px solid #6bb3a6;
    box-shadow: 0 0 0 3px rgba(107, 179, 166, 0.2);
    transform: translateY(-1px);
  }

  /* 🔹 Submit button with minimal header-like hover effect */
  .contact-form button {
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    padding: 14px 0;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .contact-form button:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #00ffd0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .contact-form button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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
  }
`;

export default Wrapper;
