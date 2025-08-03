import React from 'react';
import { coreServices } from '../data/services';
import { supportedExchanges } from '../data/companyData';

const ServicesSection = () => {
  return (
    <section className="corporate-services" id="services">
      <div className="container">
        <div className="section-header-corporate">
          <h2 className="section-title-corporate">
            Comprehensive Capital Market Infrastructure Solutions
          </h2>
          <p className="section-description-corporate">
            CSDI provides centralized registry, custody, clearing, and
            settlement services for all financial instruments traded in Iran's
            capital market, supporting operations across all licensed
            exchanges.
          </p>
        </div>

        <div className="services-grid-extended">
          {coreServices.map((service, index) => (
            <div
              key={index}
              className="service-module"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="module-header">
                <div className="service-classification">
                  <h3 className="service-designation">{service.title}</h3>
                  <div className="service-compliance">
                    <span>SEO Supervised</span> •{' '}
                    <span>Regulatory Compliant</span>
                  </div>
                </div>
              </div>
              <p className="service-overview">{service.description}</p>
              <div className="service-specifications">
                {service.features.map((feature, i) => (
                  <span key={i} className="specification-item">
                    {feature}
                  </span>
                ))}
              </div>
              <div className="service-engagement">
                <button className="btn-service-inquiry">Learn More</button>
                <button className="btn-technical-specs">Access Portal</button>
              </div>
            </div>
          ))}
        </div>

        {/* Supported Exchanges */}
        <div className="supported-exchanges">
          <h3 className="exchanges-title">
            Supporting All Licensed Exchanges
          </h3>
          <div className="exchanges-grid">
            {supportedExchanges.map((exchange, index) => (
              <div key={index} className="exchange-item">
                <span className="exchange-code">{exchange.code}</span>
                <span className="exchange-name">{exchange.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
