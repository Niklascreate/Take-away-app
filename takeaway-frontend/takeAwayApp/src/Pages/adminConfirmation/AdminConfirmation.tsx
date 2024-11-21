import Nav from '../../components/nav/Nav'
import './adminconfirmation.css'

function AdminConfirmation() {
    return (
        <section className="confirmation_container">
            <h1 className="confirmation_header">Bekräftelse av Order</h1>
            <section className="box-order">
                <h3 className="your-order__title">Redo att bekräfta</h3>
                <section className="confirmation_card">
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
                <label className="switch">
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </label>
                </section>

                <section className="confirmation_card">
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
                <label className="switch">
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </label>
                </section>

                <section className="confirmation_card">
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
                <label className="switch">
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </label>
                </section>

                <section className="confirmation_card">
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
                <label className="switch">
                    <input type="checkbox"/>
                        <span className="slider round"></span>
                </label>
                </section>
            </section>
            <Nav />
        </section>
    )
}

export default AdminConfirmation