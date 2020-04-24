import React from "react";

import "./ItemCard.css";

export default function ItemCard(props) {
  let item = props.item;

  let image = "/imageNotFound.png";
  try{
      image = item.image;
  } catch (e) { console.log(e);}

  return (
    <div
      onClick={function () {
        window.location = "/item/" + item._id;
      }}
      className={"itemCard" + (props.className ? " " + props.className : "")}
    >
      <div className="itemCardContent">
        <div className="top">
          <div className="title">{item.title}</div>
          <div className="favorite"></div>
        </div>

        <div className="middle">
          <img alt="ItemImage" width="192" height="192" src={image} />
        </div>

        <div className="bottom">
          <div className="leftColumn">
            <p className="price">{item.price + " €"}</p>
            <p className="state">{"Etat : " + item.state}</p>
          </div>
          <div className="rightColumn">
            <p className="sellerName">
              {item.seller ? item.seller.name : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
