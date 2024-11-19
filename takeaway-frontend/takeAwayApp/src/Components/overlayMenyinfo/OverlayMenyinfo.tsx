import { useState } from 'react';
import './overlaymenyInfo.css';
import { Dish } from '../../../interface/interface';

interface OverlayMenyInfoProps {
    stängOverlay: () => void;
    rätt: Dish;
}

function OverlayMenyInfo({ stängOverlay, rätt }: OverlayMenyInfoProps) {
    const [antal, setAntal] = useState<number>(1);

    const ökaAntal = () => setAntal((prevAntal) => prevAntal + 1);
    const minskaAntal = () => {
        if (antal > 1) setAntal((prevAntal) => prevAntal - 1);
    };

    const totaltPris = rätt.price * antal;

    return (
        <section className="overlay">
            <section className="overlayInnehåll">
                {/* Koppla onClick-händelsen här */}
                <img 
                    src="src/assets/stängKnapp.png" 
                    alt="Stäng" 
                    className="stängKnapp" 
                    onClick={stängOverlay} 
                />
                <section className="bildContainer">
                    <img src={rätt.imageUrl} alt={rätt.name} className="rättBild" />
                </section>

                <h1 className="rättTitel">{rätt.name}</h1>
                <p className="rättBeskrivning">{rätt.description}</p>

                <textarea
                    className="meddelandeInput"
                    placeholder="Skicka ett meddelande till kocken..."
                    rows={4}
                />

                <section className="åtgärderContainer">
                    <section className="räknare">
                        <button className="knappRäknare" onClick={minskaAntal}>
                            <img src="src/assets/minus.png" alt="Minus" className="knappBild" />
                        </button>
                        <span className="antal">{antal}</span>
                        <button className="knappRäknare" onClick={ökaAntal}>
                            <img src="src/assets/plus.png" alt="Plus" className="knappBild" />
                        </button>
                    </section>
                    <button className="läggTillKnapp">
                        Lägg i varukorg <span>{totaltPris} SEK</span>
                    </button>
                </section>
            </section>
        </section>
    );
}

export default OverlayMenyInfo;
