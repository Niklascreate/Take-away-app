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
      <motion.img
        src="rundLogga.svg"
        alt="rund logga"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
        className="animated-logo"
      />
    </div>
  );
}

export default LandingPage;
