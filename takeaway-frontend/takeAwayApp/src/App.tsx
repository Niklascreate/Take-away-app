
import './index.css'
import MenyPage from './Pages/menyPage/MenyPage'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './Components/header/Header';
import Nav from './Components/nav/Nav';
import InfoPage from './Pages/infoPage/InfoPage';
import LandingPage from './Pages/landingPage/LandingPage';
import './index.css';


function App() {
  return (

    <MenyPage />
  )
}


export default App

    <Router>
      <Header />
     
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>

      <Nav />
    </Router>
  );
}

export default App;

