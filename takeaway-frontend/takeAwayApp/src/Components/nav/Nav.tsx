import { useState } from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import OverlayOrder from '../overlayOrder/OverlayOrder';
import OverlayInlog from '../overlayInlog/OverlayInlog';

export default function Nav() {
  const [isOrderOverlayVisible, setOrderOverlayVisible] = useState(false); 
  const [isLoginOverlayVisible, setLoginOverlayVisible] = useState(false); 

  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="src/assets/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="src/assets/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li onClick={() => setOrderOverlayVisible(true)}>
          <img src="src/assets/cart.svg" alt="Cart" className="nav_icon" />
        </li>
        <li onClick={() => setLoginOverlayVisible(true)}>
          <img src="src/assets/avatar.svg" alt="Login" className="nav_icon" />
        </li>
      </ul>

      {isOrderOverlayVisible && (
        <OverlayOrder onClose={() => setOrderOverlayVisible(false)} />
      )}

      {isLoginOverlayVisible && (
        <OverlayInlog onClose={() => setLoginOverlayVisible(false)} />
      )}
    </section>
  );
}
