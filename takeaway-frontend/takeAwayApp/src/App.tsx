import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import MenyPage from './pages/menypage/MenyPage';
import InfoPage from './pages/infopage/InfoPage';
import LandingPage from './pages/landingpage/LandingPage';

import './index.css';
import OverlayOrder from './Components/overlayorder/OverlayOrder';
import OverlayConfirmation from './Components/overlayconfirmation/OverlayConfirmation';
import AdminConfirmation from './Pages/adminConfirmation/AdminConfirmation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/meny" element={<MenyPage />} />
        <Route path="/overlayorder" element={<OverlayOrder />} />
        <Route path="/adminconfirmation" element={<AdminConfirmation />} />
        <Route path="/overlayconfirmation" element={<OverlayConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;

