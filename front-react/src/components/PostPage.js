import React from "react";
import RichTextEditor from "react-rte";

import {
  updateRessource,
  createRessource,
  deleteRessource,
  getRessources,
} from "../service/api_services";

import "../screen/Button.scss"
import "../screen/Editor.css";

export default class FormPost extends React.Component {
  constructor(props) {
    super(props);

    if (props.data) {
      this.state = Object.assign({ image: null }, props.data);
      this.state.contenu = RichTextEditor.createValueFromString(
        this.state.contenu,
        "html"
      );
    } else {
      this.state = {
        categoryList: [],
        title: "",
        title_description: "",
        contenu: RichTextEditor.createEmptyValue(),
        category: null,
        image: null,
      };
    }
  }

  componentDidMount(props) {
    getRessources("category").then((result) => {
      if (result.length > 0) {
        let categoryList = result.slice();
        this.setState({
          categoryList: categoryList,
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data && this.props.data !== nextProps.data) {
      Object.assign(nextState, nextProps.data);
    }
    return true;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFileChange(e) {
    const { target } = e;
    const files = target;
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ image: event.target.result });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  save(e) {
    e.preventDefault();
    let postData = Object.assign({}, this.state);
    postData.contenu = postData.contenu.toString("html");
    if (postData.category == "null") {
      postData.category = null;
    }

    if (this.props.data) {
      delete postData.__v;
      delete postData._id;
      postData.updated = new Date();
      updateRessource("post", this.props.data._id, postData).then((result) => {
        this.props.refresh();
        this.props.onHide();
      });
    } else {
      createRessource("post", postData).then((result) => {
        this.props.refresh();
        this.props.onHide();
      });
    }
  }

  cancel(e) {
    e.preventDefault();
    this.props.onHide();
  }

  delete(e) {
    e.preventDefault();
    deleteRessource("post", this.props.data._id).then((result) => {
      this.props.refresh();
      this.props.onHide();
    });
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
