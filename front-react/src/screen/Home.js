import React from "react";

import { getRessources } from "../service/api_services";

export default class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount(props) {
    // update state with model
  }

  render() {
    return <div className="homeContent"></div>;
  }
}
