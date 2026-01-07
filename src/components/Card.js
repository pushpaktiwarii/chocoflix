export default function Card({ item, isLarge }) {
  return (
    <div className="card-container">
      <div className="card">
        <img
          src={item.image}
          alt={item.title}
          className="card-image"
        />
        <div className="card-info">
          <div className="card-actions">
            <span className="action-btn">▶</span>
            <span className="action-btn">+</span>
            <span className="action-btn">👍</span>
          </div>
          <h4>{item.title}</h4>
          <div className="meta-tags">
            <span className="match">98% Match</span>
            <span className="age">18+</span>
            <span>1h 20m</span>
          </div>
          <div className="genres">
            <span>Personal</span>
            <span className="separator">•</span>
            <span>Vlog</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          width: 280px; /* Specific width for 16:9 feel */
          height: 157px; /* 16:9 Ratio */
          margin-right: 8px; /* Netflix Gap */
          flex-shrink: 0;
          position: relative;
          transition: z-index 0s 0.3s; /* Delay z-index reset so it doesn't clip */
        }

        .card-container:hover {
          z-index: 99;
          transition-delay: 0s;
        }

        .card {
          width: 100%;
          height: 100%;
          background-color: #141414;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center center;
        }

        .card-container:hover .card {
          transform: scale(1.5);
          box-shadow: 0 10px 20px rgba(0,0,0,0.8);
          border-radius: 6px;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .card-info {
           position: absolute;
           bottom: 0;
           left: 0;
           right: 0;
           padding: 12px;
           background: #141414;
           opacity: 0;
           transform: translateY(100%); /* Hidden initially */
           transition: opacity 0.2s, transform 0s;
           display: flex;
           flex-direction: column;
           gap: 6px;
           border-bottom-left-radius: 6px;
           border-bottom-right-radius: 6px;
        }
        
        /* Netflix Expansion Effect hack: 
           The image stays, and info block appears below it. 
           In this simple version, we just overlay. 
           For true Netflix style, we'd need to expand the height of the card.
        */
        
        .card-container:hover .card {
           height: auto; /* Allow growth */
        }
        
        .card-container:hover .card-image {
           height: 157px; /* Keep image height fixed */
        }

        .card-container:hover .card-info {
           opacity: 1;
           position: relative; /* Flows below image */
           transform: translateY(0);
        }

        .card-actions {
          display: flex;
          gap: 10px;
          margin-bottom: 5px;
        }
        
        .action-btn {
          width: 24px;
          height: 24px;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          background: rgba(42,42,42,0.6);
        }
        
        .action-btn:hover {
          border-color: white;
          background: white;
          color: black;
        }
        
        .action-btn:first-child {
           background: white;
           color: black;
           border: none;
        }

        h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
        }

        .meta-tags {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: bold;
        }
        
        .match { color: #46d369; }
        .age { border: 1px solid rgba(255,255,255,0.4); padding: 0 4px; font-weight: normal; }

        .genres {
           display: flex;
           gap: 5px;
           font-size: 0.7rem;
           color: #fff;
        }
        .separator { color: #666; }
      `}</style>
    </div>
  );
}
