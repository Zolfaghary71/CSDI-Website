import React from 'react';
import { smoothScrollToSection } from '../utils/navigation';

const Footer = () => {
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    smoothScrollToSection(sectionId);
  };

  return (
    <footer className="corporate-footer">
      <div className="container">
        <div className="footer-institutional">
          <div className="footer-corporate-info">
            <div className="footer-corporate-brand">
              <div className="footer-logo">
                <img
                  src="/pics/csdi-horizontal-en.png"
                  alt="CSDI Logo"
                  className="footer-logo-image"
                />
              </div>
              <p>Central Securities Depository of Iran</p>
              <p>Securities and Exchange Organization Supervised Entity</p>
              <p>Established 2005 • Public Joint-Stock Company</p>
            </div>

            <div className="footer-institutional-links">
              <div className="footer-section">
                <h4>Electronic Services</h4>
                <ul>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      CIGS Portal
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      DDN Platform
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      DIMA Meetings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      KARA Brokers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      SETAREH Collateral
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Organization</h4>
                <ul>
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => handleNavClick('about', e)}
                    >
                      About CSDI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => handleNavClick('about', e)}
                    >
                      Organizational Structure
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      onClick={(e) => handleNavClick('about', e)}
                    >
                      Regulatory Framework
                    </a>
                  </li>
                  <li>
                    <a
                      href="#news"
                      onClick={(e) => handleNavClick('news', e)}
                    >
                      Corporate Announcements
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Market Support</h4>
                <ul>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      Tehran Stock Exchange
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      Iran Fara Bourse
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      Iran Mercantile Exchange
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      onClick={(e) => handleNavClick('services', e)}
                    >
                      Iran Energy Exchange
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-corporate-bottom">
            <div className="footer-compliance">
              <p>
                &copy; 2024 Central Securities Depository of Iran. All rights
                reserved.
              </p>
              <p>
                Licensed and regulated by the Securities and Exchange
                Organization of the Islamic Republic of Iran
              </p>
            </div>
            <div className="footer-legal-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Regulatory Disclosures</a>
              <a href="#">Compliance Framework</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
