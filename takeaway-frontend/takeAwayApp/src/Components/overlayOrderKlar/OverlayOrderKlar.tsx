import './overlayOrderKlar.css';
import { motion } from 'framer-motion';

function OverlayOrderKlar() {
  return (
    <section className="overlayOrderKlar">
      <h1 className="orderRubrik">Din order är klar om:</h1>
      <p className="orderTid">15 minuter</p>

      <div className="fishContainer">
        <motion.div
          className="fishWithText"
          initial={{ x: '-150%' }}
          animate={{ x: '150%' }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 3,
              ease: 'linear',
            }
          }}
        >
          <motion.img
            src="/dödFisk.svg"
            alt="Surströmmingsfisk"
            className="fishImage"
            style={{ rotate: '45deg' }}
          />
          <motion.span className="rotatingText">Strömming på Språng</motion.span>
        </motion.div>
      </div>

      <div className="footerText">
        <img src="/Location.svg" alt="Location Icon" className="locationIcon" />
        <div className="footerTextContent">
          <p>Hämta din mat här:</p>
          <p>Surströmmingsvägen 1</p>
          <p>113 51 Norrland</p>
        </div>
      </div>
    </section>
  );
}

export default OverlayOrderKlar;

// Rindert
// Sista sidan i flödet. visar hur länge det är kvar tills maten är färdig