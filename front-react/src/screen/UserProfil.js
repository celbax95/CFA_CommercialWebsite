import React from 'react';
import { useParams } from "react-router-dom";
import UserPage from '../components/UserPage';

import './UserProfil.css';
import './UserProfil.scss';

export default function User(props) {
    let { id } = useParams();

    return (
      <div className="row" style={{flexDirection:"column"}}>
          <UserPage id={id} />
      </div>
    );
  }