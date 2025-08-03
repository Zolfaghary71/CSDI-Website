import { useState, useEffect } from 'react';

export const useSlider = (totalSlides, autoPlayInterval = 4000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const progressTimer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((currentSlide + 1) % totalSlides);
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 100); // Update every 100ms
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, [currentSlide, isPaused, totalSlides, autoPlayInterval]);

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
    setSlideProgress(0);
  };

  const handlePrevSlide = () => {
    const prevSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    handleSlideChange(prevSlide);
  };

  const handleNextSlide = () => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    handleSlideChange(nextSlide);
  };

  return {
    currentSlide,
    slideProgress,
    isPaused,
    setIsPaused,
    handleSlideChange,
    handlePrevSlide,
    handleNextSlide,
  };
};
