import { useState, useEffect } from "react";
import './overlayorder.css';

interface OverlayOrderProps {
  cart: any[];
  onClose: () => void;
}

function OverlayOrder({ cart, onClose }: OverlayOrderProps) {
  const [cartItems, setCartItems] = useState<any[]>(cart);

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [cart]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="orderOverlay_container">
      <section className="orderOverlay_header">
        <h1>Din Order</h1>
        <img
          src="/stängKnapp.png"
          alt="Close Button"
          className="orderOverlay_close"
          onClick={onClose}
        />
      </section>

      <section className="center_container">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <section key={index} className="orderOverlay_order">
              <p className="orderOverlay_text">{item.quantity}</p>
              <p className="orderOverlay_text">{item.name}</p>
              <p className="orderOverlay_price">{item.price * item.quantity} SEK</p>
            </section>
          ))
        ) : (
          <p>Din varukorg är tom.</p>
        )}
      </section>

      <section className="inputFields_container">
      <h3>Fyll i dina kontaktuppgifter</h3>
        <input className="inputField" type="text" placeholder="Namn" />
        <input className="inputField" type="email" placeholder="E-post" />
        <input className="inputField" type="tel" placeholder="Telefonnummer" />
      </section>

      <section className="orderOverlay_totalPrice">
        <p className="orderOverlay_totalPrice__total">Total</p>
        <p className="orderOverlay_totalPrice__price">{total} SEK</p>
      </section>

      <button className="orderOverlay_orderButton">Beställ {total} SEK</button>
    </section>
  );
}

export default OverlayOrder;

// Rindert
// hämtar det som ligger i sessionStorage/Varukorgen