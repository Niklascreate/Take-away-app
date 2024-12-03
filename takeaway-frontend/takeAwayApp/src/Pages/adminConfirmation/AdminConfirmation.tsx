import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { useState, useEffect } from "react";
import { adminOrders , addCommentToOrder } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";

function AdminConfirmation() {
  const [orders, setOrders] = useState<AdminPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentOrderId, setCommentOrderId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

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

  const handleAddComment = async (orderId: string) => {
    try {
      await addCommentToOrder(orderId, comment); // Skickar kommentar till API
      console.log(`Kommentar tillagd för order ${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, comment } : order
        )
      ); // Uppdatera lokalt state
      setCommentOrderId(null); // Stänger kommentarsfältet
      setComment(""); // Rensar inputfältet
    } catch (error) {
      console.error("Kunde inte lägga till kommentar:", error);
      setError("Kunde inte lägga till kommentar.");
    }
  };

  return (
    <section className="confirmation_container">
      <h1 className="confirmation_header">Bekräftelse av Order</h1>
      <button className="loggout">Logga ut</button>

      {loading && <p>Laddar ordrar...</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="box-order">
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
              <p><strong>Status:</strong> Inte klar</p>
              <p>
                <strong>Skapad:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </aside>
            <article className="button-container">
              <button className="switch lock">Bekräfta</button>
              <button
                className="switch lock"
                onClick={() =>
                  setCommentOrderId(commentOrderId === order.orderId ? null : order.orderId)
                }
              >
                Meddelande
              </button>
              <button className="switch lock">Lås</button>
              <button className="switch lock">Ta bort</button>
            </article>
            {commentOrderId === order.orderId && (
              <div className="comment-section">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Skriv din kommentar här"
                  className="comment-input"
                />
                <button
                  className="switch lock"
                  onClick={() => handleAddComment(order.orderId)}
                >
                  Lägg till kommentar
                </button>
              </div>
            )}
          </section>
        ))}
      </section>
      <Nav />
    </section>
  );
}

export default AdminConfirmation;
