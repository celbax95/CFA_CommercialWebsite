import React from "react";
import RichTextEditor from "react-rte";

import {
    updateRessource,
    createRessource,
    deleteRessource,
    getRessource,
    getRessources,
} from "../service/api_services";

import "../screen/Button.scss"
import "../screen/Editor.css";

export default class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({ [nam]: val });
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
        <label>Photo du produit</label>
        <input
          className="bn draw-border"
          type="file"
          accept="image/*"
          placeholder="Choisir une image"
          onChange={this.handleFileChange.bind(this)}
        />
        <input
          className="title"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.onChange.bind(this)}
          placeholder="Saisir le nom du produit"
        />
        <input
          className="description"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.onChange.bind(this)}
          placeholder="Saisir la description du produit"
        />
        <input
          className="price"
          name="price"
          type="number"
          value={this.state.price}
          onChange={this.onChange.bind(this)}
          placeholder="Saisir le prix en euro (€)"
        />
        <button
          className="bn draw-border"
          name="validate"
          onClick={(e) => this.save(e)}
        >
          Valider la mise en vente
          </button>
      </form>
        );
    }
}