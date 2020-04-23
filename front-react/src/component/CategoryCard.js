import React from "react";

import "./CategoryCard.css";
import ItemCard from "./ItemCard";

export default function CategoryCard(props) {
  let item = props.item;

  let i = 1;

  let ic = 5;

  let cat1 = { name: "Category 1", items: [] },
    cat2 = { name: "Category 2", items: [] },
    cat3 = { name: "Category 3", items: [] },
    cat4 = { name: "Category 4", items: [] };

  for (; i <= ic; i++) {
    cat1.items.push({
      price: 100.2,
      title: "ItemTitle " + i,
      state: "mauvais",
      seller: { name: "JhonLeNon" },
    });
    cat2.items.push({
      price: 100.2,
      title: "ItemTitle " + ic * 1 + i,
      state: "mauvais",
      seller: { name: "JhonLeNon" },
    });
    cat3.items.push({
      price: 100.2,
      title: "ItemTitle " + ic * 2 + i,
      state: "mauvais",
      seller: { name: "JhonLeNon" },
    });
    cat4.items.push({
      price: 100.2,
      title: "ItemTitle " + ic * 3 + i,
      state: "mauvais",
      seller: { name: "JhonLeNon" },
    });
  }

  let categories = [cat1, cat2, cat3, cat4];

  return (
    <div className="categoryCard">
      <div className="categoryCardContent">
        <div className="top">
          <div className="title">{cat1.name}</div>
        </div>
        <div className="separator" />
        <div className="bottom">
          <div className="bottomContent">
            <div className="bottomContentFlex">
              {cat1.items.map((item, index) => {
                return <ItemCard className="item" />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
