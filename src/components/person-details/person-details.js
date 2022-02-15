import React, { Component } from "react";

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from '../spinner';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: {},
        loading: false
    }

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
            this.setState({
                loading: true
            })
        }
    }

    updatePerson() {
        const { personId } = this.props;

        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false
                });
            });
    }

    render() {
        const { person, loading } = this.state;
        const { personId } = this.props;

        const hasData = !loading && personId;

        const choose = !personId ? <span className="list-group-item rounded">Выберите персонажа из списка</span> : null;
        const content = hasData ? <ShowPerson person={person} /> : null;
        const spinner = loading ? <Spinner /> : null;

        return (
            <React.Fragment>
                {choose}
                {spinner}
                {content}
            </React.Fragment>
        );
    }
}


const ShowPerson = ({ person }) => {

    const { id, name, gender, birthYear, eyeColor } = person;

    return (
        <div className="person-details card">
            <img
                className="person-image"
                alt=""
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            />
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};