import React from "react";
import { getRessource } from "../services/api_services";
import { useParams } from "react-router-dom";
let parse = require("html-react-parser");

export default class PostFullPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={selectedPost:null}
  }

  componentDidMount() {
      getRessource("post", this.props.id).then((result) => {
              this.setState({selectedPost:result});
      });
  }

  render() {
      return (
        <div className="row" style={{flexDirection:"column"}}/>
        {this.state.selectedPost&&
        <div style={{flexDirection:"column"}}>
        <h2>
            {this.state.selectedPost.title}
        </h2>
        <h3> {this.state.selectedPost.title_description}
        </h3>
        <img src={this.state.selectedPost.image ? this.state.selectedPost.image : "/logo192.png"}
        className="imagePost" alt="Logo"/>
        {parse(this.state.selectedPost.contenu)}
        </div>
    }

      );
  }
}
