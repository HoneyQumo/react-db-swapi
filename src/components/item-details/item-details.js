import React, { Component } from "react";

import './item-details.css';
import Spinner from '../spinner';
import ErrorButton from '../error-button';


const Record = ({ item, field, label }) => {

    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export { Record };


export default class ItemDetails extends Component {

    state = {
        item: {},
        loading: false,
        image: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
            this.setState({
                loading: true
            })
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                });
            });
    }

    render() {
        const { item, loading, image } = this.state;
        const { itemId, children } = this.props;

        const hasData = !loading && itemId;
        const chooseText = <span className="list-group-item rounded">Выберите персонажа из списка</span>;
        const showItem = (
            <ShowItem
                item={item}
                image={image}
                children={React.Children.map(children, (child) => {
                    return React.cloneElement(child, { item });
                })}
            />
        );

        const choose = !itemId ? chooseText : null;
        const content = hasData ? showItem : null;
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


const ShowItem = ({ item, image, children }) => {

    const { name } = item;

    return (
        <div className="item-details card">
            <img className="item-image"
                alt="character"
                src={image}
            />

            <div className="card-body">

                <h4>{name}</h4>

                <ul className="list-group list-group-flush">
                    {children}
                </ul>
                <ErrorButton />
            </div>
        </div>
    );
};