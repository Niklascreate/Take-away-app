import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { useState, useEffect } from "react";
import { adminOrders, adminOrderLock, adminDeleteOrder } from "../../../api/Api";
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


// Hantera ändring av checkbox för att låsa order
const lockOrder = async (orderId: string) => {
  try {
    const response = await adminOrderLock(orderId);  // API-anropet för att låsa ordern
    console.log(response);  // Loggar svaret till konsolen
    console.log(`Ordern ${orderId} är nu låst`);
  } catch (err) {
    console.log("Kunde inte låsa ordern. Kontrollera om ordern redan är låst.");
  }
};

// Delete order
const deleteOrder = async (orderId: string) => {
  try {
    // Anropa API:t för att ta bort ordern
    const response = await adminDeleteOrder(orderId);
    console.log(response);
    
    // Om borttagningen lyckas, ta bort ordern från listan i UI:t
    setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));

    console.log(`Ordern ${orderId} har tagits bort.`);
  } catch (error) {
    console.error('Kunde inte ta bort order', error);
    console.log('Kunde inte ta bort ordern. Försök igen senare.');
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
              <p><strong>Önskemål:</strong> {order.specialRequests}</p>
              <p><strong>Status:</strong> {order.available ? "Klar" : "Inte klar"}</p>
              <p><strong>Skapad:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </aside>
            <article className="switch-container">
            <label className="switch">
                <input
                   type="checkbox"
                   onChange={() => lockOrder(order.orderId)} // Anropar lockfunktion när checkbox ändras
                 />
                <span className="slider round"></span>
                <p className="switch-text">Låsa order</p>
              </label>
              <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
                <p className="switch-text">Bekräfta order</p>
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => deleteOrder(order.orderId)}  // Anropar deleteOrder när checkbox ändras
                />
                <span className="slider round"></span>
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
