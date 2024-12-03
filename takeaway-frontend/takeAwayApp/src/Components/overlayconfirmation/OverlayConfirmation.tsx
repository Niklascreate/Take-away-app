import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchOrder } from "../../../api/Api";
import { OrderItem } from "../../../interface/Interface";
import "./overlayconfirmation.css";
import ChangeOrderBtn from "../changeorderbtn/ChangeOrderBtn";

function OverlayConfirmation() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const data = await fetchOrder();
        console.log(data);

        if (data && data.length > 0) {
          const sortedOrders = data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          const latestOrderId = sortedOrders[0].orderId;
          const filteredOrders = sortedOrders.filter(
            (order) => order.orderId === latestOrderId
          );
          console.log("Alla ordrar med senaste orderId:", filteredOrders);

          setOrders(filteredOrders);
        } else {
          setError("Inga ordrar hittades.");
        }
      } catch (err) {
        setError("Kunde inte hämta orderdata.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrderItems();
  }, []);

  const closeOverlay = () => {
    navigate("/meny");
  };

  const removeOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  if (loading) return <p>Laddar order...</p>;

  if (error) return <p>{error}</p>;

  if (orders.length === 0) return <p>Ingen order att visa.</p>;

  return (
    <section className="overlay-container">
      <section className="overlay-box">
        <article className="box-img__one">
          <h2 className="confirmation-title">Orderbekräftelse</h2>
          <img
            className="close-overlay"
            src="/stängKnapp.svg"
            alt="Stäng"
            onClick={closeOverlay}
          />
        </article>

        <section className="box-wrapper">
          <article className="box-img__three">
            <img
              className="box-img box-position"
              src="/plats.svg"
              alt="Plats"
            />
            <p className="pickUp-adress">Surströmmingsvägen 1</p>
            <p className="pickUp-adress">113 51 Norrland</p>
          </article>
        </section>

        <article className="box-order">
          <h3 className="your-order__title">Din order</h3>
          {orders.map((item, index) => (
            <aside key={index} className="order-list">
              <p>
                {item.dishName} (x{item.quantity})
                <ChangeOrderBtn
                  order={{
                    orderId: item.orderId,
                    id: item.id,
                    quantity: item.quantity,
                  }}
                  onRemove={removeOrder}
                />
              </p>
              <p>{item.price} SEK</p>
            </aside>
          ))}

          <aside className="order-list order-total">
            <p>Total:</p>
            <p>
              {orders.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
              SEK
            </p>
          </aside>
        </article>
        <h2 className="countdown-title">
          Din order skickas strax
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </h2>
      </section>
    </section>
  );
}

export default OverlayConfirmation;
