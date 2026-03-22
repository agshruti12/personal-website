import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <FaCode />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">home</Link></li>
        <li><Link to="/portfolio">portfolio</Link></li>
        <li><Link to="/about">about me</Link></li>
        <li><Link to="/contact">contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; 