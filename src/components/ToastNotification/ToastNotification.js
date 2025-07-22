import React, { useEffect, useState } from 'react';
import './ToastNotification.css'; // Add CSS in the next step

function ToastNotification({ show, message, type, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsExiting(false);
      const timer = setTimeout(() => {
        setIsExiting(true); // Start fade out animation
      }, 2500);
      const closeTimer = setTimeout(onClose, 3000); // Fully close after animation

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [show, onClose]);

  if (!show && !isExiting) {
    return null;
  }
  
  return (
    <div className="custom-toast-container">
      <div className={`custom-toast ${type} ${isExiting ? 'hide' : 'show'}`}>
        <div className="icon">
          <i className={`bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
        </div>
        <div className="text">
          <strong>{type === 'success' ? 'Success!' : 'Error!'}</strong>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ToastNotification;