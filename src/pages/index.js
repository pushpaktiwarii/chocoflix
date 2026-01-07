import { useState } from 'react';
import Head from 'next/head';
import ProfileGate from '../components/ProfileGate';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import { profile, heroContent, rows } from '../data/content';

export default function Home() {
    const [hasEntered, setHasEntered] = useState(false);

    return (
        <>
            <Head>
                <title>{profile.name} - Personal Portfolio</title>
                <meta name="description" content="A cinematic portfolio experience" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {!hasEntered ? (
                <ProfileGate profile={profile} onEnter={() => setHasEntered(true)} />
            ) : (
                <main>
                    <Navbar />
                    <Hero content={heroContent} />

                    <div className="rows-container">
                        {rows.map((row) => (
                            <Row
                                key={row.title}
                                title={row.title}
                                items={row.items}
                                isLargeRow={row.type === 'wide'}
                            />
                        ))}
                    </div>

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
