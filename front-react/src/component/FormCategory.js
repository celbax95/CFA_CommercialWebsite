import React from "react";

import "./FormCategory.css";
import {
  updateRessource,
  createRessource,
  deleteRessource,
  getRessources,
} from "../service/api_services";

export default class FormCategory extends React.Component {
  constructor(props) {
    super(props);

    console.log(props.data);

    if (props.data) {
      this.state = Object.assign({ image: null }, props.data);
    } else {
      this.state = {
        categoryName: "",
        categoryDescription: "",
        categoryImage: null,
      };
    }
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
    let categoryData = Object.assign({}, this.state);

    if (this.props.data) {
      delete categoryData.__v;
      delete categoryData._id;
      categoryData.updated = new Date();
      updateRessource("category", this.props.data._id, categoryData).then(
        (result) => {
          this.props.refresh();
          this.props.onHide();
        }
      );
    } else {
      createRessource("category", categoryData).then((result) => {
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
    deleteRessource("category", this.props.data._id).then((result) => {
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
              src={
                this.state.categoryImage
                  ? this.state.categoryImage
                  : "/logo192.png"
              }
              alt="Logo"
              className="imagePostLittle imageShow"
            />

            <input
              className="chooseFile"
              type="file"
              accept="image/*"
              onChange={this.handleFileChange.bind(this)}
            />
          </div>

          <div className="dataPart">
            <input
              className="name"
              name="name"
              value={this.state.categoryName}
              onChange={this.onChange.bind(this)}
              placeholder="Name of the category"
            />
            <input
              className="description"
              name="description"
              value={this.state.categoryDescription}
              onChange={this.onChange.bind(this)}
              placeholder="Description of the category"
            />
          </div>
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
