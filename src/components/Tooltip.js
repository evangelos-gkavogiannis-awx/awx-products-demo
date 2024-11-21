// src/components/Tooltip.js
import React from 'react';
import './Tooltip.css';

const Tooltip = ({ content, position = 'top' }) => (
  <div className={`tooltip ${position}`}>
    <span className="tooltip-content">{content}</span>
  </div>
);

export default Tooltip;
