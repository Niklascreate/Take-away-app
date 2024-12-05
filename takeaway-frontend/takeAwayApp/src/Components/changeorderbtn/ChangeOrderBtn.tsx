import { useState } from "react";
import "./changeorderbtn.css";
import { adminDeleteOrder, updateOrderQuantity } from "../../../api/Api";
import { ChangeOrderBtnProps } from "../../../interface/Interface";

function ChangeOrderBtn({ order, onRemove, onQuantityChange }: ChangeOrderBtnProps & { onQuantityChange: (id: string, newQuantity: number) => void }) {
  const [quantity, setQuantity] = useState<number>(order.quantity);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0) return;

    setQuantity(newQuantity);
    onQuantityChange(order.id, newQuantity);

    try {
      await updateOrderQuantity(
        {
          id: order.id,
          quantity: newQuantity,
        },
        order.orderId
      );
      console.log("Order uppdaterad!");
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      console.log("Kunde inte uppdatera order.");
    }
  };

  const handleDeleteOrder = async (orderId: string, itemId: string) => {
    try {
      await adminDeleteOrder(orderId, itemId);
      onRemove(itemId);
      console.log("Order borttagen!");
    } catch (error) {
      console.error("Fel vid borttagning:", error);
      console.log("Kunde inte ta bort order.");
    }
  };

  return (
    <section className="changeOrder_container">
      <section className="changeOrder_delete">
        <img
          className="changeOrder_img"
          src="trash.png"
          alt="Trash"
          onClick={() => handleDeleteOrder(order.orderId, order.id)}
        />
        <img
          className="changeOrder_plusMinus"
          src="white_minus.png"
          alt="Minus"
          onClick={() => handleUpdateQuantity(quantity - 1)}
        />
        <span className="changeOrder_quantity">{quantity}</span>
        <img
          className="changeOrder_plusMinus"
          src="white_plus.png"
          alt="Plus"
          onClick={() => handleUpdateQuantity(quantity + 1)}
        />
      </section>
    </section>
  );
}

export default ChangeOrderBtn;

//Jonas
//Hnterar visning och ändringar av kvantitet eller borttagning av en order.