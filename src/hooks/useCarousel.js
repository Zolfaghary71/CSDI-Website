import { useState, useEffect } from 'react';
import { fetchCarouselData } from '../services/api';

/**
 * Custom hook for managing carousel data from API
 * @returns {Object} Carousel state and data
 */
export const useCarousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCarouselData();
        
        // Transform API data to match the expected format for the carousel
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          // Convert Base64 image data to data URL format
          backgroundImage: item.image ? `data:image/jpeg;base64,${item.image}` : "pics/img-5.jpg.jpeg",
          link: item.link,
          // Add button data from API
          button1Text: item.button1Text,
          button1Link: item.button1Link,
          button2Text: item.button2Text,
          button2Link: item.button2Link,
          // Remove description to avoid duplication with subtitle
          description: "", // Empty description to avoid showing duplicate text
          stats: { 
            primary: "", 
            secondary: "" 
          }
        }));
        
        setCarouselData(transformedData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load carousel data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCarouselData();
  }, []);

  const refreshCarouselData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCarouselData();
      
      // Transform API data to match the expected format for the carousel
      const transformedData = data.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        // Convert Base64 image data to data URL format
        backgroundImage: item.image ? `data:image/jpeg;base64,${item.image}` : "pics/img-5.jpg.jpeg",
        link: item.link,
        // Add button data from API
        button1Text: item.button1Text,
        button1Link: item.button1Link,
        button2Text: item.button2Text,
        button2Link: item.button2Link,
        // Remove description to avoid duplication with subtitle
        description: "", // Empty description to avoid showing duplicate text
        stats: { 
          primary: "", 
          secondary: "" 
        }
      }));
      
      setCarouselData(transformedData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to refresh carousel data:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    carouselData,
    loading,
    error,
    refreshCarouselData
  };
};
