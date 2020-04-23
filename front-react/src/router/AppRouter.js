import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import Login from "../screen/Login";
import Home from "../screen/Home";
import User from "../screen/UserProfil";
import SignUp from "../screen/SignUp";

import { connect } from "react-redux";
import openSocket from "socket.io-client";
import { BASE_URL } from "../service/api_services";
import Post from "../screen/Post";

function AppRouteur(props) {
  if (!props.user) {
    const socket = openSocket(BASE_URL);

    // Gestion des données recupérées via socket

    // socket.on("RECEIVED", (data) => {
    //   window.location("/");
    // });
  }

  let user = null;
  try {
    user = JSON.parse(props.user);
  } catch (e) { }

  return (
    <Router>
      <div className="headerParam">
        <Navbar isLogin={user} />
        <Header />
      </div>
      <Switch>
        <Route path="/login" children={<Login />} />
        <Route path="/signUp" children={<SignUp />} />
        <Route path="/post/:id" children={<Post/>} />

        <Route path="/">
          <Route path="/user">
            <User isUser={user} />
          </Route>
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
