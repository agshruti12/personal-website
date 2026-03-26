import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getProjectById, type Project } from '../data/projects';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/ProjectPage.css';

const ProjectPage: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Set dark theme when component mounts
  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load project data
  useEffect(() => {
    if (projectId) {
      const foundProject = getProjectById(projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/portfolio', { state: { tab: 'dark' } });
      }
    }
  }, [projectId, navigate]);

  const handleNextImage = () => {
    if (project?.images && project.images.length > 0) {
      const len = project.images.length;
      setCurrentImageIndex((prev) => (prev + 1) % len);
    }
  };

  const handlePrevImage = () => {
    if (project?.images && project.images.length > 0) {
      const len = project.images.length;
      setCurrentImageIndex((prev) => (prev - 1 + len) % len);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!project) {
    return (
      <div className="project-page">
        <div className="project-page-loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page">
      <div className="project-page-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/portfolio', { state: { tab: 'dark' } })}>
          <FaArrowLeft /> Back to Portfolio
        </button>

        {/* Section 1: Title */}
        <section className="project-section title-section">
          <h1 className="project-title">{project.title}</h1>
          {project.tagline && <p className="project-tagline">{project.tagline}</p>}
        </section>

        {/* Section 2: Team */}
        {project.team.length > 0 && (
          <section className="project-section team-section">
            <h2 className="section-heading">Team</h2>
            <div className="section-content">
              <div className="team-members">
                {project.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className="member-avatar">{member.initials}</div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Overview */}
        {project.overview && (
          <section className="project-section overview-section">
            <h2 className="section-heading">Overview</h2>
            <div className="section-content">
              <p>{project.overview}</p>
            </div>
          </section>
        )}

        {/* Section 4: Tools & Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="project-section tools-section">
            <h2 className="section-heading">Tools & Technologies</h2>
            <div className="section-content">
              <div className="tools-grid">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="tool-item">
                    <span className="tool-name">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Implementation */}
        {project.implementation && (
          <section className="project-section implementation-section">
            <h2 className="section-heading">Implementation</h2>
            <div className="section-content">
              <p>{project.implementation}</p>
            </div>
          </section>
        )}

        {/* Section 6: Pictures */}
        {project.images && project.images.length > 0 && (
          <section className="project-section pictures-section">
            <h2 className="section-heading">Pictures</h2>
            <div className="section-content">
              <div className="gallery-container">
                <div className="main-image-container">
                  <button className="gallery-nav-button prev" onClick={handlePrevImage}>
                    <FaChevronLeft />
                  </button>
                  <div className="main-image-wrapper">
                    <img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="main-image"
                    />
                    <div className="image-counter">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  </div>
                  <button className="gallery-nav-button next" onClick={handleNextImage}>
                    <FaChevronRight />
                  </button>
                </div>

                {/* Thumbnail Strip */}
                {project.images.length > 1 && (
                  <div className="thumbnail-strip">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Section 7: Additional Links */}
        {(project.githubUrl || project.liveUrl || (project.additionalLinks && project.additionalLinks.length > 0)) && (
          <section className="project-section links-section">
            <h2 className="section-heading">Additional Links</h2>
            <div className="section-content">
              <div className="links-container">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link github">
                    <FaGithub />
                    <span>View on GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.additionalLinks && project.additionalLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link additional">
                    <FaExternalLinkAlt />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
