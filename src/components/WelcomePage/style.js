import styled from 'styled-components';

const Wrapper = styled.div`
 min-height: 100vh;
 width: 100vw;
  overflow: hidden; /* Ensure no scroll */
   
  .welcome-container {
      display: flex;
    height: 100vh;
    width: 100vw;
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
    background: linear-gradient(135deg, #0A0F1F 0%, #111625 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    width: 50vw;
    position: relative;
    padding: 0;
    /* no overlay */
  }

  
// .header-bar {
//   width: 80%;
//   margin: 24px auto 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 40px; /* spacing between items */
//   padding: 20px 32px;
//   font-size: 1.2rem;
//   font-weight: 700;
//   color: #fff;
//   background: rgba(21, 48, 91, 0.85);
//   backdrop-filter: blur(16px);
//   border-radius: 24px;
//   box-shadow: 0 8px 32px rgba(0,0,0,0.2);
// }

// .header-bar .nav-link,
// .header-bar .auth-btn {
//   white-space: nowrap;
//   padding: 12px 32px;
//   font-size: 1.1rem;
//   font-weight: 600;
//   color: #fff;
//   background: transparent;
//   border: none;
//   text-decoration: none;
//   transition: 0.3s ease;
//   border-radius: 14px;
//   cursor: pointer;
// }

// .header-auth-buttons {
//   display: flex;
//   gap: 24px; /* Log In and Sign Up ke beech gap */
// }

// .header-bar .nav-link:hover,
// .header-bar .auth-btn:hover {
//   background: linear-gradient(90deg, #00ffd0 0%, #00bfff 30%, #a259e6 60%, #ffe066 85%, #ff7e5f 100%);
//   box-shadow: 0 4px 16px rgba(0, 255, 208, 0.3);
//   transform: scale(1.05);
//   border-radius: 18px;
// }

.header-bar {
  width: 85%;
  max-width: 600px;
  margin: 32px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px; /* spacing between items */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: rgba(10, 15, 31, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.header-bar:hover {
     background: rgba(10, 15, 31, 0.8);
     box-shadow: 0 15px 40px rgba(0,0,0,0.3);
     border-color: rgba(68, 82, 254, 0.2);
}

.header-bar .nav-link,
.header-bar .auth-btn {
  white-space: nowrap;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #cbd5e1;
  background: transparent;
  border: none;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 20px;
  cursor: pointer;
}

.header-auth-buttons {
  display: flex;
  gap: 16px; /* Reduced gap */
}

/* ✅ Minimal, clean hover effect */
.header-bar .nav-link:hover,
.header-bar .auth-btn:hover {
  background: rgba(68, 82, 254, 0.1);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: none;
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
    padding: 120px 80px 0 80px;
    color: #fff;
    /* no overlay */
  }

  /* 🔹 Big Gradient Heading */
 .welcome-heading-big {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(90deg, #4452FE, #2FAFCC, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -1px;
  margin-bottom: 24px;
  text-align: left;
  filter: drop-shadow(0 0 20px rgba(68, 82, 254, 0.2));
  line-height: 1.1;
}

  @keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
    color: #f5f8ff;
    margin-bottom: 48px;
    max-width: 700px;
    line-height: 2.1;
    text-align: left;
    letter-spacing: 0.02em;
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
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;

  .hero-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -1;
    background: radial-gradient(circle at 60% 40%, #233a63 60%, #6a4bc7 100%);
    pointer-events: none;
    overflow: hidden;
  }

  
  /* Intro Text */
  .large-intro.left-message {
    font-size: 1.2rem;
    color: #94a3b8; /* Slate gray for better readability */
    margin-bottom: 48px;
    max-width: 600px;
    line-height: 1.8;
    text-align: left;
    letter-spacing: 0.01em;
    font-weight: 400;
  }


  .header-bar {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  }
  .welcome-content.left-align {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  }

  @media (max-width: 900px) {
  .welcome-heading-big {
    font-size: 2.5rem;  /* ✅ Mobile aur tablet ke liye */
  }
}

`;

export default Wrapper;