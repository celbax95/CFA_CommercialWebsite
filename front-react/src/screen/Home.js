import React from "react";

import { getRessources } from "../service/api_services";

import ItemCard from "../components/ItemCard";
//import CategoryCard from "../component/CategoryCard";

import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super();
    this.state = { items: [] };
  }

  componentDidMount(props) {
    getRessources("item").then((result) => {
      if (result.length > 0) {
        let items = result.slice();

        this.setState({
          items: items,
        });
      }
    });
  }

  render() {
    return (
      <div className="home">
        <div className="homeContent">
          {this.state.items.map((item, index) => {
            return <ItemCard key={index} className="item" item={item} />;
          })}
        </div>
      </div>
    );
  }
}
