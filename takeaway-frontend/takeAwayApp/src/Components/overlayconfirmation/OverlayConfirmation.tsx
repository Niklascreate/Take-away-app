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
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const [latestOrderId, setLatestOrderId] = useState<string | null>(null);

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const data = await fetchOrder();

        if (data && data.length > 0) {
          const validOrders = data.filter((order) => order.id !== "summary");

          const sortedOrders = validOrders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          const latestOrder = sortedOrders[0];
          setLatestOrderId(latestOrder?.orderId || null);

          const filteredOrders = sortedOrders.filter(
            (order) => order.orderId === latestOrder?.orderId && order.dishName
          );

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

  useEffect(() => {
    if (!latestOrderId) return;

    const intervalId = setInterval(async () => {
      try {
        const data = await fetchOrder();

        const lockedOrder = data.some(
          (order: any) => order.orderId === latestOrderId && order.isLocked
        );
        if (lockedOrder) {
          setIsLocked(true);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Fel vid hämtning av order:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [latestOrderId]);

  const closeOverlay = () => {
    navigate("/meny");
  };

  const removeOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  const updateOrderQuantityInState = (id: string, newQuantity: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, quantity: newQuantity } : order
      )
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
              <section>
                <section className="order_container">
                  <p className="order_name">{item.dishName}</p>
                  <p className="order_price">{item.price} sek</p>
                </section>
                <ChangeOrderBtn
                  order={{
                    orderId: item.orderId,
                    id: item.id,
                    quantity: item.quantity,
                  }}
                  onRemove={removeOrder}
                  onQuantityChange={updateOrderQuantityInState}
                />
              </section>
            </aside>
          ))}

          <aside className="order-list order-total">
            <p className="order_totalHeader">Total:</p>
            <p className="order_total">
              {orders.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}{" "}
              sek
            </p>
          </aside>
        </article>

        {/* Ändra text baserat på isLocked */}
        <h2 className="countdown-title">
          {isLocked
            ? "Din order är mottagen, välkommen att hämta på Surströmmingsvägen 1, 113 51 Norrland"
            : "Din order skickas strax..."}
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
