import React from "react";
import "./Header.css"
import Navbar from "./Navbar";
import "./Header.scss"; // execute npm install node-sass

export default function Header(props) {
  return (
    <div className="header">
      <div className="search">
        <input type="text"
          name="searchBar"
          placeholder="Rechercher"
        />
        <button class="btn draw-border">Rechercher</button>
      </div>
    </div>
  );
}
