import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProfileGate from '../components/ProfileGate';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import DetailModal from '../components/DetailModal';
import VideoPlayerModal from '../components/VideoPlayerModal';
import { profile, heroContent, rows } from '../data/content';

export default function Home() {
    const [hasEntered, setHasEntered] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [playerState, setPlayerState] = useState({ isOpen: false, items: [], initialIndex: 0 });
    const [canSkipPin, setCanSkipPin] = useState(false);

    useEffect(() => {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime) {
            const now = new Date().getTime();
            // If logged in within last 10 minutes (600000 ms), can skip PIN
            if (now - parseInt(loginTime) < 600000) {
                setCanSkipPin(true);
            }
        }
    }, []);

    const handleEnter = () => {
        setHasEntered(true);
        localStorage.setItem('loginTime', new Date().getTime().toString());
    };

    const handleCardClick = (items, index) => {
        setPlayerState({ isOpen: true, items, initialIndex: index });
    };

    const handleHeroPlay = () => {
        // Play the first episode (index 0) of the first row
        const firstRowItems = rows[0]?.items || [];
        if (firstRowItems.length > 0) {
            setPlayerState({ isOpen: true, items: firstRowItems, initialIndex: 0 });
        }
    };

    return (
        <>
            <Head>
                <title>{`${profile.name} - Your Memories, Now Streaming!`}</title>
                <meta name="description" content="A Collection of Our Masti" />

            </Head>

            {!hasEntered ? (
                <ProfileGate
                    profile={profile}
                    onEnter={handleEnter}
                    canSkipPin={canSkipPin}
                />
            ) : (
                <main>
                    <Navbar />
                    <Navbar />
                    <Hero
                        content={heroContent}
                        onMoreInfoClick={() => setShowDetailModal(true)}
                        onPlay={handleHeroPlay}
                    />

                    <div className="rows-container">
                        {rows.map((row) => (
                            <Row
                                key={row.title}
                                title={row.title}
                                items={row.items}
                                isLargeRow={row.type === 'wide'}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>

                    {showDetailModal && (
                        <DetailModal
                            onClose={() => setShowDetailModal(false)}
                            onPlay={handleHeroPlay}
                        />
                    )}

                    {playerState.isOpen && (
                        <VideoPlayerModal
                            items={playerState.items}
                            initialIndex={playerState.initialIndex}
                            onClose={() => setPlayerState({ ...playerState, isOpen: false })}
                        />
                    )}

                    <style jsx>{`
            .rows-container {
               margin-top: -100px; /* Pull rows up over hero fade */
               position: relative;
               z-index: 10;
               padding-bottom: 50px;
            }
          `}</style>
                </main>
            )}
        </>
    );
}
