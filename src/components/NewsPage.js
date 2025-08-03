import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublicContent } from "../services/api";
import { newsData } from "../data/newsData";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../news-styles.css";

function NewsPage() {
  const { newsid } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use local news data as fallback when API fails
  const fallbackNews = newsData;

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (newsid) {
          // For single article, try API first, then fallback to local data
          try {
            const items = await fetchPublicContent({ id: newsid });
            data = Array.isArray(items) ? items[0] : items;
          } catch (err) {
            // Fallback to local data for single article
            data =
              fallbackNews.find((item) => item.id === newsid) ||
              fallbackNews[0];
          }
        } else {
          // For news listing, try API first, then fallback to local data
          try {
            data = await fetchPublicContent({ type: "news" });
          } catch (err) {
            // Use local news data as fallback
            data = fallbackNews;
          }
        }
        setNews(data);
      } catch (err) {
        setError("Failed to fetch news.");
        // Use fallback data even on error
        setNews(newsid ? fallbackNews[0] : fallbackNews);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, [newsid]);

  if (newsid) {
    // Single article view - Full page layout
    return (
      <>
        <Navigation
          scrollY={0}
          activeSection="news"
          setActiveSection={() => {}}
        />

        {loading ? (
          <section className="enhanced-news-page">
            <div className="container">
              <div className="news-loading-state">
                <div className="loading-spinner-enhanced"></div>
                <p className="loading-text">Loading article...</p>
              </div>
            </div>
          </section>
        ) : error && !news ? (
          <section className="enhanced-news-page">
            <div className="container">
              <div className="news-error-state">
                <div className="error-icon">⚠</div>
                <h3>Unable to Load Article</h3>
                <p>{error}</p>
              </div>
            </div>
          </section>
        ) : !news ? (
          <section className="enhanced-news-page">
            <div className="container">
              <div className="news-not-found">
                <div className="not-found-icon">📰</div>
                <h3>Article Not Found</h3>
                <p>The requested news article could not be found.</p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Article Hero Section */}
            <section className="article-hero-section">
              <div className="container">
                <div className="news-breadcrumb">
                  <Link to="/news" className="breadcrumb-link">
                    <span className="breadcrumb-icon">←</span>
                    Back to News
                  </Link>
                </div>

                <article className="news-article">
                  <header className="article-header">
                    <h1 className="article-title">{news.title}</h1>
                    <div className="article-stats">
                      <span className="read-time">
                        {news.readTime || "5 min read"}
                      </span>
                    </div>
                  </header>
                </article>
              </div>
            </section>

            {/* Article Content Section */}
            <section className="article-content-section">
              <div className="article-content">
                {news.bodyHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: news.bodyHtml }} />
                ) : news.content ? (
                  <p className="content-paragraph">{news.content}</p>
                ) : news.excerpt ? (
                  <p className="content-paragraph">{news.excerpt}</p>
                ) : news.summary ? (
                  <p className="content-paragraph">{news.summary}</p>
                ) : news.body ? (
                  <p className="content-paragraph">{news.body}</p>
                ) : (
                  <div className="no-content-notice">
                    <p>No content available for this article.</p>
                  </div>
                )}

                {/* Additional content paragraphs for demo */}
                {news.excerpt && (
                  <>
                    <p className="content-paragraph">
                      This development represents a significant step forward in
                      our ongoing commitment to modernizing Iran's financial
                      infrastructure. The new system incorporates advanced
                      security protocols and real-time processing capabilities
                      that will enhance the overall efficiency of market
                      operations.
                    </p>
                    <p className="content-paragraph">
                      Our technical teams have worked tirelessly to ensure
                      seamless integration with existing systems while providing
                      enhanced functionality for all market participants. The
                      implementation reflects our dedication to maintaining
                      Iran's position as a leader in financial technology
                      innovation within the region.
                    </p>
                    <p className="content-paragraph">
                      Looking ahead, this initiative aligns with our strategic
                      vision for digital transformation and sets the foundation
                      for future enhancements to the financial ecosystem. We
                      remain committed to delivering cutting-edge solutions that
                      serve the evolving needs of our stakeholders.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Article Footer Section */}
            <section className="article-footer-section">
              <div className="article-footer">
                <div className="article-actions">
                  <button className="share-button">Share Article</button>
                  <button className="bookmark-button">Bookmark</button>
                </div>
              </div>
            </section>
          </>
        )}

        <Footer />
      </>
    );
  }

  // Main news portal view
  return (
    <>
      <Navigation
        scrollY={0}
        activeSection="news"
        setActiveSection={() => {}}
      />

      {/* News Hero Section */}
      <section className="news-hero-section">
        <div className="container">
          <div className="news-hero-content">
            <div className="hero-badge">
              <span className="hero-badge-text">Latest News</span>
            </div>
            <h1 className="news-hero-title">Corporate News & Announcements</h1>
            <p className="news-hero-description">
              Stay informed with the latest developments, strategic initiatives,
              and market insights from Central Securities Depository of Iran
            </p>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="featured-news-section">
        <div className="container">
          {loading ? (
            <div className="news-loading-state">
              <div className="loading-spinner-enhanced"></div>
              <p className="loading-text">Loading latest news...</p>
            </div>
          ) : error && !news ? (
            <div className="news-error-state">
              <div className="error-icon">⚠</div>
              <h3>Unable to Load News</h3>
              <p>{error}</p>
            </div>
          ) : !news || news.length === 0 ? (
            <div className="no-news-state">
              <div className="no-news-icon">📰</div>
              <h3>No News Available</h3>
              <p>Check back later for the latest updates and announcements.</p>
            </div>
          ) : (
            <>
              {/* Hero Article */}
              <div className="hero-article-container">
                <article className="hero-article">
                  <Link
                    to={`/content/${news[0].id || "1"}`}
                    className="hero-article-link"
                  >
                    <div className="hero-article-image">
                      <div className="hero-image-placeholder">
                        <span className="hero-placeholder-icon">
                          {news[0].icon || "■"}
                        </span>
                      </div>
                      <div className="hero-article-overlay">
                        <span className="hero-category">
                          {news[0].category}
                        </span>
                        <time className="hero-date">{news[0].date}</time>
                      </div>
                    </div>
                    <div className="hero-article-content">
                      <h2 className="hero-article-title">{news[0].title}</h2>
                      <p className="hero-article-excerpt">{news[0].excerpt}</p>
                      <div className="hero-article-meta">
                        <span className="hero-read-time">
                          {news[0].readTime}
                        </span>
                        <span className="hero-arrow">Read Full Story →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              </div>

              {/* News Grid */}
              <div className="news-main-grid">
                <div className="news-grid-primary">
                  <h3 className="section-subtitle">Recent Updates</h3>
                  <div className="news-articles-grid">
                    {news.slice(1, 4).map((item, index) => (
                      <article
                        key={item.id || index}
                        className="news-article-card"
                      >
                        <Link
                          to={`/content/${item.id || index + 2}`}
                          className="article-card-link"
                        >
                          <div className="article-card-image">
                            <div className="article-image-placeholder">
                              <span className="article-placeholder-icon">
                                {item.icon || "●"}
                              </span>
                            </div>
                            <div className="article-card-overlay">
                              <span className="article-card-category">
                                {item.category}
                              </span>
                            </div>
                          </div>
                          <div className="article-card-content">
                            <h4 className="article-card-title">{item.title}</h4>
                            <p className="article-card-excerpt">
                              {item.excerpt}
                            </p>
                            <div className="article-card-footer">
                              <time className="article-card-date">
                                {item.date}
                              </time>
                              <span className="article-card-read-time">
                                {item.readTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="news-sidebar">
                  <div className="sidebar-section">
                    <h3 className="sidebar-title">Breaking News</h3>
                    <div className="breaking-news-list">
                      {news.slice(0, 3).map((item, index) => (
                        <div
                          key={item.id || index}
                          className="breaking-news-item"
                        >
                          <Link
                            to={`/content/${item.id || index + 1}`}
                            className="breaking-news-link"
                          >
                            <span className="breaking-news-icon">
                              {item.icon || "■"}
                            </span>
                            <div className="breaking-news-content">
                              <h4 className="breaking-news-title">
                                {item.title}
                              </h4>
                              <time className="breaking-news-date">
                                {item.date}
                              </time>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-section">
                    <h3 className="sidebar-title">Quick Stats</h3>
                    <div className="news-stats">
                      <div className="stat-box">
                        <span className="stat-number">24</span>
                        <span className="stat-label">This Month</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-number">156</span>
                        <span className="stat-label">Total Articles</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-number">4.2M</span>
                        <span className="stat-label">Readers</span>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-section">
                    <h3 className="sidebar-title">Categories</h3>
                    <div className="news-categories">
                      <a href="#" className="category-link active">
                        All News
                      </a>
                      <a href="#" className="category-link">
                        Corporate
                      </a>
                      <a href="#" className="category-link">
                        System Launch
                      </a>
                      <a href="#" className="category-link">
                        Development
                      </a>
                      <a href="#" className="category-link">
                        Milestone
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* More News Section */}
              {news.length > 4 && (
                <div className="more-news-section">
                  <h3 className="section-subtitle">More Stories</h3>
                  <div className="more-news-grid">
                    {news.slice(4).map((item, index) => (
                      <article
                        key={item.id || index + 5}
                        className="more-news-item"
                      >
                        <Link
                          to={`/content/${item.id || index + 5}`}
                          className="more-news-link"
                        >
                          <span className="more-news-icon">
                            {item.icon || "▲"}
                          </span>
                          <div className="more-news-content">
                            <h4 className="more-news-title">{item.title}</h4>
                            <p className="more-news-excerpt">{item.excerpt}</p>
                            <div className="more-news-meta">
                              <time className="more-news-date">
                                {item.date}
                              </time>
                              <span className="more-news-category">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default NewsPage;
