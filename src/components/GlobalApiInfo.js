// src/components/GlobalApiInfo.js
import React, { useState } from 'react';
import './GlobalApiInfo.css';

function GlobalApiInfo({ endpoint, jsonResponse }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="api-info-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="api-info-tooltip">
          <strong>API Endpoint:</strong> <span>{endpoint}</span>
          <pre>{JSON.stringify(jsonResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GlobalApiInfo;
