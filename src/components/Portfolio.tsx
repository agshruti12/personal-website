import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProjectsByCategory, type Project } from '../data/projects';
import { FaAngleDoubleUp, FaGithub, } from 'react-icons/fa';


interface GalleryItem extends Project {
  position: { x: number; y: number };
  isVisible: boolean;
}

interface PreviewPosition {
  x: number;
  y: number;
  isValid: boolean;
}

interface PopupState {
  isOpen: boolean;
  item: Project | null;
  currentImageIndex: number;
}

const Portfolio: FC = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition | null>(null);
  const [popup, setPopup] = useState<PopupState>({ isOpen: false, item: null, currentImageIndex: 0 });

  // Check for navigation state to set initial tab
  useEffect(() => {
    const state = location.state as { tab?: 'dark' | 'gallery' | 'light' } | null;
    if (state?.tab) {
      setTheme(state.tab);
    }
  }, [location.state, setTheme]);

  // Initialize gallery items based on theme
  useEffect(() => {
    if (theme === 'gallery') {
      const clicksProjects = getProjectsByCategory('clicks');
      const galleryItems: GalleryItem[] = clicksProjects.map(project => ({
        ...project,
        position: { x: 0, y: 0 },
        isVisible: false
      }));
      setGalleryItems(galleryItems);
      setNextItemIndex(0);
    }
  }, [theme]);

  // Reset theme when component unmounts
  useEffect(() => {
    return () => {
      setTheme('light');
    };
  }, [setTheme]);

  const handleSectionClick = (section: 'dark' | 'gallery' | 'light') => {
    if (section === 'dark') {
      setIsTransitioning(true);
      setTimeout(() => {
        setTheme('dark');
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 500);
    } else {
      setTheme(section);
      setIsTransitioning(false);
    }
  };

  const checkOverlap = (x: number, y: number): boolean => {
    const ITEM_WIDTH = 200;
    const ITEM_HEIGHT = 250;
    const SAFETY_MARGIN = 20;

    return galleryItems.some(item => {
      if (!item.isVisible || !item.position) return false;

      const itemX = (item.position.x / 100) * window.innerWidth;
      const itemY = (item.position.y / 100) * window.innerHeight;
      const newX = (x / 100) * window.innerWidth;
      const newY = (y / 100) * window.innerHeight;

      const horizontalOverlap = Math.abs(itemX - newX) < (ITEM_WIDTH + SAFETY_MARGIN);
      const verticalOverlap = Math.abs(itemY - newY) < (ITEM_HEIGHT + SAFETY_MARGIN);

      return horizontalOverlap && verticalOverlap;
    });
  };

  const handleGalleryMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (nextItemIndex >= galleryItems.length) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPreviewPosition({
      x,
      y,
      isValid: !checkOverlap(x, y)
    });
  };

  const handleGalleryMouseLeave = () => {
    setPreviewPosition(null);
  };

  const handleGalleryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (nextItemIndex < galleryItems.length) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      if (!checkOverlap(x, y)) {
        setGalleryItems(prev => 
          prev.map((item, index) => 
            index === nextItemIndex ? { ...item, position: { x, y }, isVisible: true } : item
          )
        );
        setNextItemIndex(prev => prev + 1);
      }
    }
  };

  const handleGalleryItemClick = (event: React.MouseEvent<HTMLDivElement>, item: Project) => {
    event.stopPropagation();
    setPopup({ isOpen: true, item, currentImageIndex: 0 });
  };

  const handlePopupClose = () => {
    setPopup({ isOpen: false, item: null, currentImageIndex: 0 });
  };

  const handleNextImage = () => {
    if (popup.item) {
      setPopup(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex + 1) % prev.item!.images.length
      }));
    }
  };

  const handlePrevImage = () => {
    if (popup.item) {
      setPopup(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex - 1 + prev.item!.images.length) % prev.item!.images.length
      }));
    }
  };

  const handleHacksProjectClick = (project: Project) => {
    navigate(`/project/${project.id}`);
  };

  return (
    <section id="portfolio" className="section">
      <h2 className="section-title">portfolio</h2>
      <div className="portfolio-sections">
        <button 
          className={`section-button ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => handleSectionClick('dark')}
        >
          hacks
        </button>
        <button 
          className={`section-button ${theme === 'gallery' ? 'active' : ''}`}
          onClick={() => handleSectionClick('gallery')}
        >
          clicks
        </button>
        <button 
          className={`section-button ${theme === 'light' ? 'active' : ''}`}
          onClick={() => handleSectionClick('light')}
        >
          docs
        </button>
      </div>
      {isTransitioning && <div className="theme-transition-overlay"></div>}
      {theme === 'dark' && (
        <div className="gallery-grid">
          {getProjectsByCategory('hacks').map((project) => (
            <div 
              key={project.id} 
              className="gallery-item clickable"
              onClick={() => handleHacksProjectClick(project)}
            >
              <div className="gallery-image">
                <img 
                  src={project.images[0]} 
                  className="gallery-img"
                />
              </div>
              <div className="gallery-caption">
                <h3>{project.title}</h3>
                <p>{project.tagline}</p>
                <div className="project-technologies-caption">
                  {project.technologies && project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {theme === 'gallery' && (
        <div 
          className="clicks-gallery" 
          onClick={handleGalleryClick}
          onMouseMove={handleGalleryMouseMove}
          onMouseLeave={handleGalleryMouseLeave}
        >
          {nextItemIndex < galleryItems.length && (
            <div className="click-prompt">
              keep going!
            </div>
          )}
          {previewPosition && (
            <div 
              className={`preview-box ${previewPosition.isValid ? 'valid' : 'invalid'}`}
              style={{
                left: `${previewPosition.x}%`,
                top: `${previewPosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
          {galleryItems.map((item) => (
            item.isVisible && item.position && (
              <div
                key={item.id}
                className="gallery-item"
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => handleGalleryItemClick(e, item)}
              >
                <div className="gallery-image">
                  <img 
                    src={item.images[0]} 
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-caption">
                  <h3>{item.title}</h3>
                  <p>{item.tagline}</p>
                </div>
              </div>
            )
          ))}
        </div>
      )}
      {theme === 'light' && (
        <div className="coming-soon">
          <h2>coming soon...</h2>
          <p>need to consult my creativity</p>
        </div>
      )}
      {/* Popup for clicks only */}
      {popup.isOpen && popup.item && theme === 'gallery' && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={handlePopupClose}>×</button>
            
            <div className="popup-layout">
              {/* Left side - Image carousel */}
              <div className="popup-carousel-section">
                <div className="carousel-container">
                  <button className="carousel-button prev" onClick={handlePrevImage}>‹</button>
                  <div className="carousel-image">
                    <img 
                      src={popup.item.images[popup.currentImageIndex]} 
                      className="carousel-img"
                    />
                    <div className="image-counter">
                      {popup.currentImageIndex + 1} / {popup.item.images.length}
                    </div>
                  </div>
                  <button className="carousel-button next" onClick={handleNextImage}>›</button>
                </div>
              </div>
              
              {/* Right side - Text details */}
              <div className="popup-details">
                <div className="popup-header">
                  <h2>{popup.item.title}</h2>
                  {(popup.item.githubUrl || popup.item.liveUrl) && (
                    <div className="project-links">
                      <div className="link-buttons">
                        {popup.item.githubUrl && (
                          <a href={popup.item.githubUrl} target="_blank" rel="noopener noreferrer" className="link-button">
                            <FaGithub />
                          </a>
                        )}
                        {popup.item.liveUrl && (
                          <a href={popup.item.liveUrl} target="_blank" rel="noopener noreferrer" className="link-button">
                            <FaAngleDoubleUp />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <p>{popup.item.overview}</p>

                {popup.item.technologies && 
                  <div className="project-technologies">
                    <div className="tech-tags">
                      {popup.item.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio; 