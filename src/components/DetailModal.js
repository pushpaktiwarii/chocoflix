import { rows, heroContent } from '../data/content';

export default function DetailModal({ onClose }) {
    // Use the "To my future Kids" row items as the episodes list
    // In a real app, you might pass specific data or fetch it
    const episodes = rows[0]?.items || [];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="modal-header">
                    <div className="header-content">
                        <h1>{heroContent.title}</h1>
                        <div className="header-buttons">
                            <button className="play-btn">
                                <span className="btn-icon">▶</span> Play
                            </button>
                            <button className="icon-btn" title="Add to My List">+</button>
                            <button className="icon-btn" title="Rate">👍</button>
                        </div>
                    </div>
                    {/* Gradient overlay for text readability */}
                    <div className="header-gradient"></div>
                </div>

                <div className="modal-body">
                    <div className="modal-info-grid">
                        <div className="left-col">
                            <div className="meta-line">
                                <span className="match-score">{heroContent.match}</span>
                                <span className="year">{heroContent.year}</span>
                                <span className="maturity">{heroContent.maturity}</span>
                                <span className="duration">{heroContent.duration}</span>
                            </div>
                            <p className="description">
                                {heroContent.description}
                            </p>
                        </div>
                        <div className="right-col">
                            <div className="crew-line">
                                <span className="label">Cast:</span> <span className="value">Mother, aunt swapnali, aunt samandeep, aunt manisha, uncle akshat, uncle rihaan, aunt anjali, aunt krishna, aunt prachi</span>
                            </div>
                            <div className="crew-line">
                                <span className="label">Genre:</span> <span className="value">Nostalgia, friendship, emotional, timeless</span>
                            </div>
                            <div className="crew-line">
                                <span className="label">Occasion:</span> <span className="value">Documenting life</span>
                            </div>
                        </div>
                    </div>

                    <div className="episodes-section">
                        <h3>Episodes</h3>
                        <div className="episodes-list">
                            {episodes.map((ep, index) => (
                                <div key={ep.id} className="episode-item">
                                    <div className="ep-index">{index + 1}</div>
                                    <div className="ep-preview">
                                        <img src={ep.image} alt={ep.title} />
                                    </div>
                                    <div className="ep-info">
                                        <div className="ep-header">
                                            <h4>{ep.title}</h4>
                                            <span className="ep-duration">{ep.duration}</span>
                                        </div>
                                        <p className="ep-desc">{ep.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85); /* Darker backdrop */
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center; /* Center vertically */
            overflow: hidden; /* Prevent body scroll */
            padding-top: 0;
        }

        .modal-container {
            background: #141414;
            width: 100%;
            max-width: 800px; /* Reduced width ("breath") */
            max-height: 90vh;
            border-radius: 8px;
            position: relative;
            box-shadow: 0 4px 30px rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.96) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #181818;
            border: none;
            cursor: pointer;
            z-index: 10;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        
        .close-btn:hover {
            background: #2a2a2a;
        }

        .modal-header {
            height: 400px; /* Reduced height further */
            background-image: url('${heroContent.image}');
            background-size: cover;
            background-position: center 20%;
            position: relative;
            display: flex;
            align-items: flex-end;
            flex-shrink: 0;
        }

        .header-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(0deg, #141414 0%, transparent 50%);
            z-index: 1;
        }

        .header-content {
            position: relative;
            z-index: 2;
            padding: 0 3rem 2rem 3rem; /* Adjusted padding */
            width: 100%;
        }

        .header-content h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            color: white;
            line-height: 1.1;
        }

        .header-buttons {
            display: flex;
            gap: 0.8rem;
            align-items: center;
        }

        .play-btn {
            background: white;
            color: black;
            border: none;
            padding: 0.6rem 1.8rem; /* Wide rectangle */
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 4px; /* Slight rounded corners */
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            transition: opacity 0.2s;
        }

        .play-btn:hover {
            opacity: 0.85;
        }
        
        .play-btn .btn-icon {
            font-size: 1.2rem;
            line-height: 0;
            margin-top: -2px; /* Visual tweak */
        }

        .icon-btn {
            width: 44px;
            height: 44px;
            border-radius: 50%; /* Circle */
            background: rgba(42,42,42,0.6);
            border: 2px solid rgba(255,255,255,0.5); /* Semi-transparent white border */
            color: white;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .icon-btn:hover {
            border-color: white;
            background: rgba(255,255,255,0.1);
        }

        /* ... header styles ... */

        .modal-body {
            padding: 0 40px 40px 40px; /* More padding */
            color: white;
            overflow-y: auto;
            flex-grow: 1;
            /* Hide scrollbar for cleaner look but allow scroll */
            scrollbar-width: thin;
            scrollbar-color: #333 #141414;
        }

        .modal-info-grid {
            display: grid;
            grid-template-columns: 70% 30%; /* Approx ratio from screenshot */
            gap: 2rem;
            margin-bottom: 3rem;
            margin-top: 1rem;
        }

        .meta-line {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .match-score { color: #46d369; font-weight: bold; }
        .year { color: #bcbcbc; }
        .maturity { border: 1px solid rgba(255,255,255,0.4); padding: 0 0.4rem; font-size: 0.8rem; }
        .duration { color: #bcbcbc; }
        
        .description {
            line-height: 1.5;
            font-size: 1rem;
            color: white;
            max-width: 95%; /* Prevent full width stretch */
        }

        .crew-line {
            margin-bottom: 1rem;
            font-size: 0.85rem;
            line-height: 1.4;
            color: #777;
        }
        .label { color: #777; }
        .value { color: white; cursor: pointer; }
        .value:hover { text-decoration: underline; }

        /* Episodes List */
        .episodes-section h3 {
             /* Hide the header to match screenshot closer, or make it very subtle */
             display: none; 
        }

        .episodes-list {
            display: flex;
            flex-direction: column;
            gap: 0;
        }

        .episode-item {
            display: flex;
            align-items: flex-start; /* Align to top */
            padding: 20px 20px 20px 0; /* Align left with text */
            border-bottom: 1px solid #282828; /* Subtle separator */
            cursor: pointer;
            border-radius: 4px;
        }

        .episode-item:hover {
            background-color: #1e1e1e;
        }

        .ep-index {
            font-size: 1.5rem;
            color: #d2d2d2;
            width: 50px;
            text-align: center;
            font-weight: 500;
            margin-top: 20px; /* Center with image vertically approx */
        }

        .ep-preview {
            width: 130px;
            height: 73px; /* 16:9 approx */
            flex-shrink: 0;
            margin-right: 1.5rem;
            border-radius: 4px;
            overflow: hidden;
            background: #333;
        }

        .ep-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .ep-info {
            flex: 1;
            padding-top: 5px;
        }

        .ep-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.4rem;
        }

        .ep-header h4 {
            font-weight: bold;
            font-size: 1rem;
            margin: 0;
            color: #fff;
        }

        .ep-duration {
            font-size: 0.9rem;
            font-weight: bold;
            color: white;
        }

        .ep-desc {
            color: #a3a3a3;
            font-size: 0.85rem;
            margin: 0;
            line-height: 1.4;
            width: 90%;
        }

        @media (max-width: 768px) {
            .modal-container {
                max-width: 100%;
                height: 100%;
                max-height: 100%;
                border-radius: 0;
            }
            
            .modal-header {
                height: 40vh; /* Relative height for mobile */
                min-height: 250px;
            }

            .header-content {
                padding: 0 1.5rem 2rem 1.5rem;
            }

            .header-content h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .modal-body {
                padding: 0 1.5rem 2rem 1.5rem;
            }

            .modal-info-grid {
                grid-template-columns: 1fr; /* Stack columns */
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .description {
                max-width: 100%;
                font-size: 0.95rem;
            }

            .episode-item {
                padding: 1rem 0;
            }
            
            .ep-preview {
                width: 110px;
                height: 62px;
                margin-right: 1rem;
            }
            
            .ep-index {
                width: 30px;
                font-size: 1.2rem;
                margin-top: 15px;
            }
        }
      `}</style>
        </div>
    );
}
