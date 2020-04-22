import React from 'react';
let parse = require('html-react-parser');

export default function Item(props) {
    return (
        <a className="item" href={`/item/${props.data._id}`}>
            <h2>{props.data.title}</h2>
            <h5>{props.data.description}</h5>
            <p>{props.data.state}</p>
        </a>
    );
}
