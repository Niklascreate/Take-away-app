import './header.css'

export default function Header() {
    return (
        <section className='header_container'>
            <img src="src/assets/fishbone_small.svg" alt="fishbone" className="header_img" />
            <section className='header_heading__container'>
            <h1 className="header_heading">strömming på språng</h1>
            <h2 className="header_smallHeading">Doft av norrländsk vind</h2>
            </section>
        </section>
    )
}
