import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './overlayorder.css';
import { orderFood } from "../../../api/Api";

// Props för komponenten
interface OverlayOrderProps {
  cart: any[];
  onClose: () => void;
}

function OverlayOrder({ cart, onClose }: OverlayOrderProps) {
  const [cartItems, setCartItems] = useState<any[]>(cart);
  const [name, setName] = useState(""); // För att lagra namnet
  const [email, setEmail] = useState(""); // För att lagra e-posten
  const [phone, setPhone] = useState(""); // För att lagra telefonnummer

  // State för att hålla reda på vilka fält som har fel
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // State för att visa orderbekräftelse
  const [orderMessage, setOrderMessage] = useState<string>("");

  const navigate = useNavigate();

  const handlePageClick = () => {
      navigate('/overlayconfirmation');
  };

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [cart]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    // Återställ valideringsfel
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);
  
    // Validering
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
  
    // Skapa orderobjekt
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
  
    console.log("Skickar beställning:", orders);
  
    try {
      // Skicka orderobjektet till API:et
      const response = await orderFood(orders);
      console.log('Order skickad:', response);
  
      // Uppdatera meddelande
      setOrderMessage(`Din order är mottagen! Total: ${response.totalPrice} SEK`);
      sessionStorage.clear();
  
      // Återställ state
      setCartItems([]);
      setName("");
      setEmail("");
      setPhone("");
  
      onClose(); // Stäng overlay
      navigate('/overlayconfirmation'); // Navigera till bekräftelsesidan
    } catch (error) {
      console.error('Kunde inte skicka ordern:', error);
      setOrderMessage('Ett fel inträffade vid beställningen. Försök igen.');
    }
  };

  // Ta bort en maträtt från varukorgen
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
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                X
              </button>
            </section>
          ))
        ) : (
          <p>Din varukorg är tom.</p>
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

      {orderMessage && (
        <p className="orderOverlay_message">{orderMessage}</p> // Visar ordermeddelandet om det finns
      )}

      <section className="orderOverlay_totalPrice">
        <p className="orderOverlay_totalPrice__total">Total</p>
        <p className="orderOverlay_totalPrice__price">{total} SEK</p>
      </section>

      <button className="orderOverlay_orderButton" onClick={() => { handleOrder(); handlePageClick(); }}>
        Beställ {total} SEK
      </button>
    </section>
  );
}

export default OverlayOrder;
