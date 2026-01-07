export default function Hero({ content, onMoreInfoClick }) {
  return (
    <header className="hero" style={{
      backgroundImage: `url("${content.image}")`
    }}>
      <div className="hero-content">
        <h1 className="hero-title">{content.title}</h1>

        <div className="meta-data">
          <span className="match-score">{content.match}</span>
          <span className="year">{content.year}</span>
          <span className="maturity-rating">{content.maturity}</span>
          <span className="seasons">{content.duration}</span>
        </div>

        <div className="top-10-badge">
          <span className="top-10-icon">TOP 10</span>
          <span className="top-10-text">{content.badge}</span>
        </div>

        <p className="hero-desc">{content.description}</p>

        <div className="hero-btns">
          <button className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-play">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
            Play
          </button>
          <button className="btn btn-secondary" onClick={onMoreInfoClick}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon-info">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8 8 8z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div className="hero-fade-bottom" />

      <style jsx>{`
        .hero {
          position: relative;
          height: 90vh;
          background-size: cover;
          background-position: center center;
          color: white;
        }

        .hero-content {
          padding-top: 10px;
          height: 100%;
          padding-left: 4%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40%;
          background: linear-gradient(90deg, #141414 10%, transparent 90%); /* Side vignette */
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .meta-data {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          font-weight: 500;
          font-size: 1rem;
        }

        .match-score { color: #46d369; font-weight: bold; }
        .maturity-rating { border: 1px solid rgba(255,255,255,0.4); padding: 0 0.4rem; font-size: 0.8rem; }
        
        .top-10-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .top-10-icon {
          background: #db202c;
          color: white;
          font-size: 0.7rem;
          padding: 2px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          font-weight: 900;
          border-radius: 2px;
        }

        .hero-desc {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
        }

        .hero-btns {
          display: flex;
          gap: 1rem;
        }

        .btn {
          border: none;
          outline: none;
          padding: 0.6rem 1.6rem;
          border-radius: 4px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          transition: all 0.2s;
        }

        /* Netflix White Play Button */
        .btn-primary {
          background-color: white;
          color: black;
        }
        .btn-primary:hover {
          background-color: rgba(255, 255, 255, 0.75);
        }

        /* Netflix Gray Info Button */
        .btn-secondary {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
        }
        .btn-secondary:hover {
          background-color: rgba(109, 109, 110, 0.4);
        }

        .icon-play, .icon-info {
           width: 1.4rem;
           height: 1.4rem;
        }

        .hero-fade-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 10rem;
          background-image: linear-gradient(180deg, transparent, rgba(20,20,20,0.61), #141414);
        }

        @media (max-width: 768px) {
          .hero-content { width: 100%; background: linear-gradient(0deg, #141414 20%, transparent); justify-content: flex-end; padding-bottom: 30%; }
          .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </header>
  );
}
