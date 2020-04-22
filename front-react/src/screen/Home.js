import React from "react";

import { getRessources } from "../service/api_services";

import ItemCard from "../component/ItemCard";
import CategoryCard from "../component/CategoryCard";

export default class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount(props) {
    // update state with model
  }

  render() {
    return (
      <div className="homeContent">
        <CategoryCard />
        <div style={{ marginBottom: 50 }}></div>
        <ItemCard />
      </div>
    );
  }
}
