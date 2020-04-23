import React from "react";
import "./Login.css";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRessource } from "../service/api_services";
import axios from "axios";
import ItemCard from "../component/ItemCard";

class BuyFormClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = { itemId: props.id, user: null, item: null };
  }

  componentDidMount() {
    getRessource("item", this.state.itemId).then((result) => {
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
        {this.state.item && (
          <div className="buyFormContent">
            <form>
              <div className="top">
                <h2>
                  {"Formulaire d'achat de l'article suivant : \n" +
                    this.state.item.title}
                </h2>
              </div>
              <div className="bottom">
                <div className="bottomLeft">
                  <ItemCard item={this.state.item} />
                </div>
                <div className="bottomRight">
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="email"
                    onChange={this.onChange.bind(this)}
                  />
                  <button className="bn draw-border">Se connecter</button>
                  <Link className="close draw-border" to="./Home">
                    Annuler
                  </Link>
                </div>
                {/* end bottomRight */}
              </div>
              {/* end bottom */}
            </form>
          </div>
        )}
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
