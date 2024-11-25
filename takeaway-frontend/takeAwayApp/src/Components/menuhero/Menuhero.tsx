import './menuhero.css'

export default function Menuhero() {
  return (
    <section className="menu_adress">
    <section className="menu_adressContainer">
    <p className="menu_adressHeader">Upphämtning</p>
    <p className="menu_adressText">
        Varning: Starka dofter och smaklökar på <br />
        Surströmmingsvägen 1 <br />
        113 51 Norrland <br />
        Kom för maten, stanna för andan - eller håll den!
    </p>
    </section>
    <img src="/boatHouse.svg" alt="Surströmming" className="menu_hero" />
</section>
  )
}
