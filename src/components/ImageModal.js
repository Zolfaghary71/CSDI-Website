import React from 'react';

const ImageModal = ({ modalOpen, selectedImage, closeModal, handleModalBackgroundClick }) => {
  if (!modalOpen || !selectedImage) return null;

  return (
    <div className="image-modal" onClick={handleModalBackgroundClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-image-info">
            <h3 className="modal-title">{selectedImage.title}</h3>
            <span className="modal-category">{selectedImage.category}</span>
          </div>
          <button
            className="modal-close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-image-container">
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="modal-image"
          />
        </div>

        <div className="modal-footer">
          <p className="modal-description">{selectedImage.description}</p>
          <div className="modal-actions">
            <button
              className="btn-modal-download"
              onClick={() => window.open(selectedImage.src, '_blank')}
            >
              View Original Size
            </button>
            <button className="btn-modal-close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
