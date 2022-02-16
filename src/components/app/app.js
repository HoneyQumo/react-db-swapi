import React, { Component } from "react";

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ItemDetails, { Record } from "../item-details";

import './app.css';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}
            >
                <Record field='gender' label='Gender' />
                <Record field='eyeColor' label='Eye Color' />
            </ItemDetails>
        );
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            >
                <Record field='model' label='Model' />
                <Record field='length' label='Length' />
                <Record field='costInCredits' label='Cost' />
            </ItemDetails>

        );

        return (
            <ErrorBoundry>
                <div>
                    <Header />
                    {/* {planet}

                    <div className="button-row">
                        <button
                            className="toggle-planet btn btn-secondary btn-md"
                            onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton />
                    </div>
                    <PeoplePage /> */}

                    <Row
                        left={personDetails}
                        right={starshipDetails}
                    />

                </div>
            </ErrorBoundry>
        );
    }
}