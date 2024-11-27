import Nav from '../../components/nav/Nav';
import './adminconfirmation.css';
import { useState, useEffect } from 'react';
import { adminOrders, adminOrderDone, adminOrderLock } from '../../../api/Api';
import { AdminPage } from '../../../interface/Interface';

function AdminConfirmation() {
  const [orders, setOrders] = useState<AdminPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta ordrar vid sidans laddning
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminOrders();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError('Kunde inte ladda ordrar');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hantera toggling av status (låsa eller markera som klar)
  const handleOrderToggle = async (orderId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        // Markera som klar
        await adminOrderDone(orderId); // Skicka med orderId
        alert(`Order med ID ${orderId} markerades som klar.`);
      } else {
        // Låsa order
        await adminOrderLock(orderId); // Skicka med orderId
        alert(`Order med ID ${orderId} låstes.`);
      }
  
      // Uppdatera lokalt för att reflektera ändringen
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, available: !currentStatus } : order
        )
      );
    } catch (err) {
      alert('Något gick fel vid uppdateringen av orderstatus.');
      console.error(err);
    }
  };
  


  return (
    <section className="confirmation_container">
      <h1 className="confirmation_header">Bekräftelse av Order</h1>

      {loading && <p>Laddar ordrar...</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="box-order">
        <h3 className="your-order__title">Redo att bekräfta</h3>

        {orders.map((order) => (
          <section className="confirmation_card" key={order.orderId}>
            <aside className="order-list">
              <p>Orderid: {order.orderId}</p>
              <p>Maträtt: {order.dishName}</p>
              <p>Kund: {order.customerName}</p>
              <p>E-mail: {order.email}</p>
              <p>Telefon: {order.phoneNumber}</p>
              <p>Antal: {order.quantity}</p>
              {order.specialRequests && <p>Önskemål: {order.specialRequests}</p>}
              <p>Status: {order.available ? 'Klar' : 'Inte klar'}</p>
              <p>Skapad: {new Date(order.createdAt).toLocaleString()}</p>
            </aside>
            <label className="switch">
              <input
                type="checkbox"
                checked={!order.available}
                onChange={() => handleOrderToggle(order.orderId, order.available)}
              />
              <span className="slider round"></span>
            </label>
          </section>
        ))}
      </section>

      <Nav />
    </section>
  );
}

export default AdminConfirmation;