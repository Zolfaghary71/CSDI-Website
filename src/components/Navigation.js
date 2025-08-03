import React, { useState } from 'react';
import { smoothScrollToSection } from '../utils/navigation';

const Navigation = ({ scrollY, activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    smoothScrollToSection(sectionId);
  };

  return (
    <nav className={`corporate-nav ${scrollY > 100 ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="corporate-logo">
          <div className="logo-emblem">
            <img
              src="/pics/csdi-horizontal-en.png"
              alt="CSDI Logo"
              className="logo-image"
            />
          </div>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <a
              href="#home"
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('home', e)}
            >
              <span className="link-text">Home</span>
              <div className="link-underline"></div>
            </a>
            <a
              href="#services"
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('services', e)}
            >
              <span className="link-text">Services</span>
              <div className="link-underline"></div>
            </a>
            <a
              href="#gallery"
              className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('gallery', e)}
            >
              <span className="link-text">Gallery</span>
              <div className="link-underline"></div>
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('contact', e)}
            >
              <span className="link-text">Contact</span>
              <div className="link-underline"></div>
            </a>
            <a
              href="#about"
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick('about', e)}
            >
              <span className="link-text">About Us</span>
              <div className="link-underline"></div>
            </a>
          </div>
          <div className="nav-actions">
            <button className="btn-nav-portal">
              <span>CIGS Portal</span>
              <span className="portal-icon">→</span>
            </button>
          </div>
        </div>
        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="nav-separator"></div>
    </nav>
  );
};

export default Navigation;
