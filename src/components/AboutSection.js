import React from 'react';
import { organizationalMilestones } from '../data/companyData';

const AboutSection = () => {
  return (
    <section className="institutional-about" id="about">
      <div className="container">
        <div className="about-executive-layout">
          <div className="institutional-overview">
            <div className="section-header-corporate">
              <h2 className="section-title-corporate">
                Central Securities Depository of Iran
              </h2>
            </div>
            <div className="executive-statement">
              <p>
                The Central Securities Depository of Iran (CSDI) serves as the
                central registrar, depository, and clearinghouse for financial
                instruments traded on Iran's capital market, as well as for
                physical market transactions in the Iran Energy Exchange.
              </p>
              <p>
                Established in 2005 as a public joint-stock company, CSDI
                operates under the supervision of the Securities and Exchange
                Organization (SEO) and the Securities and Exchange High
                Council, functioning as a self-regulatory organization within
                its defined mandate.
              </p>
              <p>
                CSDI's institutional roots date back to 1967 with the Tehran
                Stock Exchange Brokers Association. Following the Securities
                Market Act ratification in December 2005, CSDI was founded as
                an independent legal entity providing centralized services for
                Iran's capital market.
              </p>
            </div>
            <div className="institutional-principles">
              <div className="principle-item">
                <span className="principle-symbol">■</span>
                <div>
                  <h4>Centralized Registry & Custody</h4>
                  <p>
                    Comprehensive registry and custody services for all market
                    instruments
                  </p>
                </div>
              </div>
              <div className="principle-item">
                <span className="principle-symbol">●</span>
                <div>
                  <h4>Clearing & Settlement</h4>
                  <p>
                    Advanced clearing and settlement systems with T+1 cycle
                    transition
                  </p>
                </div>
              </div>
              <div className="principle-item">
                <span className="principle-symbol">▲</span>
                <div>
                  <h4>Market Infrastructure</h4>
                  <p>
                    Core infrastructure supporting all licensed exchanges and
                    stakeholders
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="corporate-achievements">
            <div className="achievements-framework">
              <h3>Organizational Milestones</h3>
              {organizationalMilestones.map((achievement, index) => (
                <div key={index} className="milestone-entry">
                  <div className="milestone-year">{achievement.year}</div>
                  <div className="milestone-details">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
