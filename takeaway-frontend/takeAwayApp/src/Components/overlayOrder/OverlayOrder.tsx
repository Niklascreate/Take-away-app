import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './overlayorder.css';
import { orderFood } from "../../../api/Api";

interface OverlayOrderProps {
  cart: any[];
  onClose: () => void;
}

function OverlayOrder({ cart, onClose }: OverlayOrderProps) {
  const [cartItems, setCartItems] = useState<any[]>(cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [orderMessage, setOrderMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, [cart]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);

    let isValid = true;
    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    }
    if (!phone.trim() || phone.length < 10) {
      setPhoneError(true);
      isValid = false;
    }

    if (!isValid) return;

    const orders = {
      customerName: name,
      email: email,
      phoneNumber: phone,
      order: cartItems.map((item) => ({
        id: item.id,
        specialRequests: item.specialRequests || "",
        quantity: item.quantity,
      })),
    };

    try {
      const response = await orderFood(orders);
      setOrderMessage(`Din order är mottagen! Total: ${response.totalPrice} SEK`);
      sessionStorage.clear();
      setCartItems([]);
      setName("");
      setEmail("");
      setPhone("");
      onClose();
      navigate('/overlayconfirmation');
    } catch (error) {
      setOrderMessage('Ett fel inträffade vid beställningen. Försök igen.');
    }
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <section className="orderOverlay_container">
      <section className="orderOverlay_header">
        <h1>Din Order</h1>
        <img
          src="/stängKnapp.svg"
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
              <button className="remove-btn" onClick={() => removeItem(item.id)}>X</button>
            </section>
          ))
        ) : (
          <p className="orderOverlay_text__cartEmpty">Din varukorg är tom.</p>
        )}
      </section>

      <section className="inputFields_container">
        <h3 className="kontakt_h3">Fyll i dina kontaktuppgifter</h3>
        <section className="inputFieldWrapper">
          <input
            className="inputField"
            type="text"
            placeholder="Namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="errorText">Vänligen fyll i ditt namn.</p>}
        </section>
        <section className="inputFieldWrapper">
          <input
            className="inputField"
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="errorText">Vänligen fyll i en giltig e-postadress.</p>}
        </section>
        <section className="inputFieldWrapper">
          <input
            className="inputField"
            type="tel"
            placeholder="Telefonnummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <p className="errorText">Vänligen fyll i ett giltigt telefonnummer.</p>}
        </section>
      </section>

      {orderMessage && <p className="orderOverlay_message">{orderMessage}</p>}

      <section className="orderOverlay_totalPrice">
        <p className="orderOverlay_totalPrice__total">Total</p>
        <p className="orderOverlay_totalPrice__price">{total} SEK</p>
      </section>

      <button className="orderOverlay_orderButton" onClick={handleOrder}>
        Beställ {total} SEK
      </button>
    </section>
  );
}

export default OverlayOrder;