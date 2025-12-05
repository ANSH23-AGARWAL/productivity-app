import React from 'react';
import Wrapper from './style';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const teamMembers = [
  { name: 'Jitendra Yadav', role: 'Frontend & Backend Developer & Architect', photo: '/Jitendra.jpeg', linkedin: 'https://linkedin.com/in/jitendrayadav00', className: 'jitendra' },
  { name: 'Arjun Gautam', role: 'Backend Developer & Architect', photo: '/Arjun Gutam.jpeg', linkedin: 'https://linkedin.com/in/arjun-gautam-52a752283/' },
  { name: 'Ansh Agarwal', role: 'UI/UX Designer & Frontend', photo: '/Ansh Agarwal.jpeg', linkedin: 'https://linkedin.com/in/ansh-agarwal-411951250/' },
  { name: 'Rahul Saini', role: 'UI/UX Designer & Frontend', photo: '/Rahul Saini.jpeg', linkedin: 'https://linkedin.com/in/rahul-saini-85ba0a26a/' },
];

const whyBoardWise = [
  'Easy-to-use kanban-style boards',
  'Real-time collaboration with your team',
  'Organize ideas, tasks, or projects easily',
  'Smart reminders & deadline alerts',
  'Beautiful, minimal UI with dark/light themes',
  'Designed for creatives, professionals & teams',
  'Works across all devices – web, mobile & tablet',
  'Perfect for students, startups, agencies, and enterprises',
];

const coreValues = [
  { icon: '🔍', label: 'Transparency', desc: 'Clear communication and accountability' },
  { icon: '🧠', label: 'Simplicity', desc: 'Minimalist design, maximum efficiency' },
  { icon: '💬', label: 'Collaboration', desc: 'We win together' },
  { icon: '🚀', label: 'Innovation', desc: 'Constantly evolving with your needs' },
  { icon: '🌏', label: 'Inclusivity', desc: 'Built for everyone, everywhere' },
];

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
    <rect width="24" height="24" rx="5" fill="#0A66C2" />
    <path d="M7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5Z" fill="white" />
    <path d="M6.75 10.25H8.25V18H6.75V10.25Z" fill="white" />
    <path d="M10.75 10.25H12.25V11.25H12.27C12.49 10.85 13.04 10.43 13.81 10.43C15.38 10.43 15.75 11.43 15.75 12.68V18H14.25V13.25C14.25 12.43 14.23 11.38 13.13 11.38C12.01 11.38 11.87 12.28 11.87 13.19V18H10.37V10.25H10.75Z" fill="white" />
  </svg>
);

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>
      <div className="about-bg">
        <div className="about-container">
          <h1 className="about-heading-gradient">About Us</h1>

          <section className="about-section who-we-are">
            <h2 className="section-heading">Who We Are</h2>
            <p>BoardWise is your all-in-one productivity hub designed to bring structure and clarity to your personal tasks, team workflows, and organizational goals. Whether you're a solo entrepreneur, a startup team, or a large enterprise – BoardWise helps you plan smarter, collaborate faster, and get things done.</p>
          </section>

          <section className="about-section our-mission">
            <h2 className="section-heading">Our Mission</h2>
            <p>To simplify how people manage work. We believe productivity shouldn't be complex – so we’ve built a platform that feels intuitive, looks beautiful, and works seamlessly.</p>
          </section>

          <section className="about-section our-vision">
            <h2 className="section-heading">Our Vision</h2>
            <p>To empower users with clarity, control, and collaboration – all in one visual workspace.<br />We envision a world where work doesn't feel like work, but like progress.</p>
          </section>

          <section className="about-section why-boardwise">
            <h2 className="section-heading">Why BoardWise?</h2>
            <ul className="why-list">
              {whyBoardWise.map((item, idx) => (
                <li key={idx}><span className="checkmark-box">✓</span> {item}</li>
              ))}
            </ul>
          </section>

          <section className="about-section core-values">
            <h2 className="section-heading">Our Core Values</h2>
            <div className="core-values-list">
              {coreValues.map((val, idx) => (
                <div className="core-value" key={idx}>
                  <span className="core-icon">{val.icon}</span>
                  <div className="core-label">{val.label}</div>
                  <div className="core-desc">{val.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section our-team">
            <h2 className="section-heading">Meet the Team</h2>
            <div className="team-list">
              {teamMembers.map((member, idx) => (
                <div className={`team-member ${member.className || ''}`} key={idx}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="avatar-photo big-frame" />
                  ) : (
                    <div className="avatar-placeholder big-frame">{member.name[0]}</div>
                  )}
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                  <a href={member.linkedin} className="linkedin-link" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default AboutUs;
