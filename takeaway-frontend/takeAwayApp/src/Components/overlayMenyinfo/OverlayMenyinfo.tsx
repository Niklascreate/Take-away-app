import { useState } from "react";
import "./overlayMenyInfo.css";
import { Dish } from "../../../interface/interface";

interface OverlayMenyInfoProps {
  closeOverlay: () => void;
  dish: Dish;
}

function OverlayMenyInfo({ closeOverlay, dish }: OverlayMenyInfoProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const totalPrice = dish.price * quantity;

  const handleAddToCart = () => {
    const item = {
      name: dish.name,
      price: dish.price,
      quantity: quantity,
    };

    const currentCart = sessionStorage.getItem("cart");
    let cart = currentCart ? JSON.parse(currentCart) : [];

    cart.push(item);
    
    sessionStorage.setItem("cart", JSON.stringify(cart));

    closeOverlay();
  };

  return (
    <section className="overlay">
      <section className="overlayContent">
        <img
          src="src/assets/stängKnapp.png"
          alt="Stäng"
          className="closeButton"
          onClick={closeOverlay}
        />
        <section className="imageContainer">
          <img src={dish.imageUrl} alt={dish.name} className="dishImage" />
        </section>

        <h1 className="dishTitle">{dish.name}</h1>
        <p className="dishDescription">{dish.description}</p>

        <section className="actionContainer">
          <section className="quantitySelector">
            <button className="quantityButton" onClick={decreaseQuantity}>
              <img src="src/assets/minus.png" alt="Minus" className="quantityIcon" />
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantityButton" onClick={increaseQuantity}>
              <img src="src/assets/plus.png" alt="Plus" className="quantityIcon" />
            </button>
          </section>
          <button className="addToCartButton" onClick={handleAddToCart}>
            Lägg i varukorg <span>{totalPrice} SEK</span>
          </button>
        </section>
      </section>
    </section>
  );
}

export default OverlayMenyInfo;


// Rindert
// Overlay i meny, visar info om matträtten, och lägger i varukorg