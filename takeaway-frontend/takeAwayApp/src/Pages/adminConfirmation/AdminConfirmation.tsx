import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { useState, useEffect } from "react";
import { adminOrders, adminDeleteOrder } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";

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
        setError("Kunde inte ladda ordrar");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


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
              <p>
                <strong>Orderid:</strong> {order.orderId}
              </p>
              <p>
                <strong>Maträtt:</strong> {order.dishName}
              </p>
              <p>
                <strong>Kund:</strong> {order.customerName}
              </p>
              <p>
                <strong>E-mail:</strong> {order.email}
              </p>
              <p>
                <strong>Telefon:</strong> {order.phoneNumber}
              </p>
              <p>
                <strong>Antal:</strong> {order.quantity}
              </p>
              <p>
                <strong>Önskemål:</strong> {order.specialRequests}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.available ? "Klar" : "Inte klar"}
              </p>
              <p>
                <strong>Skapad:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </aside>
            <article className="switch-container">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round lock"></span>
                <p className="switch-text">Låsa order</p>
              </label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round lock"></span>
                <p className="switch-text">Bekräfta order</p>
              </label>
              <label className="switch">
                <input
                  type="checkbox"/>
                <span className="slider round lock"></span>
                <p className="switch-text">Ta bort order</p>
              </label>
            </article>
            <p className="felmeddelande"></p>
          </section>
        ))}
      </section>
      <Nav />
    </section>
  );
}

export default AdminConfirmation;
