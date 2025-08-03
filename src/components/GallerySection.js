import React from 'react';

const GallerySection = ({
  selectedCategory,
  setSelectedCategory,
  filteredImages,
  categories,
  galleries,
  openModal,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <section className="corporate-gallery" id="gallery">
        <div className="container">
          <div className="section-header-corporate">
            <h2 className="section-title-corporate">
              Corporate Documentation & Infrastructure
            </h2>
            <p className="section-description-corporate">
              Visual documentation of CSDI's institutional activities,
              infrastructure development, and corporate events showcasing our
              commitment to market excellence.
            </p>
          </div>
          <div className="gallery-loading">
            <div className="loading-spinner"></div>
            <p>Loading gallery images...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="corporate-gallery" id="gallery">
        <div className="container">
          <div className="section-header-corporate">
            <h2 className="section-title-corporate">
              Corporate Documentation & Infrastructure
            </h2>
            <p className="section-description-corporate">
              Visual documentation of CSDI's institutional activities,
              infrastructure development, and corporate events showcasing our
              commitment to market excellence.
            </p>
          </div>
          <div className="gallery-error">
            <div className="error-message">
              <h3>Unable to Load Gallery</h3>
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="corporate-gallery" id="gallery">
      <div className="container">
        <div className="section-header-corporate">
          <h2 className="section-title-corporate">
            Corporate Documentation & Infrastructure
          </h2>
          <p className="section-description-corporate">
            Visual documentation of CSDI's institutional activities,
            infrastructure development, and corporate events showcasing our
            commitment to market excellence.
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="gallery-categories">
          <div className="category-tabs">
            {categories.map((category) => {
              // Find the gallery info for this category
              const gallery = galleries.find(g => g.normalizedTitle === category);
              const displayName = category === 'all' 
                ? 'All' 
                : gallery?.title || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
              
              return (
                <button
                  key={category}
                  className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Content with Real Images */}
        <div className="gallery-content">
          {filteredImages.length === 0 ? (
            <div className="gallery-empty">
              <p>No images available in this category.</p>
            </div>
          ) : (
            <div className="gallery-grid-real">
              {filteredImages.map((image) => (
                <div key={image.id} className="gallery-item-real">
                  <div
                    className="gallery-image-container"
                    onClick={() => openModal(image)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="gallery-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/pics/csdi-horizontal-en.png'; // Fallback image
                        e.target.alt = 'Image not available';
                      }}
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-content-overlay">
                        {image.title && (
                          <h3 className="gallery-title">{image.title}</h3>
                        )}
                        <p className="gallery-description">
                          {image.description}
                        </p>
                        <span className="gallery-category-tag">
                          {image.galleryTitle || image.category}
                        </span>
                        <div className="gallery-click-hint">
                          <span className="click-icon">🔍</span>
                          <span>Click to view full size</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Photo limitation notice */}
          {filteredImages.length > 0 && (
            <div style={{ 
              textAlign: 'center', 
              margin: '30px 0', 
              padding: '20px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '8px',
              color: '#64748b',
              fontSize: '14px'
            }}>
              <p style={{ margin: 0 }}>
                📷 Showing the first 4 photos from this gallery. 
                {selectedCategory === 'all' ? ' Total photos available across all galleries.' : ' More photos may be available in this category.'}
              </p>
            </div>
          )}

          {/* Gallery Statistics */}
          <div className="gallery-statistics">
            <div className="stat-item">
              <span className="stat-number">{filteredImages.length}</span>
              <span className="stat-label">Images Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Gallery Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">46M+</span>
              <span className="stat-label">CIGS Participants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">T+1</span>
              <span className="stat-label">Settlement Initiative</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
