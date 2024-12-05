import './menuhero.css';
import { useState, useEffect } from 'react';

export default function Menuhero() {
  const images = [
    "/img/boatHouse.svg",
    "/img/boathouse2.svg",
    "/img/brygga.svg",
    "/img/boathouse3.svg",
    "/img/boat.svg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

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
      <div className="menu_heroContainer">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`menu hero ${index}`}
            className={`menu_hero ${
              index === currentImageIndex ? "visible" : "hidden"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


//Jonas, Rindert, Niklas