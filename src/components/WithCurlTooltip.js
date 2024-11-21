// src/components/WithCurlTooltip.js
import React from 'react';

const WithCurlTooltip = ({ children, curlCommand }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      data-tooltip
    >
      {children}
      {showTooltip && (
        <div className="tooltip top">
          <span className="tooltip-content">{curlCommand}</span>
        </div>
      )}
    </div>
  );
};

export default WithCurlTooltip;
