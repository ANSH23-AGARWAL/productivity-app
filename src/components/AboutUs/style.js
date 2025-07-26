import styled from 'styled-components';

const Wrapper = styled.div`

  /* ✅ Background with soft gradient */
   background: linear-gradient(145deg, #0a1e46, #132f62, #1d427a);
  min-height: 100vh;
  width: 100vw;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #f8f9fa;
  display: flex;
  justify-content: center;
  padding: 60px 20px;

  /* ✅ Glass Effect Main Container */
  .about-container {
    max-width: 1100px;
    width: 100%;
    padding: 60px 40px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 20px;
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
    backdrop-filter: blur(12px);
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
    background: linear-gradient(90deg, #00ffd0, #00bfff, #6bb3a6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 32px;
    text-align: center;
    letter-spacing: 1px;
  }

  /* ✅ Section Headings */
  .section-heading {
    color: #6bb3a6;
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
    background: linear-gradient(90deg, #00ffd0, #6bb3a6);
  }

  /* ✅ Paragraphs */
  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #e0e6ed;
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
    transition: transform 0.25s ease;
  }

  .why-list li:hover {
    transform: translateX(5px);
  }

  .checkmark-box {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: #00ffd0;
    color: #0d1b2a;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    margin-right: 10px;
    font-size: 1rem;
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
    background: rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 24px;
    min-width: 200px;
    max-width: 240px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .core-value:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0,255,208,0.2);
  }

  .core-icon {
    font-size: 2.2rem;
    color: #00ffd0;
    margin-bottom: 10px;
  }

  .core-label {
    font-size: 1.1rem;
    font-weight: 700;
    color: #6bb3a6;
    margin-bottom: 6px;
  }

  .core-desc {
    font-size: 0.95rem;
    color: #dfe6ed;
  }

 /* ✅ Team Section */
.team-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px; /* thoda zyada spacing for clean look */
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
  box-shadow: 0 6px 18px rgba(0, 255, 208, 0.15);
}

/* ✅ Avatar */
.avatar-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 5px solid #00ffd0;
  object-fit: cover;
  margin-bottom: 14px;
  box-shadow: 0 6px 20px rgba(0, 255, 208, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover .avatar-photo {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 255, 208, 0.3);
}

/* ✅ Jitendra Yadav ki photo ke liye custom positioning */
.team-member.jitendra .avatar-photo {
  object-position: center 30%; /* Face ko niche shift karega */
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
  color: #6bb3a6;
  text-align: center;
}
  /* ✅ LinkedIn Button */
.linkedin-link {
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 30px;
  background: rgba(10, 102, 194, 0.15);
  border: 2px solid #0A66C2;
  color: #0A66C2;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(10, 102, 194, 0.2);
  backdrop-filter: blur(6px);
}

/* ✅ Icon ke liye thoda hover animation */
.linkedin-link svg {
  transition: transform 0.3s ease;
}

/* ✅ Hover Effect */
.linkedin-link:hover {
  background: #0A66C2;
  color: #fff;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(10, 102, 194, 0.4);
}

.linkedin-link:hover svg {
  transform: rotate(8deg) scale(1.1);
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
    .avatar-photo {
      width: 130px;
      height: 130px;
    }
  }
`;

export default Wrapper;
