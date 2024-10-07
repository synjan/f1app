import React from 'react';

const CircuitInfo = ({ circuit }) => {
  const getGoogleMapsUrl = (lat, long) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
  };

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{circuit.circuitName}</h3>
      <div className="space-y-2">
        <p><span className="font-medium">Location:</span> {circuit.Location.locality}, {circuit.Location.country}</p>
        {circuit.Location.lat && circuit.Location.long && (
          <p>
            <span className="font-medium">Coordinates:</span>{' '}
            <a 
              href={getGoogleMapsUrl(circuit.Location.lat, circuit.Location.long)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {circuit.Location.lat}, {circuit.Location.long}
            </a>
          </p>
        )}
        {circuit.url && (
          <p>
            <span className="font-medium">More info:</span>{' '}
            <a 
              href={circuit.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              Official Website
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default CircuitInfo;
