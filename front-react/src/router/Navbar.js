import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import "./Navbar.scss";

import { disconnect } from "../store/actions/userActions";
import { connect } from "react-redux";

// Navbar
const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");

function handleIndicator(el) {
  items.forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("style");
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute("active-color");

  el.classList.add("is-active");
  el.style.color = el.getAttribute("active-color");
}

items.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    handleIndicator(e.target);
  });
  item.classList.contains("is-active") && handleIndicator(item);
});

// End Navbar

function NavBar(props) {
  // return ;

  return (
    <div>
      <div className="divTitle">
        <a href="/home" className="webTitle">
          Le P'tit Coin
        </a>
      </div>
      <nav className="nav">
        <a href="/Home" className="nav-item is-active" active-color="orange">
          Accueil
        </a>
        {props.isLogin ? (
          <a href="/post/postitem" className="nav-item">
            Vendre
          </a>
        ) : (
          <a href="/signup" className="nav-item">
            Inscription
          </a>
        )}
        {props.isLogin ? (
          <a
            className="nav-item"
            onClick={() => {
              props.disconnect();
              window.location.href = "/Home";
            }}
          >
            Déconnexion
          </a>
        ) : (
          <a href="/login" className="nav-item">
            Connexion
          </a>
        )}
        <span className="nav-indicator"></span>
      </nav>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    disconnect: () => {
      dispatch(disconnect());
    },
  };
};
export default connect(null, mapDispatchToProps)(NavBar);
