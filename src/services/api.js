// API service for fetching data from the backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7154/api';

/**
 * Fetch carousel data from the public API
 * @returns {Promise<Array>} Array of carousel items
 */
export const fetchCarouselData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/PublicCarousel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // For development with self-signed certificates
      ...(process.env.NODE_ENV === 'development' && {
        credentials: 'omit'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const carouselData = await response.json();
    
    // Validate the response structure
    if (!Array.isArray(carouselData)) {
      throw new Error('Invalid response format: expected an array');
    }
    
    return carouselData;
  } catch (error) {
    console.error('Error fetching carousel data:', error);
    
    // No fallback data; return empty array if API fails
    return [];
  }
};

/**
 * Fetch public content data
 * @param {Object} params - Query parameters for filtering content
 * @returns {Promise<Array>} Array of content items
 */
export const fetchPublicContent = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/public/content?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // For development with self-signed certificates
      ...(process.env.NODE_ENV === 'development' && {
        credentials: 'omit'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentData = await response.json();
    
    // Validate the response structure
    if (!Array.isArray(contentData)) {
      throw new Error('Invalid response format: expected an array');
    }
    
    return contentData;
  } catch (error) {
    console.error('Error fetching content data:', error);
    return [];
  }
};

/**
 * Fetch gallery information from public API
 * @returns {Promise<Array>} Array of gallery objects with names and IDs
 */
export const fetchGalleryInfo = async () => {
  console.log('=== GALLERY INFO API CALL ===');
  console.log('Function: fetchGalleryInfo()');
  console.log('Purpose: Fetch gallery metadata (names and IDs)');
  console.log('Parameters: None');
  
  try {
    // Try multiple possible endpoints for gallery information
    const possibleEndpoints = [
      `${API_BASE_URL}/public/PublicGallery/galleries`,
      `${API_BASE_URL}/public/galleries`,
      `${API_BASE_URL}/public/PublicGallery`
    ];
    
    console.log('Endpoints to try:', possibleEndpoints);
    
    for (let i = 0; i < possibleEndpoints.length; i++) {
      const endpoint = possibleEndpoints[i];
      try {
        console.log(`\n--- Attempt ${i + 1}/${possibleEndpoints.length} ---`);
        console.log(`Calling: ${endpoint}`);
        console.log('Method: GET');
        console.log('Headers:', {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          // For development with self-signed certificates
          ...(process.env.NODE_ENV === 'development' && {
            credentials: 'omit'
          })
        });
        
        console.log(`Response status: ${response.status} ${response.statusText}`);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
          const galleries = await response.json();
          console.log(`✅ SUCCESS! Fetched galleries from ${endpoint}`);
          console.log('Response data structure:', {
            isArray: Array.isArray(galleries),
            length: galleries?.length || 0,
            firstItem: galleries?.[0] ? Object.keys(galleries[0]) : 'No items'
          });
          console.log('Gallery data:', galleries);
          
          // Validate the response structure
          if (Array.isArray(galleries)) {
            console.log('=== END GALLERY INFO API CALL ===\n');
            return galleries;
          } else {
            console.log('❌ Invalid response: Expected array but got:', typeof galleries);
          }
        } else {
          console.log(`❌ HTTP Error: ${response.status}`);
        }
      } catch (endpointError) {
        console.log(`❌ Network/Parse Error for ${endpoint}:`, endpointError.message);
        continue;
      }
    }
    
    console.log('❌ All gallery endpoints failed, returning empty array');
    console.log('=== END GALLERY INFO API CALL ===\n');
    return [];
  } catch (error) {
    console.log('❌ Unexpected error in fetchGalleryInfo:', error.message);
    console.log('=== END GALLERY INFO API CALL ===\n');
    return [];
  }
};

/**
 * Fetch all photos from public gallery API
 * @returns {Promise<Object>} Object containing categorized photos
 */
export const fetchAllGalleryPhotos = async () => {
  console.log('\n=== GALLERY PHOTOS API CALL ===');
  console.log('Function: fetchAllGalleryPhotos()');
  console.log('Purpose: Fetch all photos from galleries and organize them');
  console.log('Parameters: None');
  
  try {
    // First, fetch gallery information to get actual gallery names
    console.log('\n🔄 Step 1: Fetching gallery information...');
    const galleryInfo = await fetchGalleryInfo();
    
    // Create a map of galleryId to gallery name for quick lookup
    const galleryMap = galleryInfo.reduce((acc, gallery) => {
      acc[gallery.id] = gallery;
      return acc;
    }, {});
    
    console.log('Gallery map created:', {
      totalGalleries: Object.keys(galleryMap).length,
      galleryIds: Object.keys(galleryMap),
      galleryDetails: Object.entries(galleryMap).map(([id, info]) => ({
        id,
        title: info.title || info.name || info.Title || info.Name,
        fields: Object.keys(info)
      }))
    });
    
    console.log('\n🔄 Step 2: Fetching gallery photos...');
    const photosEndpoint = `${API_BASE_URL}/public/PublicGallery/photos`;
    console.log('Calling:', photosEndpoint);
    console.log('Method: GET');
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    const response = await fetch(photosEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // For development with self-signed certificates
      ...(process.env.NODE_ENV === 'development' && {
        credentials: 'omit'
      })
    });
    
    console.log(`Response status: ${response.status} ${response.statusText}`);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const photos = await response.json();
    
    // Validate the response structure
    if (!Array.isArray(photos)) {
      throw new Error('Invalid response format: expected an array');
    }
    
    console.log('✅ Photos API Response:', {
      isArray: Array.isArray(photos),
      totalPhotos: photos.length,
      firstPhotoFields: photos[0] ? Object.keys(photos[0]).filter(key => key !== 'imageData') : 'No photos',
      firstPhotoSample: photos[0] ? {
        ...photos[0],
        imageData: '[BINARY DATA - SKIPPED]'
      } : null
    });
    
    // Group photos by galleryId first to understand the gallery structure
    const photosByGallery = photos.reduce((acc, photo) => {
      const galleryId = photo.galleryId || 'ungrouped';
      if (!acc[galleryId]) {
        acc[galleryId] = [];
      }
      acc[galleryId].push(photo);
      return acc;
    }, {});
    
    console.log('\n📊 Photos grouped by galleryId:', {
      galleryIds: Object.keys(photosByGallery),
      photoCounts: Object.entries(photosByGallery).map(([id, photos]) => ({
        galleryId: id,
        photoCount: photos.length
      }))
    });
    
    console.log('\n🔄 Step 3: Transforming photos...');
    // Transform photos and extract categories
    const transformedPhotos = photos.map((photo, index) => {
      // Get actual gallery information from the map
      const galleryId = photo.galleryId || 0;
      const galleryInfo = galleryMap[galleryId];
      
      // Use actual gallery name if available, try multiple possible field names
      const galleryTitle = galleryInfo?.title || galleryInfo?.name || galleryInfo?.Title || galleryInfo?.Name || `Gallery ${galleryId}`;
      const categoryName = galleryInfo?.title 
        ? galleryInfo.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : galleryInfo?.name
        ? galleryInfo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : `gallery-${galleryId}`;
      
      console.log(`📷 Processing Photo ${photo.id}: galleryId=${galleryId}, galleryTitle="${galleryTitle}", category="${categoryName}"`);
      
      return {
        id: photo.id,
        title: photo.title || '', // Leave blank if no title
        description: photo.description || 'No description available',
        category: categoryName,
        src: `data:image/jpeg;base64,${photo.imageData}`, // Convert base64 to data URL
        galleryId: photo.galleryId,
        displayOrder: photo.displayOrder || index,
        tags: photo.tags || [],
        galleryTitle: galleryTitle
      };
    });
    
    console.log('✅ Transformed photos sample (first 2):', 
      transformedPhotos.slice(0, 2).map(photo => ({
        ...photo,
        src: '[BASE64 DATA URL - SKIPPED]'
      }))
    );
    
    // Extract unique categories from photos
    const uniqueCategories = [...new Set(transformedPhotos.map(photo => photo.category))];
    const categories = ['all', ...uniqueCategories.sort()];
    
    console.log('\n📂 Categories found:', categories);
    
    // Group photos by category for gallery structure
    const galleries = uniqueCategories.map(category => {
      const categoryPhotos = transformedPhotos.filter(photo => photo.category === category);
      const galleryId = categoryPhotos[0]?.galleryId || 0;
      // Use the actual gallery title from the first photo in this category
      const actualGalleryTitle = categoryPhotos[0]?.galleryTitle || `Gallery ${galleryId}`;
      
      console.log(`🏛️ Creating gallery for category "${category}": galleryId=${galleryId}, title="${actualGalleryTitle}"`);
      
      return {
        title: actualGalleryTitle, // Use the actual title from API instead of hardcoded
        normalizedTitle: category,
        galleryId: galleryId,
        photos: categoryPhotos.sort((a, b) => a.displayOrder - b.displayOrder)
      };
    });
    
    console.log('\n📋 Galleries structure:', 
      galleries.map(gallery => ({
        title: gallery.title,
        normalizedTitle: gallery.normalizedTitle,
        galleryId: gallery.galleryId,
        photoCount: gallery.photos.length
      }))
    );
    
    // Sort all photos by display order
    transformedPhotos.sort((a, b) => a.displayOrder - b.displayOrder);
    
    const result = {
      photos: transformedPhotos,
      categories,
      galleries
    };
    
    console.log('\n✅ Final result summary:', {
      totalPhotos: result.photos.length,
      totalCategories: result.categories.length,
      totalGalleries: result.galleries.length,
      categories: result.categories,
      galleryTitles: result.galleries.map(g => g.title)
    });
    
    console.log('=== END GALLERY PHOTOS API CALL ===\n');
    return result;
  } catch (error) {
    console.log('\n❌ Error in fetchAllGalleryPhotos:', error.message);
    console.log('Stack trace:', error.stack);
    console.log('=== END GALLERY PHOTOS API CALL ===\n');
    return {
      photos: [],
      categories: ['all'],
      galleries: []
    };
  }
};
