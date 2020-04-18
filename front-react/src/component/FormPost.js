import React from "react";
import RichTextEditor from "react-rte";

import "./FormPost.css";
import {
  updateRessource,
  createRessource,
  deleteRessource,
  getRessources,
} from "../service/api_services";

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
        <div className="upPart">
          <div className="imagePart">
            <img
              src={this.state.image ? this.state.image : "/logo192.png"}
              alt="Logo"
              className={"imagePostLittle imageShow"}
            />

            <input
              className="chooseFile"
              type="file"
              accept="image/*"
              onChange={this.handleFileChange.bind(this)}
            />
          </div>

          <div className="titlePart">
            <input
              className="title"
              name="title"
              value={this.state.title}
              onChange={this.onChange.bind(this)}
              placeholder="Title of the post"
            />

            <input
              className="title_description"
              name="title_description"
              value={this.state.title_description}
              onChange={this.onChange.bind(this)}
              placeholder="Title description of the post"
            />

            {this.state.categoryList && (
              <div className="categoryPart">
                <label htmlFor="categorySelector">Categorie</label>
                <select
                  name="categorySelector"
                  className="categorySelector"
                  value={
                    this.state.category == null ? "null" : this.state.category
                  }
                  onChange={(e) => {
                    this.setState({ category: e.target.value });
                  }}
                >
                  <option value="null">Aucune</option>
                  {this.state.categoryList.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="midPart">
          <RichTextEditor
            className="contenu"
            style={{ flex: 1 }}
            name="contenu"
            onChange={(value) => this.setState({ contenu: value })}
            value={this.state.contenu}
          />
        </div>
        <div className="downPart">
          <button
            className="supprimer"
            name="supprimer"
            onClick={(e) => this.delete(e)}
          >
            Supprimer
          </button>
          <button
            className="cancel"
            name="cancel"
            onClick={(e) => this.cancel(e)}
          >
            Annuler
          </button>
          <button
            className="validate"
            name="validate"
            onClick={(e) => this.save(e)}
          >
            Valider
          </button>
        </div>
      </form>
    );
  }
}
