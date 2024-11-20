import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import MenyPage from './pages/menypage/MenyPage';
import InfoPage from './pages/infopage/InfoPage';
import LandingPage from './pages/landingpage/LandingPage';
import './index.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/meny" element={<MenyPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;

