import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function Card({ item, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  // Fallback data
  const matchScore = item.match || "98% Match";
  const tag = item.tag || "Nostalgia";

  const muxThumbnail = item.playbackId
    ? `https://image.mux.com/${item.playbackId}/thumbnail.png?width=400&height=560&fit_mode=crop`
    : null;
  const displayImage = item.image || muxThumbnail;

  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(item)}
    >
      <div className="card">
        <div className="image-wrapper">
          {isHovered && item.playbackId ? (
            <MuxPlayer
              playbackId={item.playbackId}
              streamType="on-demand"
              autoPlay
              muted
              loop
              controls={false} // Clean hover, no controls
              style={{
                height: '100%',
                width: '100%',
                '--media-object-fit': 'cover',
                '--media-object-position': 'center',
                '--controls': 'none',
                '--media-control-bar-display': 'none',
                '--media-center-play-button-display': 'none',
                pointerEvents: 'none', // Ensure clicks go to card
              }}
            />
          ) : (
            displayImage ? (
              <img
                src={displayImage}
                alt={item.title}
                className="card-image"
              />
            ) : (
              <div className="no-image-placeholder">
                <span className="placeholder-title">{item.title}</span>
              </div>
            )
          )}
        </div>

        <div className="card-info">
          <div className="meta-row">
            <span className="match-score">{matchScore}</span>
          </div>
          <h4 className="card-title">{item.title}</h4>
          <div className="tags-row">
            <span className="tag">{tag}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          width: 200px; /* Reduced width for portrait feel */
          margin-right: 12px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .card-container:hover {
          transform: scale(1.05); /* Gentle zoom */
          z-index: 10;
        }

        .card {
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: transparent;
        }

        .image-wrapper {
          width: 100%;
          height: 280px; /* Portrait aspect ratio */
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
          background: #222;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.3s;
        }

        .no-image-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #333 0%, #111 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #777;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .placeholder-title {
            padding: 1rem;
            text-align: center;
            opacity: 0.5;
        }
        
        .card-container:hover .card-image {
          filter: brightness(1.1);
        }

        .card-info {
          padding: 0 4px;
          display: flex;
          flex-direction: column;
        }

        .meta-row {
          margin-bottom: 4px;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .match-score {
          color: #46d369; /* Netflix Green */
        }

        .card-title {
          color: white;
          font-size: 0.95rem;
          font-weight: 500;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tags-row {
          font-size: 0.75rem;
          color: white;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
