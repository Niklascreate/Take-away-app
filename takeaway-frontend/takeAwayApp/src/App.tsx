import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import MenyPage from './pages/menypage/MenyPage';
import InfoPage from './pages/infopage/InfoPage';
import LandingPage from './pages/landingpage/LandingPage';
import './index.css';
import OverlayOrder from './components/overlayorder/OverlayOrder';
import OverlayConfirmation from './components/overlayconfirmation/OverlayConfirmation';
import AdminConfirmation from './Pages/adminconfirmation/AdminConfirmation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/meny" element={<MenyPage />} />
        <Route path="/overlayorder/" element={<OverlayOrder cart={[]} onClose={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/adminconfirmation" element={<AdminConfirmation />} />
        <Route path="/overlayconfirmation" element={<OverlayConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;

