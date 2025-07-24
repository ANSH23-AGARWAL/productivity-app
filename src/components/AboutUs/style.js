import styled from 'styled-components';

const Wrapper = styled.div`
  background: #233a63;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Segoe UI', sans-serif;
  .about-bg {
    background: none;
    min-height: 100vh;
    width: 100vw;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .about-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 64px 24px 48px 24px;
    background: none;
    border-radius: 0;
    box-shadow: none;
  }
  .about-heading-gradient {
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
  .section-heading {
    color: #6bb3a6;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 18px;
    margin-top: 48px;
    text-align: left;
    background: none;
    padding: 0;
    border-radius: 0;
  }
  .about-section {
    margin: 0 0 36px 0;
    padding-bottom: 0;
    border-bottom: none;
    max-width: 900px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 18px;
    color: #6bb3a6;
    text-align: left;
  }
  p, ul, li, .member-name, .member-role, .core-desc {
    color: #f7f8fa;
    text-align: left;
    font-size: 1.15rem;
    line-height: 1.7;
  }
  ul {
    margin: 0 0 0 0;
    padding: 0;
    font-size: 1.15rem;
    line-height: 1.7;
    list-style: none;
  }
  .why-list li {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    font-size: 1.15rem;
  }
  .checkmark-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: #6bb3a6;
    color: #fff;
    border-radius: 6px;
    font-size: 1.2rem;
    margin-right: 14px;
    box-shadow: 0 2px 8px #6bb3a633;
  }
  .core-values-list {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 18px;
    justify-content: flex-start;
  }
  .core-value {
    background: #1a3557;
    border-radius: 16px;
    padding: 18px 24px;
    min-width: 180px;
    max-width: 220px;
    box-shadow: 0 2px 8px rgba(26,53,87,0.07);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .core-icon {
    font-size: 2.1rem;
    margin-bottom: 8px;
  }
  .core-label {
    font-size: 1.1rem;
    font-weight: 700;
    color: #6bb3a6;
    margin-bottom: 4px;
  }
  .core-desc {
    font-size: 1rem;
    color: #f7f8fa;
    opacity: 0.85;
  }
  .team-list {
    display: flex;
    gap: 56px;
    flex-wrap: wrap;
    margin-top: 32px;
    justify-content: flex-start;
  }
  .team-member {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 130px;
    margin-bottom: 32px;
  }
  .avatar-photo.big-frame, .avatar-placeholder.big-frame {
    width: 150px;
    height: 150px;
    font-size: 3rem;
    margin-bottom: 18px;
    border-radius: 50%;
    box-shadow: 0 4px 18px rgba(26,53,87,0.18);
    object-fit: cover;
    background: #fff;
    color: #6bb3a6;
    border: 7px solid #6bb3a6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
  .avatar-photo.big-frame {
    object-position: center 20%;
    display: block;
  }
  .member-name {
    font-size: 1.3rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2px;
  }
  .member-role {
    font-size: 1.1rem;
    color: #6bb3a6;
    font-weight: 500;
    margin-top: 2px;
    text-align: center;
    margin-bottom: 2px;
  }
  .linkedin-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
    color: #0A66C2;
    transition: background 0.18s, border 0.18s, transform 0.15s, box-shadow 0.15s;
    border-radius: 25px;
    border: 2px solid #0A66C2;
    width: 100px;
    height: 32px;
    background: #1a3557;
    box-sizing: border-box;
  }
  .linkedin-link:hover {
    transform: scale(1.08);
    box-shadow: 0 2px 8px #0A66C233;
    background: #eaf4fb;
    border-color: #004182;
  }
  @media (max-width: 900px) {
    .about-heading-gradient {
      font-size: 2.1rem;
    }
    .about-container {
      padding: 24px 4px;
    }
    .about-section {
      max-width: 98vw;
    }
    .team-list {
      gap: 18px;
    }
    .avatar-photo.big-frame, .avatar-placeholder.big-frame {
      width: 80px;
      height: 80px;
      font-size: 1.5rem;
    }
    .section-heading, h2 {
      font-size: 1.2rem;
      margin-top: 32px;
    }
  }
`;

export default Wrapper; 