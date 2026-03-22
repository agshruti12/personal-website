import type { FC } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Home: FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="intro-text">
            <h3>hey there! i'm </h3>
          <h1 className="greeting">
            <TypeAnimation
              sequence={[
                'shruti agarwal.',
                3000,
                'a technologist.',
                2000,
                'a photojournalist.',
                2000,
                'a hobbyist.',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </h1>
          <div className="bio">
            
            <p>
            this website is an online showcase of sorts, keeping record of my personal projects, ranging from hacking, to artwork/photography, to blogging!
            </p>
          </div>
          <div className="social-buttons">
            <a href="https://linkedin.com/in/agshruti" target="_blank" rel="noopener noreferrer" className="social-button">
              <FaLinkedin />
            </a>
            <a href="https://github.com/agshruti12" target="_blank" rel="noopener noreferrer" className="social-button">
              <FaGithub />
            </a>
            {/* <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-button">
              <FaTwitter />
            </a> */}
          </div>
        </div>
        <div className="home-image">
          {/* Add your image here */}
        </div>
      </div>
    </div>
  );
};

export default Home; 