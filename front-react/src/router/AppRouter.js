import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";

import Home from "../screen/Home";

import { connect } from "react-redux";

import openSocket from "socket.io-client";
import { BASE_URL } from "../service/api_services";

function AppRouteur(props) {
  if (!props.user) {
    const socket = openSocket(BASE_URL);

    // Gestion des données recupérées via socket

    // socket.on("RECEIVED", (data) => {
    //   window.location("/");
    // });
  }
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateProps = (state) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateProps)(AppRouteur);
