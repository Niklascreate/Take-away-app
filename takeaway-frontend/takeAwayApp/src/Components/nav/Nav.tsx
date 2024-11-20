import { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import OverlayInlog from '../overlayInlog/OverlayInlog';
import OverlayOrder from '../overlayOrder/OverlayOrder';

export default function Nav() {
  const [isLoginOverlayVisible, setLoginOverlayVisible] = useState(false); // Hantera login overlay
  const [isOrderOverlayVisible, setOrderOverlayVisible] = useState(false); // Hantera order overlay

  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="src/assets/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="src/assets/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li onClick={() => setOrderOverlayVisible(true)}> {/* Visa order overlay */}
          <img src="src/assets/cart.svg" alt="Cart" className="nav_icon" />
        </li>
        <li onClick={() => setLoginOverlayVisible(true)}> {/* Visa login overlay */}
          <img src="src/assets/avatar.svg" alt="Profil" className="nav_icon" />
        </li>
      </ul>

      {/* Visa OverlayInlog om isLoginOverlayVisible är true */}
      {isLoginOverlayVisible && (
        <OverlayInlog onClose={() => setLoginOverlayVisible(false)} />
      )}

      {/* Visa OverlayOrder om isOrderOverlayVisible är true */}
      {isOrderOverlayVisible && (
        <OverlayOrder onClose={() => setOrderOverlayVisible(false)} />
      )}
    </section>
  );
}
