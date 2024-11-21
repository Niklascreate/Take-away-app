import './infopage.css';
import { motion } from 'framer-motion';
import Nav from "../../components/nav/Nav";
import Header from '../../components/header/Header';

function InfoPage() {
    return (
        <>
        <Header />
        <section className="infoPageWrapper">
            <>
                <motion.section
                    className="historia"
                    initial={{ x: '-100vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: 'easeInOut'
                    }}
                >
                    <h1 className="historiaH1">Vår Historia</h1>
                    <img src="/sture.png" alt="Bild på Sture" />
                    <p className="bildText">Porträtt av Sture Ström</p>
                    <p className="historiaInfoText">
                        I en liten kustby i Norrland fanns en fiskare vid namn Sture Ström som älskade strömming i alla dess former. En dag när han råkade tappa en burk surströmming över bord,
                        spred sig en doft så stark att alla måsar flög iväg utom en, som verkade förtjust. Inspirerad av den stunden beslöt Sture att skapa en snabbmatsrestaurang för att dela sin passion.
                        Så föddes "Strömming på Språng", en plats där traditionell surströmming möter moderna smaker, perfekt för den som är på språng men ändå vill uppleva en smakbit av norrländsk kultur.
                    </p>
                </motion.section>


                <motion.section
                    className="kontakt"
                    initial={{ x: '100vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: 'easeInOut'
                    }}
                >
                    <h2 className="kontaktH2">Kontakt</h2>
                    <h3 className="kontaktMailLabel">Email:</h3>
                    <h3 className="kontaktMail">info@strommingpasprang.se</h3>

                    <h3 className="kontaktTelefonLabel">Mobil:</h3>
                    <h3 className="kontaktTelefon">070-123 45 67</h3>

                    <form className="kontaktForm">
                        <label htmlFor="message">Skicka ett meddelande:</label>
                        <textarea id="message" placeholder="Skriv ditt meddelande här..." rows={5}></textarea>
                        <button type="submit">Skicka</button>
                    </form>
                </motion.section>
                <Nav />
            </>
        </section>
        </>
    );
}

export default InfoPage;


//Rindert
// infosida om företaget 
