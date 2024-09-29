import React, { useState, useEffect } from 'react';
//import './Alert.css'; // Import the CSS for styling

const Alert = ({ message, type = 'info', delay = 3000, onClose = () => null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the alert when the component mounts
    setIsVisible(true);

    // Set a timer to hide the alert after the specified delay
    const timer = setTimeout(() => {
      setIsVisible(false); // Auto-hide the alert
      onClose();
    }, delay);

    // Clean up the timer when the component unmounts or re-renders
    return () => clearTimeout(timer);
  }, [delay]);

  // Render the alert only if it's visible
  if (!isVisible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      {/* <button className="close-btn" onClick={() => setIsVisible(false)}>
        &times;
      </button> */}
    </div>
  );
};

export default Alert;