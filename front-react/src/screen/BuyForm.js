import React from "react";
import "./Editor.css";
import "./Button.scss";
import "./BuyForm.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRessource, updateRessource } from "../service/api_services";
import ItemCard from "../components/ItemCard";

class BuyFormClass extends React.Component {
  constructor(props) {
    super(props);

    if (!props.user) {
      window.location = "/login";
    }

    if (!props.id) {
      window.location = "/";
    }

    this.state = {
      itemId: props.id,
      user: props.user,
      userAdress: null,
      item: null,
      email: props.user.email,
      address: "",
    };

    console.log(this.state);
  }

  componentDidMount() {
    if (this.state.user) {
      getRessource("item", this.state.itemId).then((result) => {
        if (result) {
          this.setState({ item: result });
        } else {
          window.location = "/";
        }
      });

      if (this.state.user.address) {
        getRessource("address", this.state.user.address).then((result) => {
          if (result.addressLine) {
            this.setState({
              address:
                result.addressLine +
                ", " +
                result.codePostal +
                ", " +
                result.city,
            });
          }
        });
      }
    }
  }

  setItemAvailability(e, available) {
    e.preventDefault();

    let item = Object.assign({}, this.state.item);

    if (item) {
      item.available = available;

      console.log(item.available);

      delete item.__v;
      delete item._id;
      updateRessource("item", this.state.itemId, item).then((result) => {
        if (result) {
          if (!available) {
            window.location.reload(true);
          } else {
            window.location.reload(true);
          }
        }
      });
    } else {
      alert("Un probleme est survenu avec l'article.");
      window.location = "/";
    }
  }

  setItemUnavailable(e) {
    this.setItemAvailability(e, false);
  }

  setItemAvailable(e) {
    this.setItemAvailability(e, true);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="buyForm">
        {this.state.item && (
          <form className="buyForm">
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
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.onChange.bind(this)}
                />

                <input
                  type="text"
                  name="address"
                  value={this.state.address}
                  placeholder="Adresse"
                  onChange={this.onChange.bind(this)}
                />

                <p className="buyInstructions">
                  Après confirmation, ce formulaire sera étudié par
                  l'administrateur.
                  <br />
                  Celui-ci vous contactera via votre adresse eMail afin de
                  finaliser la transaction.
                </p>

                {this.state.item.available ? (
                  <button
                    className="buy bn draw-border"
                    onClick={(e) => this.setItemUnavailable(e)}
                  >
                    Acheter
                  </button>
                ) : (
                  <button
                    className="buy bn draw-border"
                    onClick={(e) => this.setItemAvailable(e)}
                  >
                    Annuler l'achat
                  </button>
                )}
                <Link className="close draw-border" to="/">
                  Annuler
                </Link>
              </div>
              {/* end bottomRight */}
            </div>
            {/* end bottom */}
          </form>
        )}
      </div>
    );
  }
}

export default function BuyForm(props) {
  let { id } = useParams();

  if (id) {
    return <BuyFormClass id={id} user={props.user} />;
  }
}
