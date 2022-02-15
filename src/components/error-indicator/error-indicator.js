import React from "react";

import './error-indicator.css';
import iconError from './death-star-error.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={iconError} alt='' />
            <span className="boom">OOOPS!</span>
            <span>
                Болтики открутились...
            </span>
            <span>
                (дройды уже чинят ༼ つ ◕_◕ ༽つ)
            </span>
        </div>
    );
};

export default ErrorIndicator;