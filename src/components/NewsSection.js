import React from 'react';

const NewsSection = ({ newsData, newsLoading, newsError, fetchNewsData }) => {
  return (
    <section className="corporate-news" id="news">
      <div className="container">
        <div className="section-header-corporate">
          <h2 className="section-title-corporate">
            Recent Developments & Market Announcements
          </h2>
        </div>

        <div className="news-executive-layout">
          <div className="featured-communication">
            <div className="executive-announcement">
              <div className="announcement-header">
                <span className="announcement-symbol">■</span>
                <div className="announcement-classification">
                  <span className="classification-tag">Major Development</span>
                </div>
              </div>
              <div className="announcement-content">
                <h3>
                  {newsData.length > 0
                    ? newsData[0].title
                    : 'CSDI Leads Market Infrastructure Modernization'}
                </h3>
                <p>
                  {newsData.length > 0
                    ? newsData[0].excerpt
                    : 'The Central Securities Depository of Iran continues advancing Iran\'s capital market infrastructure through strategic digital transformation initiatives, including T+1 settlement cycle implementation and enhanced electronic services for all market participants.'}
                </p>
                <div className="announcement-metadata">
                  <span className="publication-date">
                    {newsData.length > 0 ? newsData[0].date : 'November 2024'}
                  </span>
                  <span className="document-classification">
                    {newsData.length > 0
                      ? newsData[0].category
                      : 'Strategic Initiative'}
                  </span>
                </div>
                <button className="btn-full-statement">Read More →</button>
              </div>
            </div>
          </div>

          <div className="institutional-updates">
            {newsLoading ? (
              <div className="news-loading">
                <div className="loading-spinner"></div>
                <p>Loading latest news...</p>
              </div>
            ) : newsError ? (
              <div className="news-error">
                <p>Error: {newsError}</p>
                <button onClick={fetchNewsData} className="retry-button">
                  Retry
                </button>
              </div>
            ) : null}

            {newsData.length > 0 ? (
              <>
                {newsData.slice(1).map((item, index) => (
                  <article key={item.id || index} className="update-module">
                    <div className="update-header">
                      <span className="update-category">{item.category}</span>
                    </div>
                    <h3 className="update-title">{item.title}</h3>
                    <p className="update-summary">{item.excerpt}</p>
                    <div className="update-metadata">
                      <div className="publication-info">
                        <span className="publication-date">{item.date}</span>
                        <span className="reading-duration">{item.readTime}</span>
                      </div>
                      <button className="update-access">→</button>
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <div className="no-news">
                <p>No news items available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
