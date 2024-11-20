import { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import OverlayInlog from '../overlayInlog/OverlayInlog'; 

export default function Nav() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="src/assets/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="src/assets/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li>
          <img src="src/assets/cart.svg" alt="Cart" className="nav_icon" />
        </li>
        <li onClick={() => setOverlayVisible(true)}>
          <img src="src/assets/avatar.svg" alt="Profil" className="nav_icon" />
        </li>
      </ul>

      {isOverlayVisible && <OverlayInlog onClose={() => setOverlayVisible(false)} />}
    </section>
  );
}
