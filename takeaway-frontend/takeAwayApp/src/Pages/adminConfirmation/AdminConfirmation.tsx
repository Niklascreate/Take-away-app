import { useState, useEffect } from "react";
import { adminOrders,addCommentToOrder,adminDeleteOrder,lockOrder } from "../../../api/Api";
import { AdminPage } from "../../../interface/Interface";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/Nav";
import "./adminconfirmation.css";
import { adminQuantity } from "../../../api/Api";

function AdminConfirmation() {
  const [orders, setOrders] = useState<Record<string, AdminPage[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [commentOrderId, setCommentOrderId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [blinkStatus, setBlinkStatus] = useState<string | null>(null);
  const [lockedButtons, setLockedButtons] = useState<Record<string, boolean>>(
    {}
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminOrders();

        const groupedOrders = data.reduce(
          (
            acc: Record<
              string,
              { customerInfo?: AdminPage; dishes: AdminPage[] }
            >,
            order: AdminPage
          ) => {
            if (!acc[order.orderId]) {
              acc[order.orderId] = { customerInfo: undefined, dishes: [] };
            }

            if (order.id === "kunduppgifter") {
              acc[order.orderId].customerInfo = order;
            } else {
              acc[order.orderId].dishes.push(order);
            }

            return acc;
          },
          {}
        );

        const uppdateradeOrdrar = Object.entries(groupedOrders).reduce(
          (
            acc: Record<string, AdminPage[]>,
            [orderId, { customerInfo, dishes }]
          ) => {
            const uppdateradeRätter = dishes.map((dish) => ({
              ...dish,
              customerName: customerInfo?.customerName || "Okänd kund",
              email: customerInfo?.email || "Okänd e-post",
              phoneNumber: customerInfo?.phoneNumber || "Okänt telefonnummer",
            }));

            acc[orderId] = uppdateradeRätter;
            return acc;
          },
          {}
        );

        setOrders(uppdateradeOrdrar);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrder = async (
    orderId: string,
    itemId: string,
    newQuantity: number
  ) => {
    try {
    
      await adminQuantity(orderId, itemId, newQuantity);
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        updatedOrders[orderId] = updatedOrders[orderId].map((order) =>
          order.id === itemId ? { ...order, quantity: newQuantity } : order
        );
        return updatedOrders;
      });
    } catch (error) {
      console.error("Misslyckades med att uppdatera kvantitet:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const items = orders[orderId];
      for (const item of items) {
        await adminDeleteOrder(orderId, item.id);
      }

      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        delete updatedOrders[orderId];
        return updatedOrders;
      });
    } catch (error) {
      console.error(`Misslyckades med att ta bort order ${orderId}:`, error);
    }
  };

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

  // Funktion för att låsa en order
  const handleLockOrder = async (orderId: string, id: string) => {
    try {
      await lockOrder(orderId, id);

      // Uppdatera låst status i lokalt tillstånd
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };
        updatedOrders[orderId] = updatedOrders[orderId].map((order) =>
          order.id === id ? { ...order, isLocked: true } : order
        );
        return updatedOrders;
      });

      // Markera knappen som låst
      setLockedButtons((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.error("Misslyckades med att låsa order:", error);
    }
  };

  // Funktion för att lägga till en kommentar
  const handleAddComment = async (orderId: string) => {
    setLoadingComment(true);
    try {
      await addCommentToOrder(orderId, comment);
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

  //Rensa sessionstorage och logga ut admin
  const handleLogout = () => {
    sessionStorage.removeItem("username");
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
        {Object.entries(orders)
          .filter(([_orderId, orderItems]) => orderItems.length > 0)
          .map(([orderId, orderItems]) => (
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
                    className={`status ${
                      blinkStatus === orderId ? "blink" : ""
                    }`}
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
                      <aside>{item.dishName}</aside>
                      <aside>Antal: {item.quantity}</aside>
                      <aside>Önskemål: {item.specialRequests || "Inga"}</aside>
                      <aside className="admin-update">
                        <button
                          className="lock-btn"
                          onClick={() => handleLockOrder(orderId, item.id)}
                          disabled={item.isLocked}
                          style={{
                            backgroundColor: lockedButtons[item.id]
                              ? "green"
                              : "black",
                          }}
                        >
                          {item.isLocked ? "Låst" : "Lås"}
                        </button>
                        <button
                          className="quantity-btn"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateOrder(orderId, item.id, item.quantity - 1);
                            }
                          }}
                        >
                          -
                        </button>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateOrder(orderId, item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </aside>
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
                    setCommentOrderId(
                      commentOrderId === orderId ? null : orderId
                    )
                  }
                >
                  Meddelande
                </button>
                <button
                  className="switch lock"
                  onClick={() => handleDeleteOrder(orderId)}
                >
                  Ta bort
                </button>
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


//Niklas, Jonas
//En adminsida som hämtar alla ordrar från databasen. Man kan lägga till/ta bort rätt, lås en order, bekräfta order, ta bort en order.