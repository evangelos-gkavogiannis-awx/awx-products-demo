// src/pages/Issuing.js
import React from 'react';
import './Issuing.css';
import issuingImage from '../assets/issuing-image.svg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



function Issuing() {
    const navigate = useNavigate();
    
    return (
      <div className="issuing-container">
        <div className="buttons-container">
          <div className="button-item">
            <button>Card Authorisations</button>
            <p className="button-description">View authorisations against individual cards</p>
          </div>
          <div className="button-item">
            <button>Cardholders</button>
            <p className="button-description">Create cardholders</p>
          </div>
          <div className="button-item">
          <button onClick={() => navigate('/cards')}>Cards</button>
            <p className="button-description">Issue Visa cards</p>
          </div>
          <div className="button-item">
            <button>Configuration</button>
            <p className="button-description">View config for cards such as default and maximum limit</p>
          </div>
        </div>
        <div className="image-container">
          <img src={issuingImage} alt="Airwallex Visa Card" />
        </div>
      </div>
    );
  }

export default Issuing;
