import ChangeOrderBtn from "../changeorderbtn/ChangeOrderBtn";
import './overlayconfirmation.css';

function OverlayConfirmation() {
    return (
        <section className="overlay-container">
            <section className="overlay-box">
                <article className="box-img__one">
                    <h2 className="confirmation-title">Orderbekräftelse</h2>
                    <img className="close-overlay" src="src/assets/stängKnapp.png" alt="" />
                </article>

                <section className="box-wrapper">
                <article className="box-img__two">
                    <img className="box-img" src="src/assets/ShoppingBag.svg" alt="" />
                    <p className="pickUp">Avhämtning</p>
                </article>

                <article className="box-img__three">
                        <img className="box-img box-position" src="/plats.svg" alt="" />
                        <p className="pickUp-adress">Surströmmingsvägen 1</p>
                        <p className="pickUp-adress">113 51 Norrland</p>
                    </article>
                </section>

                <article className="box-order">
                    <h3 className="your-order__title">Din order</h3>
                    <aside className="order-list">
                        <p>Norrlandsplanka</p>
                        <p>99 sek</p>
                    </aside>
                    <aside className="order-list">
                        <p>Öl</p>
                        <p>49 sek</p>
                    </aside>
                    <aside className="order-list order-total">
                        <p>Total:</p>
                        <p>148 sek</p>
                    </aside>
                    <p className="change-order">Behöver du ändra din order?</p>
                </article>
                <ChangeOrderBtn />
                <h2 className="countdown-title">Din order skickas strax...</h2>
                <p className="countdown-info">Du blir automatiskt omdirigerad när ordern skickas.</p>
            </section>
        </section>
    );
}

export default OverlayConfirmation;
