import React from 'react';
import { Link } from 'react-router-dom';
import { getAllContent } from '../data/contentData';

const ContentDemo = () => {
  const allContent = getAllContent();

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Content Demo Page</h1>
      <p>Click on any article below to see the individual content page with dummy data:</p>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        {allContent.map((content) => (
          <div key={content.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            gap: '20px'
          }}>
            <img 
              src={content.featuredImage} 
              alt={content.title}
              style={{
                width: '150px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>
                <Link 
                  to={`/content/${content.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {content.title}
                </Link>
              </h3>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                {content.subtitle}
              </p>
              <p style={{ margin: '0 0 12px 0', color: '#888', fontSize: '14px' }}>
                {content.excerpt.substring(0, 150)}...
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                fontSize: '12px', 
                color: '#999',
                alignItems: 'center'
              }}>
                <span>{content.category}</span>
                <span>{content.date}</span>
                <span>{content.readTime}</span>
                <span>By {content.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link 
          to="/"
          style={{
            padding: '12px 24px',
            background: '#1e40af',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            display: 'inline-block'
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ContentDemo;
