import React from 'react';
import { smoothScrollToSection } from '../utils/navigation';

const HeroSection = ({
  currentSlide,
  slideProgress,
  isPaused,
  setIsPaused,
  handleSlideChange,
  handlePrevSlide,
  handleNextSlide,
  carouselData,
  loading,
  error,
}) => {
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    smoothScrollToSection(sectionId);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="executive-hero" id="home">
        <div className="hero-background">
          <div className="hero-slide active" style={{ backgroundColor: '#f0f0f0' }}>
            <div className="professional-overlay"></div>
          </div>
        </div>
        <div className="hero-content-wrapper">
          <div className="container">
            <div className="executive-content">
              <div className="loading-message">
                <h2>Loading carousel...</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="executive-hero" id="home">
        <div className="hero-background">
          <div className="hero-slide active" style={{ backgroundColor: '#f0f0f0' }}>
            <div className="professional-overlay"></div>
          </div>
        </div>
        <div className="hero-content-wrapper">
          <div className="container">
            <div className="executive-content">
              <div className="error-message">
                <h2>Unable to load carousel</h2>
                <p>Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  // Show empty carousel state if no data
  if (!carouselData || carouselData.length === 0) {
    return (
      <section className="executive-hero" id="home">
        <div className="hero-background">
          <div className="hero-slide active" style={{ backgroundColor: '#e0e0e0' }}>
            <div className="professional-overlay"></div>
          </div>
        </div>
        <div className="hero-content-wrapper">
          <div className="container">
            <div className="executive-content">
              <div className="empty-carousel-message">
                <h2>No carousel items to display</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentSlideData = carouselData[currentSlide];

  return (
    <section className="executive-hero" id="home">
      <div className="hero-background">
        <div
          className="hero-slide active"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentSlideData.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="professional-overlay"></div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="slider-controls">
        <button
          className="slider-btn slider-prev"
          onClick={handlePrevSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="slider-btn slider-next"
          onClick={handleNextSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <span className="indicator-number">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="slider-progress-container">
        <div className="slider-progress-bar">
          <div
            className="slider-progress-fill"
            style={{ width: `${slideProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="hero-content-wrapper">
        <div className="container">
          <div className="executive-content">
            <h1 className="executive-title">
              {currentSlideData.title}
            </h1>
            <p className="executive-subtitle">
              {currentSlideData.subtitle}
            </p>
            {currentSlideData.description && currentSlideData.description.trim() && (
              <p className="slide-description">
                {currentSlideData.description}
              </p>
            )}

            {/* Slide-specific highlight stat - only show if there are actual stats */}
            {(currentSlideData.stats?.primary || currentSlideData.stats?.secondary) && (
              <div className="slide-highlight-stat">
                <span className="highlight-value">
                  {currentSlideData.stats?.primary || ""}
                </span>
                <span className="highlight-label">
                  {currentSlideData.stats?.secondary || ""}
                </span>
              </div>
            )}

            <div className="executive-actions">
              {/* Button 1 - Show only if both text and link are provided */}
              {currentSlideData.button1Text && currentSlideData.button1Link && (
                <a
                  href={currentSlideData.button1Link}
                  className="btn-corporate-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{currentSlideData.button1Text}</span>
                  <span className="arrow">→</span>
                </a>
              )}
              
              {/* Button 2 - Show only if both text and link are provided */}
              {currentSlideData.button2Text && currentSlideData.button2Link && (
                <a
                  href={currentSlideData.button2Link}
                  className="btn-corporate-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{currentSlideData.button2Text}</span>
                  <span className="arrow">→</span>
                </a>
              )}
              
              {/* Fallback buttons if no API buttons are provided */}
              {!currentSlideData.button1Text && !currentSlideData.button1Link && (
                <>
                  <button
                    className="btn-corporate-primary"
                    onClick={(e) => handleNavClick('services', e)}
                  >
                    <span>Explore Our Services</span>
                    <span className="arrow">→</span>
                  </button>
                  <button
                    className="btn-corporate-secondary"
                    onClick={(e) => handleNavClick('about', e)}
                  >
                    <span>About CSDI</span>
                    <span className="arrow">→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
