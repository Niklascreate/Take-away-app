import { useState } from "react";
import "./overlaymenyinfo.css";
import { OverlayMenyInfoProps } from "../../../interface/Interface";

function OverlayMenyInfo({ closeOverlay, dish }: OverlayMenyInfoProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [specialRequests, setSpecialRequest] = useState<string>("");

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const totalPrice = dish.price * quantity;

  const updateCart = (item: { id: string; name: string; price: number; quantity: number; specialRequests: string }) => {
    const currentCart = sessionStorage.getItem("cart");
    let cart = currentCart ? JSON.parse(currentCart) : [];

    const existingItemIndex = cart.findIndex((cartItem: { id: string }) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleAddToCart = () => {
    const item = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
      specialRequests,
    };

    updateCart(item);
    closeOverlay();
  };


  return (
    <section className="overlay">
      <section className="overlayContent">
        <img
          src="/stängKnapp.svg"
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
          <textarea
            className="specialRequestTextarea"
            placeholder="önskemål..."
            value={specialRequests}
            onChange={(e) => setSpecialRequest(e.target.value)}
          ></textarea>

          <section className="quantitySelector">
            <button className="quantityButton" onClick={decreaseQuantity}>
              <img src="/minus.png" alt="Minus" className="quantityIcon" />
            </button>

            <span className="quantity">{quantity}</span>

            <button className="quantityButton" onClick={increaseQuantity}>
              <img src="/plus.png" alt="Plus" className="quantityIcon" />
            </button>
          </section>
        </section>

        <section className="totalPriceContainer">
          <p className="totalPrice">Totalpris: {totalPrice} SEK</p>
        </section>
        <button className="addToCartButton" onClick={handleAddToCart}>
          Lägg i varukorg
        </button>
      </section>
    </section>
  );
}

export default OverlayMenyInfo;
