import { useState, useEffect } from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import OverlayOrder from '../overlayOrder/OverlayOrder';
import OverlayInlog from '../overlayInlog/OverlayInlog';

export default function Nav() {
  const [isOrderOverlayVisible, setOrderOverlayVisible] = useState(false);
  const [isLoginOverlayVisible, setLoginOverlayVisible] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  // Funktion för att räkna totalt antal produkter i cart
  const getTotalItems = (cart: any[]): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const handleStorageChange = () => {
      const updatedCart = sessionStorage.getItem("cart");
      if (updatedCart) {
        setCart(JSON.parse(updatedCart));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="nav_container">
      <ul className="nav_list">
        <Link to="/meny">
          <img src="src/assets/home.svg" alt="Home" className="nav_icon" />
        </Link>
        <Link to="/info">
          <img src="src/assets/info.svg" alt="Info" className="nav_icon" />
        </Link>
        <li className="nav_cart" onClick={() => setOrderOverlayVisible(true)}>
          <img src="src/assets/cart.svg" alt="Cart" className="nav_icon" />
          {getTotalItems(cart) > 0 && (
            <span className="cart_count">{getTotalItems(cart)}</span>
          )}
        </li>
        <li onClick={() => setLoginOverlayVisible(true)}>
          <img src="src/assets/avatar.svg" alt="Login" className="nav_icon" />
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

