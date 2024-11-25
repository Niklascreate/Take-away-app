import { useState } from "react";
import "./overlayMenyInfo.css";
import { Dish } from "../../../interface/Interface";

// Definierar props för komponenten
interface OverlayMenyInfoProps {
  closeOverlay: () => void; // Funktion för att stänga överlägget
  dish: Dish;              // Objekt med information om maträtten
}

function OverlayMenyInfo({ closeOverlay, dish }: OverlayMenyInfoProps) {
  // Hanterar antalet maträtter som användaren vill köpa
  const [quantity, setQuantity] = useState<number>(1);

  // Öka antalet maträtter
  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);

  // Minska antalet maträtter (minskar inte under 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  // Beräkna totalpriset baserat på priset för en maträtt och antalet
  const totalPrice = dish.price * quantity;

  // Lägg till maträtten i varukorgen
  const handleAddToCart = () => {
    const item = {
      id: dish.id,
      name: dish.name,      // Namn på maträtten
      price: dish.price,    // Pris per maträtt
      quantity: quantity,   // Antal valda
    };

    // Hämta nuvarande varukorg från sessionStorage
    const currentCart = sessionStorage.getItem("cart");
    let cart = currentCart ? JSON.parse(currentCart) : []; // Om ingen varukorg finns, skapa en tom array

    // Lägg till den nya maträtten i varukorgen
    cart.push(item);

    // Spara den uppdaterade varukorgen i sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Stäng överlägget
    closeOverlay();
  };

  return (
    <section className="overlay">
      <section className="overlayContent">
        {/* Stäng-knapp */}
        <img
          src="/stängKnapp.png"
          alt="Stäng"
          className="closeButton"
          onClick={closeOverlay} // Stäng överlägget när användaren klickar
        />

        {/* Bild för maträtten */}
        <section className="imageContainer">
          <img src={dish.imageUrl} alt={dish.name} className="dishImage" />
        </section>

        {/* Namn och beskrivning av maträtten */}
        <h1 className="dishTitle">{dish.name}</h1>
        <p className="dishDescription">{dish.description}</p>

        {/* Sektion för att välja antal och lägga till i varukorgen */}
        <section className="actionContainer">
          <section className="quantitySelector">
            {/* Minska antalet */}
            <button className="quantityButton" onClick={decreaseQuantity}>
              <img src="/minus.png" alt="Minus" className="quantityIcon" />
            </button>

            {/* Visa aktuellt antal */}
            <span className="quantity">{quantity}</span>

            {/* Öka antalet */}
            <button className="quantityButton" onClick={increaseQuantity}>
              <img src="/plus.png" alt="Plus" className="quantityIcon" />
            </button>
          </section>

          {/* Knapp för att lägga till i varukorgen */}
          <button className="addToCartButton" onClick={handleAddToCart}>
            Lägg i varukorg <span>{totalPrice} SEK</span> {/* Visar totalpris */}
          </button>
        </section>
      </section>
    </section>
  );
}

export default OverlayMenyInfo;
