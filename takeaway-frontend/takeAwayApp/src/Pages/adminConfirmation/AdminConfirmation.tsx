import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { useState, useEffect } from "react";
import { adminOrders, addCommentToOrder } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";
import { useNavigate } from "react-router-dom";

function AdminConfirmation() {
  const [orders, setOrders] = useState<Record<string, AdminPage[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [commentOrderId, setCommentOrderId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loadingComment, setLoadingComment] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminOrders();
        const groupedOrders = data.reduce((acc: Record<string, AdminPage[]>, order: AdminPage) => {
          if (!acc[order.orderId]) {
            acc[order.orderId] = [];
          }
          acc[order.orderId].push(order);
          return acc;
        }, {});
        setOrders(groupedOrders);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAddComment = async (orderId: string) => {
    setLoadingComment(true);
    try {
      await addCommentToOrder(orderId, comment);
      console.log(`Kommentar tillagd för order ${orderId}`);
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        updatedOrders[orderId] = updatedOrders[orderId].map((order) => ({
          ...order,
          comment,
        }));
        return updatedOrders;
      });
      setCommentOrderId(null);
      setComment("");
    } catch {
      console.error("Kunde inte lägga till kommentar.");
    } finally {
      setLoadingComment(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/meny");
  };

  return (
    <section className="confirmation_container">
      <h1 className="confirmation_header">Bekräftelse av Order</h1>
      <button className="loggout" onClick={handleLogout}>
        Logga ut
      </button>

      {loading && <p>Laddar ordrar...</p>}

      <section className="box-order">
        {Object.entries(orders).map(([orderId, orderItems]) => (
          <section className="confirmation_card" key={orderId}>
            <aside className="order-list">
              <p>
                <strong>Orderid:</strong> {orderId}
              </p>
              <p>
                <strong>Kund:</strong> {orderItems[0]?.customerName}
              </p>
              <p>
                <strong>E-mail:</strong> {orderItems[0]?.email}
              </p>
              <p>
                <strong>Telefon:</strong> {orderItems[0]?.phoneNumber}
              </p>
              <p>
                <strong>Status:</strong> inte klar</p>
              <p>
                <strong>Skapad:</strong>{" "}
                {new Date(orderItems[0]?.createdAt).toLocaleString()}
              </p>
              {orderItems[0]?.comment && (
                <p>
                  <strong>Kommentar:</strong> {orderItems[0]?.comment}
                </p>
              )}
              <p>
                <strong>Rätter:</strong>
              </p>
              <ul>
                {orderItems.map((item, index) => (
                  <li key={index}>
                    {item.dishName} - Antal: {item.quantity} - Önskemål: {item.specialRequests}
                  </li>
                ))}
              </ul>
            </aside>
            <article className="button-container">
              <button className="switch lock">Bekräfta</button>
              <button
                className="switch lock"
                onClick={() =>
                  setCommentOrderId(commentOrderId === orderId ? null : orderId)
                }
              >
                Meddelande
              </button>
              <button className="switch lock">Lås</button>
              <button className="switch lock">Ta bort</button>
            </article>
            {commentOrderId === orderId && (
              <div className="comment-section">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Skriv din kommentar här"
                  className="comment-input"
                />
                <button
                  className="switch lock"
                  onClick={() => handleAddComment(orderId)}
                  disabled={loadingComment}
                >
                  {loadingComment ? "Skickar..." : "Lägg till kommentar"}
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
