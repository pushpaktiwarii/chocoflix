import { useState } from 'react';

export default function ProfileGate({ onEnter, profile }) {
  const [isEntering, setIsEntering] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);

  const handleProfileClick = () => {
    setShowPin(true);
  };

  const handlePinChange = (index, value) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto focus next or submit
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }

    // Check code when full
    if (index === 3 && value) {
      const code = newPin.join('');
      // Check last digit too since state update is async-ish in logic, but here we use the var
      // Actually newPin has the updated value
      checkCode(code.slice(0, 3) + value);
    }
  };

  const checkCode = (code) => {
    if (code === '2026') {
      setIsEntering(true);
      setTimeout(() => {
        onEnter();
      }, 400);
    } else {
      setError(true);
      setTimeout(() => {
        setPin(['', '', '', '']);
        document.getElementById('pin-0').focus();
        setError(false);
      }, 1000);
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
            <div className="pin-inputs">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`pin-${i}`}
                  type="password"
                  className={`pin-digit ${error ? 'error' : ''}`}
                  value={pin[i]}
                  onChange={(e) => handlePinChange(i, e.target.value)}
                  maxLength={1}
                  autoFocus={i === 0}
                />
              ))}
            </div>
            {error && <p className="error-msg">Incorrect PIN. Try again.</p>}
            <button className="cancel-btn" onClick={() => setShowPin(false)}>Cancel</button>
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

        /* PIN UI */
        .pin-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            animation: fadeIn 0.4s;
        }
        
        .pin-container h2 {
            font-size: 1.5rem;
            color: white;
        }
        
        .pin-inputs {
            display: flex;
            gap: 1rem;
        }
        
        .pin-digit {
            width: 60px;
            height: 70px;
            border: 2px solid #333;
            background: #141414;
            color: white;
            font-size: 2rem;
            text-align: center;
            border-radius: 4px;
            outline: none;
        }
        
        .pin-digit:focus {
            border-color: white;
            transform: scale(1.1);
        }
        
        .pin-digit.error {
            border-color: #e50914;
            animation: shake 0.3s;
        }
        
        .error-msg {
            color: #e50914;
            font-size: 1.1rem;
        }
        
        .cancel-btn {
            background: transparent;
            border: 1px solid #777;
            color: #777;
            padding: 0.5rem 2rem;
            margin-top: 1rem;
            cursor: pointer;
        }
        .cancel-btn:hover {
            border-color: white;
            color: white;
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
        }
      `}</style>
    </div>
  );
}
