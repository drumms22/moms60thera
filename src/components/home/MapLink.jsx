import React from 'react';

const MapLink = ({
    children
}) => {
  const address = '1250 Strandwyck Dr, Monroe, MI 48161';
  const lat = 41.910231;
  const lng = -83.427226;

  const openMap = () => {
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    
    let mapUrl;

    if (isIOS) {
      // Use Apple Maps for iOS
      mapUrl = `http://maps.apple.com/?q=${address}`;
    } else {
      // Use Google Maps for Android and other platforms
      mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    }

    // Redirect the user to the appropriate map URL
    window.open(mapUrl, '_blank');
  };

  return (
    <div
    onClick={openMap} style={{ cursor: 'pointer'}}
    >
  
      {
        children
      }
    </div>
  );
};

export default MapLink;