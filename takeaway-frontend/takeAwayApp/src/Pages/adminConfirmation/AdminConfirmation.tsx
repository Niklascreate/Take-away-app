import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { useState, useEffect } from "react";
import { adminOrders, adminOrderLock } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";

function AdminConfirmation() {
  const [orders, setOrders] = useState<AdminPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lockedOrders, setLockedOrders] = useState<string[]>([]); // Håller koll på låsta ordrar

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

  // Hantera låsning av order
  const handleLock = async (orderId: string) => {
    console.log("Försöker låsa order med ID:", orderId); // Kontrollera att rätt ID skickas
  
    try {
      const response = await adminOrderLock(orderId); // API-anrop för att låsa ordern
      console.log("Order låst framgångsrikt:", response); // Loggar API-svaret
  
      // Uppdatera listan över låsta ordrar
      setLockedOrders((prev) => [...prev, orderId]);
    } catch (err) {
      console.error("Gick inte att låsa order:", err);
      setError("Kunde inte låsa order."); // Uppdatera felstatus för visning i UI
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
            <article className="button-container">
              <button className="switch lock">Bekräfta</button>
              <button
                className={`switch ${
                  lockedOrders.includes(order.orderId) ? "confirmed" : "lock"
                }`}
                onClick={() => handleLock(order.orderId)}
                disabled={lockedOrders.includes(order.orderId)}
              >
                {lockedOrders.includes(order.orderId) ? "Låst" : "Lås"}
              </button>
              <button className="switch lock">Ta bort</button>
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