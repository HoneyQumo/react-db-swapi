import React from "react";

import './error-indicator.css';
import iconError from './death-star-error.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img
                src={iconError}
                alt="Error image"
            />
            <span className="boom">Ooops!</span>
            <span>
                Упс... Что-то пошло не так
            </span>
            <span>
                (дройды уже чинят ༼ つ ◕_◕ ༽つ)
            </span>
        </div>
    );
};

export default ErrorIndicator;