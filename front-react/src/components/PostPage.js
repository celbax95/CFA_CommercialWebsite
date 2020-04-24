import React from "react";
import RichTextEditor from "react-rte";

import {
  updateRessource,
  createRessource,
  deleteRessource,
  getRessource,
    getRessources,
} from "../service/api_services";

export default class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      title: "",
      description: "",
      state: "",
      image: null,
      price: 0
    }
  }

  handleFileChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  /*componentDidMount(props) {
    getRessource("user", ).then((result) => {
      if (result.length > 0) {
        let categoryList = result.slice();
        this.setState({
          categoryList: categoryList,
        });
      }
    });
  }*/

  /*shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data && this.props.data !== nextProps.data) {
      Object.assign(nextState, nextProps.data);
    }
    return true;
  }*/

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  save(e) {
    e.preventDefault();
    let itemData = Object.assign({}, this.state);

    createRessource('item', itemData);

  }

  cancel(e) {
    e.preventDefault();
    this.props.onHide();
  }

  render() {
    return (
        <form>
          <label>Photo du produit  </label>
          <br/>
          <input
              className="choisir un fichier"
              type="file"
              accept="image/*"
              onChange={this.handleFileChange.bind(this)}
          />


          <br/>
          <label>Nom du produit  </label>
          <br/>
          <input
              className="title"
              name="title"
              value={this.state.title}
              onChange={this.onChange.bind(this)}
              placeholder="saisir le nom du produit"
          />
          <br/>
          <label>Description du produit</label>
          <br/>
          <input
              className="description"
              name="description"
              value={this.state.description}
              onChange={this.onChange.bind(this)}
              placeholder="saisir la description du produit"
          />
          <br/>
          <label>Prix du produit </label>
          <br/>
          <input
              className="price"
              name="price"
              type="number"
              value={this.state.price}
              onChange={this.onChange.bind(this)}
              placeholder="saisir le prix en euro (€)"
          />

          <br/>

          <label>Etat du produit  </label>
          <br/>
          <input
              className="state"
              type="text"
              onChange={this.handleFileChange.bind(this)}
          />

          <br/>
          <button
              className="validate"
              name="validate"
              onClick={(e) => {
                  this.save(e);
              }}
          >
            Valider la vente
          </button>
        </form>
    );
  }
}
