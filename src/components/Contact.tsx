import type { FC } from 'react';

const Contact: FC = () => {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      <div className="container">
        <p>
          I'm always interested in hearing about new projects and opportunities.
          Feel free to reach out through any of the following channels:
        </p>
        <div className="contact-links">
          <a href="mailto:your.email@example.com">Email</a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 