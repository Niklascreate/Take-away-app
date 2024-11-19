import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoPage from './pages/infopage/InfoPage';
import MenyPage from './pages/menypage/MenyPage';
import LandingPage from './pages/landingpage/LandingPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/meny" element={<MenyPage />} />
      </Routes>
    </Router>
  );
}

export default App;


