import { useState } from 'react';

export default function ProfileGate({ onEnter, profile }) {
  const [isEntering, setIsEntering] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('');
  const [isPinVisible, setIsPinVisible] = useState(false); // Toggle for eye icon
  const [error, setError] = useState(false);

  const handleProfileClick = () => {
    setShowPin(true);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin === '2026') {
      setIsEntering(true);
      setTimeout(() => {
        onEnter();
      }, 400);
    } else {
      setError(true);
      // Shake effect timeout
      setTimeout(() => {
        setError(false);
      }, 500);
    }
  };

  return (
    <div className={`profile-gate ${isEntering ? 'fade-out' : ''}`}>
      <div className="profile-container">
        {!showPin ? (
          <>
            <h1 className="gate-title">Who's watching?</h1>
            <div className="profile-card" onClick={handleProfileClick}>
              <div className="avatar-wrapper">
                <img src={profile.avatar} alt={profile.name} className="avatar" />
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          </>
        ) : (
          <div className="pin-container">
            <h2>Only for Sukudkutta's People</h2>
            <p>Enter PIN to access.</p>

            <form onSubmit={handleUnlock} className="pin-form">
              <div className={`input-wrapper ${error ? 'error' : ''}`}>
                <input
                  type={isPinVisible ? "text" : "password"}
                  className="pin-input"
                  placeholder="Access code, please"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setIsPinVisible(!isPinVisible)}
                >
                  {isPinVisible ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>

              <div className="button-group">
                <button type="button" className="cancel-btn" onClick={() => setShowPin(false)}>Cancel</button>
                <button type="submit" className="unlock-btn">Unlock</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .profile-gate {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #000; /* Pure black as per image */
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
          color: white;
        }

        .profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .avatar-wrapper {
          width: 10rem;
          height: 10rem;
          border-radius: 4px;
          overflow: hidden;
          border: 3px solid transparent;
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
          color: gray;
          font-size: 1.2rem;
          transition: color 0.2s ease;
        }

        .profile-card:hover .profile-name {
          color: white;
        }

        /* PIN UI */
        .pin-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            animation: fadeIn 0.4s;
            text-align: center;
        }
        
        .pin-container h2 {
            font-size: 2rem; /* Larger title like image */
            color: white;
            font-weight: 500;
            margin: 0;
        }

        .pin-container p {
             /* Subtitle is hidden in image but user asked to keep text, so we show it but minimal */
             font-size: 1rem;
             color: #999;
             margin-top: -1rem;
             margin-bottom: 1rem;
        }
        
        .pin-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            width: 100%;
        }

        .input-wrapper {
            position: relative;
            width: 300px;
            background: #333;
            border-radius: 4px;
            display: flex;
            align-items: center;
        }

        .input-wrapper.error {
             border: 1px solid #e50914;
             animation: shake 0.3s;
        }

        .pin-input {
            width: 100%;
            background: transparent;
            border: none;
            color: white;
            padding: 1rem;
            font-size: 1.1rem;
            outline: none;
        }

        .pin-input::placeholder {
            color: #8c8c8c;
        }

        .eye-toggle {
            background: transparent;
            border: none;
            color: #8c8c8c;
            padding: 0 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .eye-toggle:hover {
            color: white;
        }

        .button-group {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
        }

        .cancel-btn {
            background: transparent;
            border: 1px solid #777;
            color: #777;
            padding: 0.6rem 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 2px;
            transition: all 0.2s;
        }
        .cancel-btn:hover {
            border-color: white;
            color: white;
        }

        .unlock-btn {
            background: #e50914; /* Netflix Red */
            border: none;
            color: white;
            padding: 0.6rem 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 500;
            border-radius: 2px;
            transition: background 0.2s;
        }
        
        .unlock-btn:hover {
             background: #f40612;
        }
        
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            75% { transform: translateX(-10px); }
            100% { transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .gate-title { font-size: 2.5rem; }
          .avatar-wrapper { width: 7rem; height: 7rem; }
          .input-wrapper { width: 250px; }
        }
      `}</style>
    </div>
  );
}
