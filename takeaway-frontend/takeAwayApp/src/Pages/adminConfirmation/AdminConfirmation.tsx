import { useState, useEffect } from "react";
import { adminOrders, addCommentToOrder } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";

function AdminConfirmation() {
  const [orders, setOrders] = useState<Record<string, AdminPage[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [commentOrderId, setCommentOrderId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [blinkStatus, setBlinkStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminOrders();
        console.log("API Response:", data);
        const groupedOrders = data.reduce(
          (acc: Record<string, AdminPage[]>, order: AdminPage) => {
            if (!acc[order.orderId]) {
              acc[order.orderId] = [];
            }
            acc[order.orderId].push(order);
            return acc;
          },
          {}
        );
        setOrders(groupedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const handleConfirmOrder = (orderId: string) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      updatedOrders[orderId] = updatedOrders[orderId].map((order) => ({
        ...order,
        status: "klar",
      }));
      return updatedOrders;
    });

    setBlinkStatus(orderId);

    setTimeout(() => {
      setBlinkStatus(null);
    }, 1000);
  };

  const handleAddComment = async (orderId: string) => {
    setLoadingComment(true);
    try {
      await addCommentToOrder(orderId, comment);
      console.log(`Kommentar tillagd för order ${orderId}`);
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        updatedOrders[orderId] = updatedOrders[orderId].map((order) => ({
          ...order,
          comment: comment,
        }));
        return updatedOrders;
      });
      setCommentOrderId(null);
      setComment("");
    } catch (error) {
      console.error("Kunde inte lägga till kommentar:", error);
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
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${blinkStatus === orderId ? "blink" : ""}`}
                >
                  {orderItems[0]?.status || "inte klar"}
                </span>
              </p>
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
              <ul className="ul">
                {orderItems.map((item, index) => (
                  <li key={index}>
                    {item.dishName} - Antal: {item.quantity} - Önskemål:{" "}
                    {item.specialRequests}
                  </li>
                ))}
              </ul>
            </aside>
            <article className="button-container">
              <button
                className={`switch lock ${
                  orderItems[0]?.status === "klar" ? "confirmed" : ""
                }`}
                onClick={() => handleConfirmOrder(orderId)}
              >
                Bekräfta
              </button>
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
              <article className="kommentar-container">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Skriv din kommentar här"
                  className="kommentar-input"
                />
                <button
                  className="switch lock"
                  onClick={() => handleAddComment(orderId)}
                  disabled={loadingComment}
                >
                  {loadingComment ? "Skickar..." : "Lägg till kommentar"}
                </button>
              </article>
            )}
          </section>
        ))}
      </section>
      <Nav />
    </section>
  );
}

export default AdminConfirmation;
