import React from 'react';

const CircuitInfo = ({ circuit }) => {
  const getGoogleMapsUrl = (lat, long) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold mb-4">Circuit Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base sm:text-mobile-base">
        <div>
          <p className="font-medium">Circuit Name:</p>
          <p className="text-muted-foreground">{circuit.circuitName}</p>
        </div>
        <div>
          <p className="font-medium">Location:</p>
          <p className="text-muted-foreground">{circuit.Location.locality}, {circuit.Location.country}</p>
        </div>
        {circuit.Location.lat && circuit.Location.long && (
          <div>
            <p className="font-medium">Coordinates:</p>
            <a 
              href={getGoogleMapsUrl(circuit.Location.lat, circuit.Location.long)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {circuit.Location.lat}, {circuit.Location.long}
            </a>
          </div>
        )}
        {circuit.url && (
          <div>
            <p className="font-medium">More Info:</p>
            <a 
              href={circuit.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              Official Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircuitInfo;
