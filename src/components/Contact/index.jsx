import React from 'react';
import Wrapper from './style';

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="contact-bg">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <div className="contact-container">
          <h1 className="contact-heading-gradient">Get in Touch</h1>
          <div className="contact-content">
            <div className="contact-info">
              {/* <h2 className="section-heading">Get in Touch</h2> */}
              <p>We’d love to hear from you.<br />Whether it’s query, feedback, or collaboration idea – drop us a message!</p>
              <div className="contact-detail"><span className="contact-icon">✉️</span> official.boardwise@gmail.com</div>
              <div className="contact-detail"><span className="contact-icon">📍</span> Jaipur, Rajasthan, India</div>
              <div className="contact-detail"><span className="contact-icon">📞</span> +91 8104630812</div>
              <div className="contact-socials">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <form className="contact-form">
              <label>Name
                <input type="text" name="name" placeholder="Your Name" required />
              </label>
              <label>Email
                <input type="email" name="email" placeholder="Your Email" required />
              </label>
              <label>Message
                <textarea name="message" rows={4} placeholder="Your Message" required />
              </label>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
};

export default Contact;