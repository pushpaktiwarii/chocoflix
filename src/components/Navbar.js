import { useState, useEffect } from 'react';
import { profile } from '../data/content';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="left-section">
        <div className="logo">CHOCOFLIX</div>
        <div className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">Memories</a>
          <a href="#">Trips</a>
          <a href="#">Funny Moments</a>
          <a href="#">Squad List</a>
        </div>
      </div>

      <div className="right-section">
        <span className="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="nav-icon">
            <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="avatar-box">
          <img src={profile.avatar} alt="Profile" />
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          height: 68px;
          padding: 0 4%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0));
          transition: background-color 0.4s;
          font-size: 14px;
        }

        .navbar.scrolled {
          background-color: #141414;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo {
          color: var(--primary);
          font-size: 1.8rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 1.2rem;
        }

        .nav-links a {
          color: #e5e5e5;
          transition: color 0.3s;
          font-weight: 500;
        }
        .nav-links a:hover {
          color: #b3b3b3;
        }
        .nav-links a.active {
          color: white;
          font-weight: 700;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .icon {
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .avatar-box {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
        }
        .avatar-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 850px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
}
