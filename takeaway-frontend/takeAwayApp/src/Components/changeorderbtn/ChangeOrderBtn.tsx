import { useState } from "react";
import "./changeorderbtn.css";
import { adminDeleteOrder, updateOrderQuantity } from "../../../api/Api";
import { ChangeOrderBtnProps } from "../../../interface/Interface";

function ChangeOrderBtn({ order, onRemove }: ChangeOrderBtnProps) {
  const [quantity, setQuantity] = useState<number>(order.quantity);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0) return;

    setQuantity(newQuantity);

    try {
      await updateOrderQuantity(
        {
          id: order.id,
          quantity: newQuantity,
        },
        order.orderId
      );
      alert("Order uppdaterad!");
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      alert("Kunde inte uppdatera order.");
    }
  };

  const handleDeleteOrder = async (orderId: string, itemId: string) => {
    try {
      await adminDeleteOrder(orderId, itemId);
      onRemove(itemId);
      alert("Order borttagen!");
    } catch (error) {
      console.error("Fel vid borttagning:", error);
      alert("Kunde inte ta bort order.");
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
          src="minus.png"
          alt="Minus"
          onClick={() => handleUpdateQuantity(quantity - 1)}
        />
        <span className="changeOrder_quantity">{quantity}</span>
        <img
          className="changeOrder_plusMinus"
          src="plus.png"
          alt="Plus"
          onClick={() => handleUpdateQuantity(quantity + 1)}
        />
      </section>
    </section>
  );
}

export default ChangeOrderBtn;