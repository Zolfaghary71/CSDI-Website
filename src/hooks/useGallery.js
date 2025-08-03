import { useState, useEffect } from 'react';
import { fetchAllGalleryPhotos } from '../services/api';

export const useGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allPhotos, setAllPhotos] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [galleries, setGalleries] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery data from API
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const galleryData = await fetchAllGalleryPhotos();
        
        setAllPhotos(galleryData.photos);
        setCategories(galleryData.categories);
        setGalleries(galleryData.galleries);
        
        // Initially show maximum 4 photos to prevent UI overload
        const MAX_PHOTOS = 4;
        setFilteredImages(galleryData.photos.slice(0, MAX_PHOTOS));
      } catch (err) {
        console.error('Error loading gallery data:', err);
        setError('Failed to load gallery images. Please try again later.');
        // Keep empty arrays as fallback
        setAllPhotos([]);
        setCategories(['all']);
        setGalleries([]);
        setFilteredImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  // Filter images when category changes
  useEffect(() => {
    const MAX_PHOTOS = 4; // Limit to maximum 4 photos
    
    let filtered;
    if (selectedCategory === 'all') {
      filtered = allPhotos;
    } else {
      filtered = allPhotos.filter(
        (img) => img.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Limit to maximum 4 photos to prevent UI overload
    setFilteredImages(filtered.slice(0, MAX_PHOTOS));
  }, [selectedCategory, allPhotos]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  const handleModalBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return {
    selectedCategory,
    setSelectedCategory,
    filteredImages,
    categories,
    galleries,
    modalOpen,
    selectedImage,
    openModal,
    closeModal,
    handleModalBackgroundClick,
    loading,
    error,
  };
};
