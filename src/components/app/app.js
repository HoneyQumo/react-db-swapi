import React, { Component } from "react";

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import { StarshipDetails } from "../sw-components";

import './app.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {

    state = {
        swapiService: new SwapiService()
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            console.log('switched to', Service.name);

            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div>
                            <Header onServiceChange={this.onServiceChange} />

                            <RandomPlanet />

                            <Routes>
                                <Route path="/" element={<h2>Добро пожаловать на StarWars DB!</h2>} />
                                <Route path="/people" element={<PeoplePage />} />
                                <Route path="/planets" element={<PlanetsPage />} />
                                <Route path="/starships" element={<StarshipsPage />} />
                                <Route path="/starships/:id" element={<StarshipDetails />} />
                            </Routes>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}