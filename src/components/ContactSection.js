import React from 'react';

const ContactSection = () => {
  return (
    <section className="corporate-contact" id="contact">
      <div className="container">
        <div className="contact-executive-layout">
          <div className="institutional-contact-info">
            <h2>Stakeholder Relations & Institutional Communications</h2>
            <p>
              For inquiries regarding CSDI services, regulatory matters, or
              institutional partnerships, please contact our dedicated
              stakeholder relations division through official channels.
            </p>

            <div className="contact-channels">
              <div className="contact-channel">
                <span className="contact-symbol">■</span>
                <div>
                  <h4>Official Website</h4>
                  <p>www.csdiran.ir / en.csdiran.ir</p>
                </div>
              </div>
              <div className="contact-channel">
                <span className="contact-symbol">●</span>
                <div>
                  <h4>Service Portals</h4>
                  <p>CIGS, DDN, DIMA, KARA, SETAREH</p>
                </div>
              </div>
              <div className="contact-channel">
                <span className="contact-symbol">▲</span>
                <div>
                  <h4>Regulatory Authority</h4>
                  <p>Securities and Exchange Organization (SEO)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="institutional-inquiry-form">
            <form className="corporate-form">
              <div className="form-section">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="corporate-input"
                />
                <label className="input-label">Full Name</label>
              </div>
              <div className="form-section">
                <input
                  type="email"
                  placeholder="Institutional Email"
                  className="corporate-input"
                />
                <label className="input-label">Institutional Email</label>
              </div>
              <div className="form-section">
                <select className="corporate-input">
                  <option>Select Service Category</option>
                  <option>CIGS - Comprehensive Information System</option>
                  <option>DDN - Integrated Capital Market Portal</option>
                  <option>DIMA - Electronic General Meetings</option>
                  <option>KARA - Brokers Electronic Portal</option>
                  <option>SETAREH - Electronic Collateral Management</option>
                  <option>General Inquiry</option>
                </select>
                <label className="input-label">Service Category</label>
              </div>
              <div className="form-section full-width">
                <textarea
                  placeholder="Inquiry Details"
                  className="corporate-input"
                  rows="4"
                ></textarea>
                <label className="input-label">Inquiry Details</label>
              </div>
              <button type="submit" className="btn-submit-inquiry">
                <span>Submit Inquiry</span>
                <span className="submit-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
