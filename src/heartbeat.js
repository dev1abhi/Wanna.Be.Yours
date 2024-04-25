import React, { useState, useEffect } from 'react';

function Heartbeat() {
  const [heartRates, setHeartRates] = useState([]);
  const [beatCount, setBeatCount] = useState(0);

  useEffect(() => {
    // Simulating live heart rate data
    const interval = setInterval(() => {
      const newHeartRate = Math.floor(Math.random() * (100 - 60) + 60); // Generate random heart rate between 60 and 100
      setHeartRates(prevHeartRates => [...prevHeartRates, newHeartRate]);
      setBeatCount(prevCount => prevCount + 1);

      if (beatCount === 80) {
        setHeartRates([]);
        setBeatCount(0);
      }
    }, 200); // Update every 500 milliseconds

    return () => clearInterval(interval);
  }, [beatCount]);

  return (
    <div className="heartbeat-container">
      <svg className="heartbeat-graph" viewBox="0 0 300 100">
        <polyline
          points={heartRates.map((rate, index) => `${index * 5},${100 - rate}`).join(' ')}
          fill="none"
          stroke="#ff0000"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default Heartbeat;


