import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InfoPage from './Pages/infoPage/InfoPage';
import MenyPage from './Pages/menyPage/MenyPage';
import LandingPage from './Pages/landingPage/LandingPage';
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


