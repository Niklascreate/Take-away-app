import React from 'react';
import './changeorderbtn.css';
import { adminDeleteOrder, adminUpdateOrder } from '../../../api/Api';
import { UpdateOrder } from '../../../interface/Interface';

interface ChangeOrderBtnProps {
  order: UpdateOrder;
}

const ChangeOrderBtn: React.FC<ChangeOrderBtnProps> = ({ order }) => {
  const [quantity, setQuantity] = React.useState<number>(order.quantity);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0) return; // Blockera negativa värden

    setQuantity(newQuantity);

    // Uppdatera ordren via API
    try {
      await adminUpdateOrder({
        id: order.id,           // Maträttens ID
        quantity: newQuantity,  // Uppdaterad kvantitet
      }, order.orderId);        // Skickar orderId i URL
      alert('Order uppdaterad!');
    } catch (error) {
      console.error('Fel vid uppdatering:', error);
      alert('Kunde inte uppdatera order.');
    }
  };

  const handleDeleteOrder = async (orderId: string, itemId: string) => {
    try {
      await adminDeleteOrder(orderId, itemId);  // Anropar API för att ta bort
      alert('Order borttagen!');
    } catch (error) {
      console.error('Fel vid borttagning:', error);
      alert('Kunde inte ta bort order.');
    }
  };

  return (
    <section className="changeOrder_container">
      <section className="changeOrder_delete">
        <img
          className="changeOrder_img"
          src="trash.png"
          alt="Trash"
          onClick={() => handleDeleteOrder(order.orderId, order.id)}  // Skicka med orderId och itemId
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
};

export default ChangeOrderBtn;
