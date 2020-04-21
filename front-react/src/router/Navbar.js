import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import "./Navbar.scss";

import { disconnect } from "../store/actions/userActions";
import { connect } from "react-redux";



const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-item');

function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute('active-color');

  el.classList.add('is-active');
  el.style.color = el.getAttribute('active-color');
}


items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target) });
  item.classList.contains('is-active') && handleIndicator(item);
});
//TEST ----------------------------------------------------
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
//------------------------------------------------------------------
export default function NavBar(props) {
  // return ;
  return <div>
    <div class="" >
      <h1>Le P'tit Coin</h1>
      <Link class="button draw-border" to="/login">Identification</Link>
    </div>
    
    <nav class="nav">
      <a href="#" class="nav-item is-active" active-color="orange" >Home</a>
      <a href="#" class="nav-item" active-color="green">Categorie 1</a>
      <a href="#" class="nav-item" active-color="blue">Categorie 2</a>
      <a href="#" class="nav-item" active-color="red" onclick="openForm()">Categorie 3</a>
      <a href="#" class="nav-item" active-color="rebeccapurple">Categorie 4</a>
      <span class="nav-indicator"></span>
    </nav>
  </div>
}
