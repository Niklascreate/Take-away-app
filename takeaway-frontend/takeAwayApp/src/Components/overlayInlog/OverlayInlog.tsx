import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './overlayinlog.css';
import { LoginOverlayProps } from "../../../interface/Interface";
import { loginUser } from "../../../api/Api";

function LoginOverlay({ onClose }: LoginOverlayProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username");
    if (loggedInUser) {
      navigate('/adminconfirmation');
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      await loginUser(username, password);
      navigate('/adminconfirmation');
    } catch (error: any) {
      setErrorMessage(error.message || "Fel vid inloggning");
    }
  };

  return (
    <section className="inlog_overlay">
      <section className="loginOverlayContent">
        <button className="closeButton" onClick={onClose}>
          <img src="/img/stängKnapp.svg" alt="Stäng" />
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
      </section>
    </section>
  );
}

export default LoginOverlay;