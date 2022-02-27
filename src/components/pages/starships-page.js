import React from "react";
import { useNavigate } from "react-router-dom";

import { StarshipList } from '../sw-components';

const StarshipsPage = () => {

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <h2>
                Корабли
            </h2>
            <StarshipList
                onItemSelected={(itemId) => {
                    navigate(`/starships/${itemId}`);
                }}
            />
        </React.Fragment>
    );
};

export default StarshipsPage;