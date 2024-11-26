import React, { useState } from "react";
import "./overlayInlog.css";
import { useNavigate } from "react-router-dom";

interface LoginOverlayProps {
  onClose: () => void;
}

function LoginOverlay({ onClose }: LoginOverlayProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const loginData = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('https://62e8azqirl.execute-api.eu-north-1.amazonaws.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error('Fel vid inloggning');
      }
  
      navigate('/adminconfirmation');
    } catch (error) {
      console.error('Något gick fel:', error);
      setErrorMessage('Fel vid inloggning'); 
    }
  };

  return (
    <div className="overlay">
      <div className="loginOverlayContent">
        <button className="closeButton" onClick={onClose}>
          <img src="/stängKnapp.png" alt="Stäng" />
        </button>
        <h2 className="loginTitle">Logga In</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Användarnamn"
            className="inputField"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lösenord"
            className="inputField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submitButton">
            Logga In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginOverlay;

