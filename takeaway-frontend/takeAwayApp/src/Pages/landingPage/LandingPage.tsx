import './landingpage.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handlePageClick = () => {
    navigate('/meny'); 
  };

  return (
    <div className='landingpage-container' onClick={handlePageClick}>
      <h1 className='landingpage-title'>STRÖMMING PÅ SPRÅNG</h1>
      <motion.img 
        className='landingpage-img' 
        src="/FishBone.svg" 
        alt="Fish Bone" 
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          duration: 2, 
          delay: 0.5,
          ease: "easeInOut"
        }}
      />
      <h3 className='landingpage-slogan'>Doft av norrländsk vind</h3>
    </div>
  );
}

export default LandingPage;
