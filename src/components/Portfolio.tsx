import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProjectsByCategory, type Project } from '../data/projects';
import { FaAngleDoubleUp, FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


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

interface BrowserViewState {
  isOpen: boolean;
  selectedProjectId: string | null;
  currentImageIndex: number;
}

const Portfolio: FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [previewPosition, setPreviewPosition] = useState<PreviewPosition | null>(null);
  const [popup, setPopup] = useState<PopupState>({ isOpen: false, item: null, currentImageIndex: 0 });
  const [browserView, setBrowserView] = useState<BrowserViewState>({ isOpen: false, selectedProjectId: null, currentImageIndex: 0 });

  // Check for navigation state to set initial tab
  useEffect(() => {
    const state = location.state as { tab?: 'dark' | 'gallery' | 'light' } | null;
    if (state?.tab) {
      setTheme(state.tab);
    }
  }, [location.state, setTheme]);

  // Toggle body class when browser view is open to hide navbar
  useEffect(() => {
    if (browserView.isOpen) {
      document.body.classList.add('browser-view-open');
    } else {
      document.body.classList.remove('browser-view-open');
    }
    return () => {
      document.body.classList.remove('browser-view-open');
    };
  }, [browserView.isOpen]);

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
    setBrowserView({ isOpen: false, selectedProjectId: null, currentImageIndex: 0 });
    
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
    if (popup.item?.images && popup.item.images.length > 0) {
      const len = popup.item.images.length;
      setPopup(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex + 1) % len
      }));
    }
  };

  const handlePrevImage = () => {
    if (popup.item?.images && popup.item.images.length > 0) {
      const len = popup.item.images.length;
      setPopup(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex - 1 + len) % len
      }));
    }
  };

  const handleHacksProjectClick = (project: Project) => {
    setBrowserView({ isOpen: true, selectedProjectId: project.id, currentImageIndex: 0 });
  };

  const handleBrowserBack = () => {
    setBrowserView({ isOpen: false, selectedProjectId: null, currentImageIndex: 0 });
  };

  const handleTabClick = (projectId: string) => {
    setBrowserView(prev => ({ ...prev, selectedProjectId: projectId, currentImageIndex: 0 }));
  };

  const handleBrowserNextImage = () => {
    const selectedProject = hacksProjects.find(p => p.id === browserView.selectedProjectId);
    if (selectedProject?.images && selectedProject.images.length > 0) {
      const len = selectedProject.images.length;
      setBrowserView(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex + 1) % len
      }));
    }
  };

  const handleBrowserPrevImage = () => {
    const selectedProject = hacksProjects.find(p => p.id === browserView.selectedProjectId);
    if (selectedProject?.images && selectedProject.images.length > 0) {
      const len = selectedProject.images.length;
      setBrowserView(prev => ({
        ...prev,
        currentImageIndex: (prev.currentImageIndex - 1 + len) % len
      }));
    }
  };

  const handleBrowserThumbnailClick = (index: number) => {
    setBrowserView(prev => ({ ...prev, currentImageIndex: index }));
  };

  const hacksProjects = getProjectsByCategory('hacks');
  const selectedProject = hacksProjects.find(p => p.id === browserView.selectedProjectId);

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
      {theme === 'dark' && !browserView.isOpen && (
        <div className="hacks-grid">
          {hacksProjects.map((project, index) => (
            <div
              key={project.id}
              className="hacks-card"
              style={{ '--card-index': index } as React.CSSProperties}
              onClick={() => handleHacksProjectClick(project)}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
              }}
            >
              <div className="hacks-card-glow"></div>
              <div className="hacks-card-content">
                <div className="hacks-card-header">
                  <h3>{project.title}</h3>
                  <span className="hacks-card-arrow">→</span>
                </div>
                <p className="hacks-card-tagline">{project.tagline}</p>
                <div className="hacks-card-techs">
                  {project.technologies && project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="hacks-tech-pill">{tech}</span>
                  ))}
                  {project.technologies && project.technologies.length > 4 && (
                    <span className="hacks-tech-pill more">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Browser Window View for Hacks */}
      {theme === 'dark' && browserView.isOpen && selectedProject && (
        <div className="browser-window">
          {/* Browser Chrome */}
          <div className="browser-chrome">
            <div className="browser-controls">
              <button className="browser-control close" onClick={handleBrowserBack}></button>
              <span className="browser-control minimize"></span>
              <span className="browser-control maximize"></span>
            </div>
            
            {/* Browser Tabs */}
            <div className="browser-tabs">
              {hacksProjects.map((project) => (
                <button
                  key={project.id}
                  className={`browser-tab ${project.id === browserView.selectedProjectId ? 'active' : ''}`}
                  onClick={() => handleTabClick(project.id)}
                  title={project.title}
                >
                  <span className="tab-title">{project.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Address Bar */}
          <div className="browser-address-bar">
            <button className="address-back-btn" onClick={handleBrowserBack}>
              <FaArrowLeft />
            </button>
            <div className="address-input">
              <span className="address-protocol">https://</span>
              <span className="address-domain">agshruti.com/project/{selectedProject.title.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
          </div>

          {/* Browser Content */}
          <div className="browser-content">
            <div className="browser-page">
              {/* Title Section */}
              <section className="browser-section title-section">
                <h1 className="browser-project-title">{selectedProject.title}</h1>
                {selectedProject.tagline && <p className="browser-project-tagline">{selectedProject.tagline}</p>}
              </section>

              {/* Links Section */}
              {(selectedProject.githubUrl || selectedProject.liveUrl || (selectedProject.additionalLinks && selectedProject.additionalLinks.length > 0)) && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Links</h2>
                  <div className="browser-links-container">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="browser-project-link github">
                        <FaGithub />
                        <span>View on GitHub</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="browser-project-link live">
                        <FaExternalLinkAlt />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {selectedProject.additionalLinks && selectedProject.additionalLinks.map((link, index) => (
                      <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="browser-project-link additional">
                        <FaExternalLinkAlt />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Team Section */}
              {selectedProject.team.length > 0 && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Team</h2>
                  <div className="browser-team-members">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="browser-team-member">
                        <div className="browser-member-avatar">{member.initials}</div>
                        <div className="browser-member-info">
                          <span className="browser-member-name">{member.name}</span>
                          <span className="browser-member-role">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Overview Section */}
              {selectedProject.overview && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Overview</h2>
                  <p className="browser-section-text">{selectedProject.overview}</p>
                </section>
              )}

              {/* Technologies Section */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Tools & Technologies</h2>
                  <div className="browser-tools-grid">
                    {selectedProject.technologies.map((tech, index) => (
                      <div key={index} className="browser-tool-item">
                        <span className="browser-tool-name">{tech}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Implementation Section */}
              {selectedProject.implementation && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Implementation</h2>
                  <p className="browser-section-text">{selectedProject.implementation}</p>
                </section>
              )}

              {/* Pictures Section */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <section className="browser-section">
                  <h2 className="browser-section-heading">Pictures</h2>
                  <div className="browser-gallery-container">
                    <div className="browser-main-image-container">
                      <button className="browser-gallery-nav prev" onClick={handleBrowserPrevImage}>
                        <FaChevronLeft />
                      </button>
                      <div className="browser-main-image-wrapper">
                        <img
                          src={`${import.meta.env.BASE_URL}${selectedProject.images[browserView.currentImageIndex]}`}
                          alt={`${selectedProject.title} - Image ${browserView.currentImageIndex + 1}`}
                          className="browser-main-image"
                        />
                        <div className="browser-image-counter">
                          {browserView.currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </div>
                      <button className="browser-gallery-nav next" onClick={handleBrowserNextImage}>
                        <FaChevronRight />
                      </button>
                    </div>

                    {selectedProject.images.length > 1 && (
                      <div className="browser-thumbnail-strip">
                        {selectedProject.images.map((image, index) => (
                          <button
                            key={index}
                            className={`browser-thumbnail ${index === browserView.currentImageIndex ? 'active' : ''}`}
                            onClick={() => handleBrowserThumbnailClick(index)}
                          >
                            <img src={`${import.meta.env.BASE_URL}${image}`} alt={`Thumbnail ${index + 1}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

            </div>
          </div>
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
              click around!
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
                  {item.images && item.images.length > 0 && (
                    <img 
                      src={`${import.meta.env.BASE_URL}${item.images[0]}`} 
                      className="gallery-img"
                    />
                  )}
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
              {popup.item.images && popup.item.images.length > 0 && (
                <div className="popup-carousel-section">
                  <div className="carousel-container">
                    <button className="carousel-button prev" onClick={handlePrevImage}>‹</button>
                    <div className="carousel-image">
                      <img 
                        src={`${import.meta.env.BASE_URL}${popup.item.images[popup.currentImageIndex]}`} 
                        className="carousel-img"
                      />
                      <div className="image-counter">
                        {popup.currentImageIndex + 1} / {popup.item.images.length}
                      </div>
                    </div>
                    <button className="carousel-button next" onClick={handleNextImage}>›</button>
                  </div>
                </div>
              )}
              
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