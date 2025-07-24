import React from 'react';
import Wrapper from './style';

const Contact = () => {
  return (
    <Wrapper>
      <div className="contact-bg">
        <div className="contact-container">
          <h1 className="contact-heading-gradient">Get in Touch</h1>
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-heading">Get in Touch</h2>
              <p>We’d love to hear from you.<br />Whether it’s query, feedback, or collaboration idea – drop us a message!</p>
              <div className="contact-detail"><span className="contact-icon">✉️</span> official.boardwise@gmail.com</div>
              <div className="contact-detail"><span className="contact-icon">📍</span> Jaipur, Rajasthan, India</div>
              <div className="contact-detail"><span className="contact-icon">📞</span> +91 8104630812</div>
              <div className="contact-socials">
                <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            <form className="contact-form">
              <label>Name
                <input type="text" name="name" required />
              </label>
              <label>Email
                <input type="email" name="email" required />
              </label>
              <label>Message
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;