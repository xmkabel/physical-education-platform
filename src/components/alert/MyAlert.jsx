import React from 'react';
import { motion } from 'framer-motion';
import './Alert.css';

const MyAlert = ({ type, message, onClose }) => {
  const alertVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  return (
    <div className="alert-wrapper">
      <motion.div
        className={`alertt alert-${type}`}
        role="alert"
        variants={alertVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ 
          type: "spring", 
          damping: 25,
          stiffness: 300
        }}
        onClick={onClose}
      >
        <div className="alert-content">
          <div className={`alert-icon alert-icon-${type}`}>
            {type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            )}
          </div>
          <div className="alert-message">{message}</div>
        </div>
        <button className="alert-close" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default MyAlert;