import './overlayorder.css'

function OverlayOrder() {
    return (
        <section className="orderOverlay_container">
            <section className="orderOverlay_header">
                <h1 className="orderOverlay_header">din order</h1>
                <img src="src/assets/stängKnapp.png" alt="Close Button" className="orderOverlay_close" />
            </section>
            <section className="center_container">
            <section className="orderOverlay_order">
                <p className="orderOverlay_text">1</p>
                <p className="orderOverlay_text">Norrlandsplanka</p>
                <p className="orderOverlay_price">99 sek</p>
            </section>
            <section className="orderOverlay_delete__container">
                <p className="orderOverlay_change">Ändra</p>
                <p className="orderOverlay_delete">Tabort</p>
            </section>
            </section>
            <section className="orderOvelay_totalPrice">
                <p className="orderOvelay_totalPrice__total">Total</p>
                <p className="orderOverlay_totalPrice__price">148 sek</p>
            </section>
            <button className="orderOverlay_orderButton">Beställ 148 sek</button>
        </section>
    )
}

export default OverlayOrder
