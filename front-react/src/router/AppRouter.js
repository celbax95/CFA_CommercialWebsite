import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

import Home from "../screen/Home";
import Admin from "../screen/Admin";
import Post from "../component/Post";

import Login from "../screen/Login";
import { connect } from "react-redux";

import openSocket from "socket.io-client";
import { BASE_URL } from "../service/api_services";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function AppRouteur(props) {
  if (!props.user) {
    const socket = openSocket(BASE_URL);
    socket.on("message", (data) => {
      NotificationManager.info(data.action + " " + data.type);
      window.location("/");
    });
  }
  return (
    <Router>
      <Header />
      <Navbar isLogin={props.user !== null} />
      <Switch>
        {props.user && (
          <Route path="/admin">
            <Admin />
          </Route>
        )}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/post/:id" children={<Post />}>
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
      <NotificationContainer />
    </Router>
  );
}

const mapStateProps = (state) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateProps)(AppRouteur);
