import { useState } from 'react';

export default function ProfileGate({ onEnter, profile }) {
    const [isEntering, setIsEntering] = useState(false);

    const handleClick = () => {
        setIsEntering(true);
        setTimeout(() => {
            onEnter();
        }, 400); // Wait for animation
    };

    return (
        <div className={`profile-gate ${isEntering ? 'fade-out' : ''}`}>
            <div className="profile-container">
                <h1 className="gate-title">Who's watching?</h1>
                <div className="profile-card" onClick={handleClick}>
                    <div className="avatar-wrapper">
                        <img src={profile.avatar} alt={profile.name} className="avatar" />
                    </div>
                    <span className="profile-name">{profile.name}</span>
                </div>
                <button className="manage-btn">Manage Profiles</button>
            </div>

            <style jsx>{`
        .profile-gate {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--bg-main);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: opacity 0.5s ease;
        }

        .fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          animation: fadeIn 0.8s ease;
        }

        .gate-title {
          font-size: 3.5rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          group: true;
        }

        .avatar-wrapper {
          width: 10rem;
          height: 10rem;
          border-radius: 4px;
          overflow: hidden;
          border: 3px solid transparent; /* default state */
          transition: border-color 0.2s ease;
        }
        
        .profile-card:hover .avatar-wrapper {
          border-color: white;
        }

        .avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-name {
          color: var(--text-gray);
          font-size: 1.2rem;
          transition: color 0.2s ease;
        }

        .profile-card:hover .profile-name {
          color: white;
        }

        .manage-btn {
          margin-top: 2rem;
          background: transparent;
          border: 1px solid var(--text-gray);
          color: var(--text-gray);
          padding: 0.5rem 1.5rem;
          font-size: 1.1rem;
          cursor: pointer;
          letter-spacing: 2px;
          transition: all 0.2s ease;
        }

        .manage-btn:hover {
          color: white;
          border-color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .gate-title { font-size: 2.5rem; }
          .avatar-wrapper { width: 7rem; height: 7rem; }
        }
      `}</style>
        </div>
    );
}
