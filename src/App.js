import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import NewsSection from "./components/NewsSection";
import GallerySection from "./components/GallerySection";
import ImageModal from "./components/ImageModal";
import ContactSection from "./components/ContactSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useSlider } from "./hooks/useSlider";
import { useNews } from "./hooks/useNews";
import { useGallery } from "./hooks/useGallery";
import { useCarousel } from "./hooks/useCarousel";
import NewsPage from "./components/NewsPage";

function MainApp() {
  const sections = ["home", "services", "news", "gallery", "contact", "about"];
  const { activeSection, scrollY, setActiveSection } = useScrollSpy(sections);
  const { carouselData, loading: carouselLoading, error: carouselError } = useCarousel();
  const sliderProps = useSlider(carouselData.length);
  const newsProps = useNews();
  const galleryProps = useGallery();

  return (
    <div className="App">
      <Navigation 
        scrollY={scrollY} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      {/* Add a link to the News Page */}
      <nav style={{ margin: '1rem' }}>
        <Link to="/news">Go to News Page</Link>
      </nav>
      <HeroSection 
        {...sliderProps} 
        carouselData={carouselData}
        loading={carouselLoading}
        error={carouselError}
      />
      <ServicesSection />
      <NewsSection {...newsProps} />
      <GallerySection 
        selectedCategory={galleryProps.selectedCategory}
        setSelectedCategory={galleryProps.setSelectedCategory}
        filteredImages={galleryProps.filteredImages}
        categories={galleryProps.categories}
        galleries={galleryProps.galleries}
        openModal={galleryProps.openModal}
        loading={galleryProps.loading}
        error={galleryProps.error}
      />
      <ContactSection />
      <AboutSection />
      <Footer />
      <ImageModal 
        modalOpen={galleryProps.modalOpen}
        selectedImage={galleryProps.selectedImage}
        closeModal={galleryProps.closeModal}
        handleModalBackgroundClick={galleryProps.handleModalBackgroundClick}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/news" element={<NewsPage />} />
      <Route path="/content/:newsid" element={<NewsPage />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>
  );
}

export default App;
