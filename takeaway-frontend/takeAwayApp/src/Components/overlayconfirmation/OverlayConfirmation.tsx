import { useState, useEffect } from "react";
import { fetchOrder } from "../../../api/Api";
import { OrderItem } from "../../../interface/Interface";
import './overlayconfirmation.css';
import ChangeOrderBtn from "../changeorderbtn/ChangeOrderBtn";

function OverlayConfirmation() {
    const [latestOrder, setLatestOrder] = useState<OrderItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getOrderItems = async () => {
            try {
                const data = await fetchOrder();
                console.log(data); // Logga hela datan för att kontrollera strukturen

                if (data && data.length > 0) {
                    // Sortera och hitta den senaste ordern baserat på createdAt
                    const latestOrder = data.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )[0];

                    console.log("Senaste ordern:", latestOrder); // Logga senaste ordern för att inspektera strukturen

                    if (latestOrder) {
                        setLatestOrder(latestOrder);
                    } else {
                        setError("Ingen order att visa.");
                    }
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
        window.location.href = '/meny';
    };

    if (loading) return <p>Laddar order...</p>;
    if (error) return <p>{error}</p>;
    if (!latestOrder) return <p>Ingen order att visa.</p>;

    return (
        <section className="overlay-container">
            <section className="overlay-box">
                <article className="box-img__one">
                    <h2 className="confirmation-title">Orderbekräftelse</h2>
                    <img className="close-overlay" src="/stängKnapp.svg" alt="Stäng" onClick={closeOverlay} />
                </article>

                <section className="box-wrapper">
                    <article className="box-img__three">
                        <img className="box-img box-position" src="/plats.svg" alt="Plats" />
                        <p className="pickUp-adress">Surströmmingsvägen 1</p>
                        <p className="pickUp-adress">113 51 Norrland</p>
                    </article>
                </section>

                <article className="box-order">
                    <h3 className="your-order__title">Din order</h3>
                    {/* Rendera den senaste beställningen direkt */}
                    <aside className="order-list">
                        <p>
                            {latestOrder.dishName} (x{latestOrder.quantity})
                            <ChangeOrderBtn order={{ orderId: latestOrder.orderId, id: latestOrder.id, quantity: latestOrder.quantity }} />
                        </p>
                        <p>{latestOrder.price} SEK</p>
                    </aside>

                    <aside className="order-list order-total">
                        <p>Total:</p>
                        <p>{latestOrder.price * latestOrder.quantity} SEK</p>
                    </aside>
                    <p className="change-order">Behöver du ändra din order?</p>
                </article>
                <h2 className="countdown-title">Din order skickas strax...</h2>
            </section>
        </section>
    );
}

export default OverlayConfirmation;
