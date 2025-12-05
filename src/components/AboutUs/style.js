import styled from 'styled-components';

const Wrapper = styled.div`

  /* ✅ Background with soft gradient matching BoardPage */
   background: linear-gradient(145deg, #0A0F1F, #111625);
  min-height: 100vh;
  width: 100vw;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  position: relative; /* For back button positioning */

  /* ✅ Back Button */
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

  /* ✅ Glass Effect Main Container */
  .about-container {
    max-width: 1100px;
    width: 100%;
    padding: 60px 40px;
    background: rgba(10, 15, 31, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 20px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    backdrop-filter: blur(16px);
    animation: fadeIn 0.8s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ✅ Main Heading */
  .about-heading-gradient {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(90deg, #4452FE, #2FAFCC, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 32px;
    text-align: center;
    letter-spacing: 1px;
    filter: drop-shadow(0 2px 10px rgba(68, 82, 254, 0.3));
  }

  /* ✅ Section Headings */
  .section-heading {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 40px 0 12px 0;
    text-align: left;
    position: relative;
  }

  /* ✅ Small underline accent */
  .section-heading::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(90deg, #4452FE, #2FAFCC);
    box-shadow: 0 0 10px rgba(68, 82, 254, 0.5);
  }

  /* ✅ Paragraphs */
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #94a3b8;
    margin-bottom: 18px;
  }

  /* ✅ Bullet List */
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .why-list li {
    margin-bottom: 12px;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    color: #cbd5e1;
    transition: transform 0.25s ease;
  }

  .why-list li:hover {
    transform: translateX(5px);
    color: #fff;
  }

  .checkmark-box {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: rgba(68, 82, 254, 0.2);
    border: 1px solid #4452FE;
    color: #4452FE;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    margin-right: 10px;
    font-size: 0.9rem;
  }

  /* ✅ Core Values Cards */
  .core-values-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
  }

  .core-value {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 16px;
    padding: 24px;
    min-width: 200px;
    max-width: 240px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
  }

  .core-value:hover {
    transform: translateY(-6px);
    border-color: #4452FE;
    box-shadow: 0 8px 24px rgba(68, 82, 254, 0.15);
  }

  .core-icon {
    font-size: 2.2rem;
    color: #2FAFCC;
    margin-bottom: 10px;
    filter: drop-shadow(0 0 5px rgba(47, 175, 204, 0.4));
  }

  .core-label {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
  }

  .core-desc {
    font-size: 0.95rem;
    color: #94a3b8;
  }

 /* ✅ Team Section */
.team-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

/* ✅ Individual Member */
.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  border-radius: 12px;
}

.team-member:hover {
  transform: translateY(-6px);
}

/* ✅ Avatar */
.avatar-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 4px solid #4452FE; /* Primary Blue Border */
  object-fit: cover;
  margin-bottom: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
}


.team-member:hover .avatar-photo {
  transform: scale(1.05);
  border-color: #2FAFCC;
  box-shadow: 0 10px 30px rgba(68, 82, 254, 0.3);
}

/* ✅ Jitendra Yadav ki photo ke liye custom positioning */
.team-member.jitendra .avatar-photo {
  object-position: center 30%; /* Face ko niche shift karega */
}

.avatar-placeholder {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: #4452FE;
    border: 4px solid #4452FE;
    margin-bottom: 14px;
}

/* ✅ Name & Role */
.member-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
  text-align: center;
}

.member-role {
  font-size: 1.05rem;
  color: #2FAFCC; /* Cyan accent for role */
  text-align: center;
}

/* ✅ LinkedIn Button - Keeping brand color but refined for dark theme */
.linkedin-link {
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 30px;
  background: rgba(47, 175, 204, 0.1); 
  border: 1px solid #2FAFCC;
  color: #2FAFCC;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
}

.linkedin-link svg path {
    fill: #2FAFCC; /* Match text */
}
.linkedin-link svg rect {
    fill: transparent; /* Remove rect fill */
}

/* ✅ Hover Effect */
.linkedin-link:hover {
  background: #2FAFCC;
  color: #0A0F1F;
  box-shadow: 0 0 15px rgba(47, 175, 204, 0.4);
  transform: translateY(-2px);
}

.linkedin-link:hover svg path {
    fill: #0A0F1F;
}

  /* ✅ Mobile Responsive */
  @media (max-width: 900px) {
    .about-container {
      padding: 40px 20px;
    }
    .about-heading-gradient {
      font-size: 2.2rem;
    }
    .core-values-list {
      justify-content: center;
    }
    .avatar-photo, .avatar-placeholder {
      width: 150px;
      height: 150px;
    }
  }
`;

export default Wrapper;
