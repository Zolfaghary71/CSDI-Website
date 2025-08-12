import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublicContent } from "../services/api";
import { newsData } from "../data/newsData";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../content-detail-styles.css";

function ContentDetailPage() {
  const { newsid } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fallbackNews = newsData;

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (newsid) {
          try {
            const items = await fetchPublicContent({ id: newsid });
            data = Array.isArray(items) ? items[0] : items;
          } catch (err) {
            data =
              fallbackNews.find((item) => item.id === newsid) ||
              fallbackNews[parseInt(newsid) - 1] ||
              fallbackNews[0];
          }
        } else {
          data = fallbackNews[0];
        }
        setContent(data);
      } catch (err) {
        setError("Failed to load content.");
        setContent(fallbackNews[0]);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [newsid]);

  if (loading) {
    return (
      <>
        <Navigation
          scrollY={0}
          activeSection="content"
          setActiveSection={() => {}}
        />
        <section className="content-detail-container">
          <div className="content-loading-state">
            <div className="loading-spinner-professional"></div>
            <p className="loading-text-professional">Loading content...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error && !content) {
    return (
      <>
        <Navigation
          scrollY={0}
          activeSection="content"
          setActiveSection={() => {}}
        />
        <section className="content-detail-container">
          <div className="content-error-state">
            <div className="error-icon-professional">⚠</div>
            <h3>Content Unavailable</h3>
            <p>{error}</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!content) {
    return (
      <>
        <Navigation
          scrollY={0}
          activeSection="content"
          setActiveSection={() => {}}
        />
        <section className="content-detail-container">
          <div className="content-not-found">
            <div className="not-found-icon-professional">📄</div>
            <h3>Content Not Found</h3>
            <p>The requested content could not be located.</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation
        scrollY={0}
        activeSection="content"
        setActiveSection={() => {}}
      />

      {/* Executive Header Section */}
      <section className="executive-header-section">
        <div className="header-background-pattern"></div>
        <div className="container">
          <div className="executive-navigation">
            <Link to="/news" className="executive-back-link">
              <span className="back-arrow">←</span>
              <span>Back to News Center</span>
            </Link>
            <div className="header-meta-info">
              <span className="publication-date">{content.date}</span>
              <span className="content-category">{content.category}</span>
            </div>
          </div>

          <header className="executive-content-header">
            <div className="institutional-badge">
              <span className="institution-name">Central Securities Depository of Iran</span>
              <span className="badge-separator">|</span>
              <span className="content-type">Official Announcement</span>
            </div>
            
            <h1 className="executive-title">{content.title}</h1>
            
            <div className="executive-subtitle">
              <p className="content-summary">{content.excerpt}</p>
            </div>

            <div className="executive-meta">
              <div className="reading-time">
                <span className="meta-icon">📖</span>
                <span>{content.readTime || "5 min read"}</span>
              </div>
              <div className="content-classification">
                <span className="meta-icon">🏛️</span>
                <span>Corporate Communication</span>
              </div>
              <div className="distribution-scope">
                <span className="meta-icon">🌐</span>
                <span>Public Release</span>
              </div>
            </div>
          </header>
        </div>
      </section>

      {/* Professional Content Section */}
      <section className="professional-content-section">
        <div className="container">
          <div className="content-layout">
            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Quick Overview</h3>
                <div className="overview-items">
                  <div className="overview-item">
                    <span className="overview-label">Category</span>
                    <span className="overview-value">{content.category}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Published</span>
                    <span className="overview-value">{content.date}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Reading Time</span>
                    <span className="overview-value">{content.readTime || "5 min read"}</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-title">Share This Content</h3>
                <div className="share-options">
                  <button className="share-btn share-email">
                    <span>📧</span>
                    <span>Email</span>
                  </button>
                  <button className="share-btn share-download">
                    <span>📎</span>
                    <span>Download PDF</span>
                  </button>
                  <button className="share-btn share-bookmark">
                    <span>🔖</span>
                    <span>Bookmark</span>
                  </button>
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-title">Related Content</h3>
                <div className="related-items">
                  {fallbackNews.slice(0, 3).map((item, index) => (
                    <Link
                      key={index}
                      to={`/content/${index + 1}`}
                      className="related-item"
                    >
                      <div className="related-icon">{item.icon}</div>
                      <div className="related-content">
                        <h4 className="related-title">{item.title}</h4>
                        <span className="related-date">{item.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            <main className="content-main">
              <article className="executive-article">
                <div className="article-content">
                  {content.bodyHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
                  ) : (
                    <>
                      <div className="content-lead">
                        <p>{content.excerpt}</p>
                      </div>
                      
                      <div className="content-body">
                        <h2 className="section-heading">Executive Summary</h2>
                        <p className="content-paragraph">
                          This strategic initiative represents a significant advancement in Central Securities Depository of Iran's 
                          commitment to modernizing the nation's financial infrastructure. The implementation demonstrates our 
                          unwavering dedication to technological excellence and operational efficiency in serving Iran's capital markets.
                        </p>

                        <h2 className="section-heading">Strategic Impact</h2>
                        <p className="content-paragraph">
                          The development aligns with our comprehensive digital transformation strategy, incorporating state-of-the-art 
                          security protocols and real-time processing capabilities. This enhancement will significantly improve operational 
                          efficiency while maintaining the highest standards of regulatory compliance and risk management.
                        </p>

                        <div className="highlight-box">
                          <h3 className="highlight-title">Key Implementation Benefits</h3>
                          <ul className="highlight-list">
                            <li>Enhanced operational efficiency and processing speed</li>
                            <li>Strengthened security protocols and risk management</li>
                            <li>Improved regulatory compliance and reporting capabilities</li>
                            <li>Advanced technological infrastructure for future scalability</li>
                          </ul>
                        </div>

                        <h2 className="section-heading">Forward-Looking Perspective</h2>
                        <p className="content-paragraph">
                          This initiative establishes a robust foundation for continued innovation in Iran's financial ecosystem. 
                          Our commitment to delivering cutting-edge solutions ensures that we remain at the forefront of financial 
                          technology advancement, serving the evolving needs of market participants and stakeholders across the region.
                        </p>

                        <p className="content-paragraph">
                          The successful implementation reflects our institution's strategic vision and operational excellence, 
                          reinforcing our position as the leading financial infrastructure provider in Iran's capital markets.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="article-footer-professional">
                  <div className="institutional-signature">
                    <div className="signature-content">
                      <h4>Central Securities Depository of Iran</h4>
                      <p>Official Corporate Communication</p>
                      <div className="contact-info">
                        <span>For inquiries: info@csdiran.ir</span>
                        <span>|</span>
                        <span>Tel: +98 21 8888 0000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ContentDetailPage;
