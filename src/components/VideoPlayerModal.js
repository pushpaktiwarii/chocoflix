import { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function VideoPlayerModal({ initialIndex, items, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const currentItem = items[currentIndex];

    // Handle next button
    const handleNext = (e) => {
        e.stopPropagation();
        if (currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Handle prev button (optional but good for UX)
    const handlePrev = (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Keyboard navigation and Scroll locking
    useEffect(() => {
        // Lock body scroll
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') {
                if (currentIndex < items.length - 1) setCurrentIndex(prev => prev + 1);
            }
            if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalStyle;
        };
    }, [currentIndex, items.length, onClose]);

    if (!currentItem) return null;

    return (
        <div className="player-overlay" onClick={onClose}>
            <div className="player-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="video-wrapper">
                    {currentItem.playbackId ? (
                        <MuxPlayer
                            playbackId={currentItem.playbackId}
                            streamType="on-demand"
                            autoPlay
                            // muted={false} // Default behavior is usually unmuted if user initiated
                            style={{ height: '100%', width: '100%' }}
                            accentColor="#e50914"
                        />
                    ) : (
                        <div className="no-video">
                            <img src={currentItem.image} alt={currentItem.title} />
                            <p>No video available</p>
                        </div>
                    )}
                </div>

                {/* Navigation Controls */}
                <div className="nav-controls">
                    {currentIndex > 0 && (
                        <button className="nav-btn prev" onClick={handlePrev}>‹</button>
                    )}

                    {currentIndex < items.length - 1 && (
                        <button className="nav-btn next" onClick={handleNext}>›</button>
                    )}
                </div>

                <div className="top-gradient" />
                <div className="info-overlay">
                    <h3>{currentItem.title}</h3>
                    <p>{currentItem.description}</p>
                </div>
            </div>

            <style jsx>{`
                .player-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: black;
                    z-index: 2000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .player-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: black;
                }

                .top-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 150px;
                    background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%);
                    pointer-events: none;
                    z-index: 2005;
                }

                .close-btn {
                    position: absolute;
                    top: 30px;
                    right: 40px;
                    z-index: 2020;
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: 2px solid white;
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .close-btn:hover {
                     background: rgba(255,255,255,0.2);
                     transform: scale(1.1);
                }

                .video-wrapper {
                    width: 100%;
                    height: 100%;
                }

                .nav-controls {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 0; /* Wrapper for positioning */
                    transform: translateY(-50%);
                    pointer-events: none;
                    z-index: 2010;
                }

                .nav-btn {
                    pointer-events: auto;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    border: none;
                    font-size: 3rem;
                    cursor: pointer;
                    padding: 20px;
                    border-radius: 8px;
                    transition: transform 0.2s, background 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute; /* Force to sides */
                    top: 50%;
                    transform: translateY(-50%);
                }

                .prev { left: 40px; }
                .next { right: 40px; }

                .nav-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: scale(1.1);
                }

                .info-overlay {
                    position: absolute;
                    top: 30px;
                    left: 40px;
                    max-width: 60%;
                    pointer-events: none;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                    z-index: 2015;
                }
                
                .info-overlay h3 {
                    font-size: 2.2rem;
                    margin-bottom: 0.5rem;
                    color: white;
                    font-weight: 700;
                }
                
                .info-overlay p {
                    font-size: 1.1rem;
                    color: #ddd;
                    max-width: 500px;
                }
                
                .no-video {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: white;
                }
                .no-video img {
                    max-height: 50vh;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
}
