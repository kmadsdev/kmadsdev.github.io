import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { CONTACT } from '../constants';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Very Handly & Forever"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@example.org"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+621 (123) 45678"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            Send Message 💌
          </button>
          
          <div className="contact-social-icons">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="contact-icon">
              <FaGithub />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="contact-icon">
              <FaLinkedin />
            </a>
            <a href={`mailto:${CONTACT.email}`} className="contact-icon">
              <FaEnvelope />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
