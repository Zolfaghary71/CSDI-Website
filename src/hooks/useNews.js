import { useState, useEffect } from 'react';
import { newsData as staticNewsData } from '../data/newsData';

export const useNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const fetchNewsData = async () => {
    console.log('📰 fetchNewsData: Starting to load news data...');

    try {
      setNewsLoading(true);
      setNewsError(null);

      // Simulate loading time for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use the static news data
      setNewsData(staticNewsData);
      console.log(
        `✅ fetchNewsData: Successfully loaded ${staticNewsData.length} news items`
      );
    } catch (error) {
      console.error('❌ fetchNewsData: Error loading news data:', error);
      setNewsError('Failed to load news content');
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 useNews: Initializing news data...');
    fetchNewsData();
  }, []);

  // Monitor news data changes without spamming console
  useEffect(() => {
    if (newsData.length > 0) {
      console.log(
        `✅ News section ready: ${newsData.length} items available for display`
      );
    }
  }, [newsData]);

  return {
    newsData,
    newsLoading,
    newsError,
    fetchNewsData,
  };
};
