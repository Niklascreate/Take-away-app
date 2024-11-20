import './nav.css'
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="src/assets/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="src/assets/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li><img src="src/assets/cart.svg" alt="Cart" className="nav_icon" /></li>
        <li><img src="src/assets/avatar.svg" alt="Profil" className="nav_icon" /></li>
      </ul>
    </section>
  )
}
