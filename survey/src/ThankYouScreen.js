import React, { useEffect } from 'react';

const ThankYouScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload(); 
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>Thank you for your time!</h2>
      <p>Returning to the welcome screen...</p>
    </div>
  );
};

export default ThankYouScreen;
