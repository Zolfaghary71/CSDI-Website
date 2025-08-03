# Carousel API Integration

This document explains how the carousel component has been updated to fetch data from the CSDI Website API.

## API Integration

### Endpoint
The carousel now fetches data from: `GET /api/PublicCarousel`

### API Response Structure
```json
[
  {
    "id": 1,
    "title": "Central Securities Depository of Iran",
    "subtitle": "Core Infrastructure Provider for Iran's Capital Market Operations",
    "image": "base64EncodedImageString",
    "link": null,
    "button1Text": "Learn More",
    "button1Link": "https://example.com/learn-more",
    "button2Text": "Contact Us",
    "button2Link": "https://example.com/contact"
  }
]
```

### Files Changed

1. **`src/services/api.js`** - New API service for fetching carousel data
2. **`src/hooks/useCarousel.js`** - Custom hook for managing carousel API state
3. **`src/components/HeroSection.js`** - Updated to use API data instead of static data
4. **`src/App.js`** - Updated to use the new carousel hook
5. **`src/App.css`** - Added loading and error state styles

### Features

- **Automatic fallback**: If the API fails, the carousel falls back to static data
- **Loading states**: Shows loading indicator while fetching data
- **Error handling**: Displays error messages if API calls fail
- **Link support**: If a carousel item has a `link`, it becomes clickable
- **Environment configuration**: API URL can be configured via `.env` file

### Configuration

Set the API URL in your `.env` file:
```
REACT_APP_API_URL=https://localhost:7154/api
```

### Development Notes

- The API service includes proper error handling and CORS configuration
- Loading and error states are displayed to users
- The component gracefully degrades if the API is unavailable
- Images are expected to be in the `public/pics/` directory

### Testing the Integration

1. Ensure your backend API is running on `https://localhost:7154`
2. Start the React development server: `npm start`
3. The carousel should load data from the API automatically
4. If the API is unavailable, fallback data will be displayed

### Production Deployment

For production, update the `REACT_APP_API_URL` in your `.env` file to point to your production API endpoint.
