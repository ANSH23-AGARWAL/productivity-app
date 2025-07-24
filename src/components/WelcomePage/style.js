import styled from 'styled-components';

const Wrapper = styled.div`

 height: 100vh;
  overflow: hidden;


  .welcome-container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .welcome-left {
    flex: 1;
    background: #f5f4f1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    min-width: 350px;
  }
  .welcome-left.logo-only {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f4f1;
    min-width: 0;
    min-height: 100vh;
    width: 50vw;
    height: 100vh;
    padding: 0;
  }
  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  .logo-label {
    margin-top: 10px;
    font-size: 1rem;
    color: #1a3557;
    font-family: 'Segoe UI', sans-serif;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
   .logo {
   width: 180px;
   height: 180px;
   margin-bottom: 0;
   border-radius: 16px;
   box-shadow: 0 4px 24px rgba(0,0,0,0.08);
   background: #fff;
   object-fit: contain;
  }
   .logo-only .logo {
   width: 100%;
   height: 100vh;
   max-width: 100%;
   max-height: 100vh;
   min-width: 0;
   min-height: 0;
   object-fit: cover;
   border-radius: 0;
   box-shadow: none;
   background: #fff;
   margin: 0;
   display: block;
  }


  .welcome-left h1 {
    font-size: 2.8rem;
    color: #1a3557;
    margin-bottom: 10px;
    font-family: 'Segoe UI', sans-serif;
    font-weight: 700;
  }
  .tagline {
    font-size: 1.3rem;
    color: #6bb3a6;
    font-style: italic;
    font-family: 'Georgia', serif;
    margin-bottom: 0;
  }
  .welcome-right {
    flex: 1;
    background: #233a63;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    width: 50vw;
    position: relative;
    padding: 0;
  }
  .header-bar {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
    padding: 32px 0 0 48px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    background: #1a3557;
    min-height: 70px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 32px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .nav-link {
    color: #fff;
    cursor: pointer;
    transition: color 0.2s;
    font-family: 'Segoe UI', sans-serif;
    letter-spacing: 0.5px;
  }
  .nav-link:hover {
    color: #6bb3a6;
  }
  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: calc(100vh - 70px);
    padding: 60px 80px;
    width: 100%;
    color: #fff;
  }
  .welcome-content.centered {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 70px);
    width: 100%;
    text-align: center;
    padding: 0 20px;
  }
  .welcome-content.left-align {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: calc(100vh - 70px);
    width: 100%;
    text-align: left;
    padding: 60px 80px 0 80px;
    color: #fff;
  }
  .welcome-heading-gradient {
    font-size: 3.2rem;
    font-weight: 800;
    background: linear-gradient(90deg, #6bb3a6 10%, #fff 50%, #f7c873 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    margin-bottom: 28px;
    letter-spacing: 1px;
  }
  .welcome-heading-big {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 32px;
    margin-top: 0;
    background: linear-gradient(90deg, #6bb3a6 10%, #fff 50%, #f7c873 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    letter-spacing: 1.5px;
  }
  .welcome-content h2 {
    font-size: 2.2rem;
    color: #fff;
    margin-bottom: 18px;
    font-weight: 600;
  }
  .intro {
    font-size: 1.1rem;
    color: #e0e6ef;
    margin-bottom: 32px;
    max-width: 480px;
    line-height: 1.6;
  }
  .large-intro {
    font-size: 1.35rem;
    color: #e0e6ef;
    margin-bottom: 40px;
    max-width: 600px;
    line-height: 1.7;
  }
  .large-intro.left-message {
    font-size: 1.5rem;
    color: #e0e6ef;
    margin-bottom: 48px;
    max-width: 700px;
    line-height: 1.7;
    text-align: left;
  }
  .contact-info {
    font-size: 1rem;
    color: #fff;
    margin-bottom: 24px;
    font-family: 'Segoe UI', sans-serif;
  }
  .contact-info div {
    margin-bottom: 4px;
  }
  .auth-buttons {
    display: flex;
    gap: 18px;
    margin-top: 18px;
  }
  .auth-btn {
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    font-family: 'Segoe UI', sans-serif;
  }
  .auth-btn.signin {
    background: #fff;
    color: #233a63;
  }
  .auth-btn.signup {
    background: #6bb3a6;
    color: #fff;
  }
  .auth-btn:hover {
    background: #1a3557;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  .auth-btn.dark-btn {
    background: #1a3557;
    color: #fff;
    border: none;
    outline: none;
    padding: 14px 38px;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  }
  .auth-btn.dark-btn:hover {
    background: #6bb3a6;
    color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  @media (max-width: 900px) {
    .welcome-container {
      flex-direction: column;
      min-height: unset;
    }
    .welcome-left, .welcome-right {
      min-width: unset;
      width: 100%;
      padding: 40px 20px;
      box-shadow: none;
    }
    .welcome-left.logo-only, .welcome-right {
      width: 100vw;
      min-height: 40vh;
      flex: unset;
    }
    .welcome-right {
      align-items: center;
      padding: 0;
      min-height: unset;
    }
    .header-bar {
      padding: 24px 10px 0 10px;
      font-size: 1rem;
      gap: 14px;
      justify-content: flex-start;
    }
    .welcome-content {
      align-items: center;
      padding: 40px 20px;
      height: auto;
    }
    .welcome-content.centered {
      min-height: auto;
      padding: 40px 10px;
    }
    .welcome-content.left-align {
      padding: 32px 16px 0 16px;
      min-height: unset;
    }
    .welcome-heading-gradient {
      font-size: 2.1rem;
    }
    .welcome-heading-big {
      font-size: 2.2rem;
    }
    .large-intro {
      font-size: 1.05rem;
      max-width: 100%;
    }
    .large-intro.left-message {
      font-size: 1.05rem;
      max-width: 100%;
    }
    .logo-only .logo {
      width: 80vw;
      max-width: 90vw;
      max-height: 40vh;
    }
  }
`;

export default Wrapper; 