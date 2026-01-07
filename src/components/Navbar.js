import { useState, useEffect } from 'react';

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
        <div className="logo">MEMORIESFLIX</div>
        <div className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">Series</a>
          <a href="#">Movies</a>
          <a href="#">Originals</a>
          <a href="#">My List</a>
        </div>
      </div>

      <div className="right-section">
        <span className="icon">🔍</span>
        <span className="icon">🔔</span>
        <div className="avatar-box">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
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
