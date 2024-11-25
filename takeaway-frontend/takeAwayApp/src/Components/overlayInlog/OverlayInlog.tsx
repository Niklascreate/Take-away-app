import './overlayinlog.css';


interface LoginOverlayProps {
  onClose: () => void;
}

function LoginOverlay({ onClose }: LoginOverlayProps) {
  return (
    <div className="overlay">
      <div className="loginOverlayContent">
      <button className="closeButton" onClick={onClose}>
          <img src="/stängKnapp.png" alt="Stäng" />
        </button>
        <h2 className="loginTitle">Logga In</h2>
        <form>
          <input type="text" placeholder="Användarnamn" className="inputField" />
          <input type="password" placeholder="Lösenord" className="inputField" />
          <button type="submit" className="submitButton">Logga In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginOverlay;

