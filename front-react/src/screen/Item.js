import React from 'react';
import { useParams } from "react-router-dom";
import ItemPage from '../components/ItemPage';

export default function Item(props) {
    let { id } = useParams();
    return (
        <div className="row" style={{flexDirection:"column"}}>
            <ItemPage id={id}/>
        </div>
    );
}