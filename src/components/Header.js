import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tabLinks from './tabsConfig'; // Import tab configuration
import './Header.css';

function Header({ selectedTabs = [] }) {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [hoveredTab, setHoveredTab] = useState(null); // Manage hover states

    // Handle navigation to platform
    const handleSwitchClick = () => {
        navigate("/platform"); // Navigate to the Platform view
    };

    // Sort tabs based on the original order in tabsConfig
    const orderedTabs = Object.keys(tabLinks).filter((tabId) => selectedTabs.includes(tabId));

    return (
        <div className="header">
            {/* Add the logo */}
            <img src="/path-to-logo.png" alt="Logo" className="header-logo" />

            {/* Render tabs dynamically based on orderedTabs */}
            {orderedTabs.map((tabId) => {
                const tab = tabLinks[tabId]; // Get tab configuration by ID
                if (!tab) return null; // Safeguard: Skip if tab configuration is not found

                return (
                    <div
                        key={tabId}
                        className="nav-item"
                        onMouseEnter={() => setHoveredTab(tabId)}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        {/* Main Tab Link */}
                        <Link to={tab.path}>{tab.label}</Link>

                        {/* Render dropdown if the tab has a dropdown */}
                        {hoveredTab === tabId && tab.dropdown && (
                            <div className="dropdown">
                                {tab.dropdown.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="dropdown-item"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Switch to Platform Button */}
            <button
                className="switch-to-platform-btn"
                onClick={handleSwitchClick}
            >
                Switch to Platform
            </button>
        </div>
    );
}

export default Header;
