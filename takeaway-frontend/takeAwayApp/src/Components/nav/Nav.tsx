import { useState, useEffect } from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import OverlayOrder from '../overlayorder/OverlayOrder';
import OverlayInlog from '../overlayInlog/OverlayInlog';

export default function Nav() {
  const [isOrderOverlayVisible, setOrderOverlayVisible] = useState(false);
  const [isLoginOverlayVisible, setLoginOverlayVisible] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const updateCartFromStorage = () => {
    const updatedCart = sessionStorage.getItem("cart");
    if (updatedCart) {
      setCart(JSON.parse(updatedCart));
    }
  };

  useEffect(() => {
    updateCartFromStorage();

    const intervalId = setInterval(updateCartFromStorage, 500);

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li className="nav_cart" onClick={() => setOrderOverlayVisible(true)}>
          <img src="/cart.svg" alt="Cart" className="nav_icon" />
          {cart.length > 0 && <span className="cart_count">{cart.length}</span>}
        </li>
        <li onClick={() => setLoginOverlayVisible(true)}>
          <img src="/avatar.svg" alt="Login" className="nav_icon" />
        </li>
      </ul>

      {isOrderOverlayVisible && (
        <OverlayOrder cart={cart} onClose={() => setOrderOverlayVisible(false)} />
      )}

      {isLoginOverlayVisible && (
        <OverlayInlog onClose={() => setLoginOverlayVisible(false)} />
      )}
    </section>
  );
}
