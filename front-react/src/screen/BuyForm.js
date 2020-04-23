import React from "react";
import "./Login.css";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRessource } from "../service/api_services";
import axios from "axios";

class BuyFormClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = { itemId: props.id, user: null, item: null };
  }

  componentDidMount() {
    getRessource("item", this.state.itemId).then((result) => {
      console.log(result);
      if (result.title) {
        this.setState({ item: result });
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="buyForm">
        <div className="buyFormContent">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              margin: "60px 0px",
              position: "static",
            }}
          >
            <div>
              <h2></h2>
              <input
                type="email"
                name="email"
                value={this.state.email}
                placeholder="email"
                onChange={this.onChange.bind(this)}
              />
              <br></br>
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.onChange.bind(this)}
              />
              <br></br>
              <button className="bn draw-border">Se connecter</button>
              <br></br>
              <Link className="close draw-border" to="./Home">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default function BuyForm() {
  let { id } = useParams();

  if (id) {
    return <BuyFormClass id={id} />;
  }
}
