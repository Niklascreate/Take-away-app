import './overlayorder.css';

interface OverlayOrderProps {
    onClose: () => void;
}

function OverlayOrder({ onClose }: OverlayOrderProps) {
    return (
        <section className="orderOverlay_container">
            <section className="orderOverlay_header">
                <h1>Din Order</h1>
                <img
                    src="src/assets/stängKnapp.png"
                    alt="Close Button"
                    className="orderOverlay_close"
                    onClick={onClose}
                />
            </section>
            <section className="center_container">
                <section className="orderOverlay_order">
                    <p className="orderOverlay_text">1</p>
                    <p className="orderOverlay_text">Norrlandsplanka</p>
                    <p className="orderOverlay_price">99 SEK</p>
                </section>
                <section className="orderOverlay_delete__container">
                    <p className="orderOverlay_change">Ändra</p>
                    <p className="orderOverlay_delete">Ta bort</p>
                </section>
                <section className="orderOverlay_inputs">
                    <input type="text" placeholder="Namn" />
                    <input type="email" placeholder="E-post" />
                    <input type="tel" placeholder="Telefonnummer" />
                </section>
            </section>
            <section className="orderOverlay_totalPrice">
                <p className="orderOverlay_totalPrice__total">Total</p>
                <p className="orderOverlay_totalPrice__price">148 SEK</p>
            </section>
            <button className="orderOverlay_orderButton">Beställ 148 SEK</button>
        </section>
    );
}

export default OverlayOrder;
