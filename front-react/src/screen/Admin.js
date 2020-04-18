import React from "react";

import { getRessources } from "../service/api_services";
import FormPost from "../component/FormPost";
import CategoryPost from "../component/FormCategory";

import "./Admin.css";
import FormCategory from "../component/FormCategory";

export default class Admin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
      categories: [],
      selectedPost: null,
      showPostForm: false,
      selectedCategory: null,
      showCategoryForm: false,
    };
  }

  componentDidMount(props) {
    this.refresh();
  }

  refresh() {
    getRessources("post").then((result) => {
      if (result.length > 0) {
        let posts = result.slice();
        this.setState({
          selectedPost: result[0],
          posts: posts.sort((a, b) => {
            return (
              new Date(b.created).getTime() - new Date(a.created).getTime()
            );
          }),
        });
      }
    });

    getRessources("category").then((result) => {
      if (result.length > 0) {
        let categories = result.slice();
        this.setState({
          categories: categories,
        });
      }
    });
  }

  render() {
    return (
      <div className="adminContent">
        <h2>Admin</h2>
        <div className="adminColumns">
          {!this.state.showCategoryForm && !this.state.showPostForm && (
            <div
              className="categories"
              style={{
                borderRight: "1px solid white",
              }}
            >
              <button
                className="categoryButton"
                onClick={() => this.setState({ showCategoryForm: true })}
              >
                Nouvelle categorie
              </button>
              <div className="separator" />

              {this.state.categories.map((item, index) => {
                return (
                  <button
                    className="categoryButton"
                    key={index}
                    onClick={() =>
                      this.setState({
                        selectedCategory: item,
                        showCategoryForm: true,
                      })
                    }
                  >
                    <img
                      src={
                        item.categoryImage ? item.categoryImage : "/logo192.png"
                      }
                      style={{ width: 35, height: 35, marginRight: 10 }}
                      alt="Logo"
                    />
                    {item.categoryName}
                  </button>
                );
              })}
            </div>
          )}
          {this.state.showCategoryForm && !this.state.showPostForm && (
            <div className="categories">
              <FormCategory
                refresh={() => {
                  this.refresh();
                }}
                data={this.state.selectedCategory}
                onHide={() =>
                  this.setState({
                    selectedCategory: null,
                    showCategoryForm: false,
                  })
                }
              />
            </div>
          )}

          {!this.state.showPostForm && !this.state.showCategoryForm && (
            <div
              className="posts"
              style={{
                borderLeft: "1px solid white",
              }}
            >
              <button
                onClick={() => this.setState({ showPostForm: true })}
                className="postButton"
              >
                Nouveau Post
              </button>
              <div className="separator" />
              {this.state.posts.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="postButton"
                    onClick={() =>
                      this.setState({ selectedPost: item, showPostForm: true })
                    }
                  >
                    <img
                      src={item.image ? item.image : "/logo192.png"}
                      style={{ width: 35, height: 35, marginRight: 10 }}
                      alt="Logo"
                    />
                    {item.title} - {item.title_description}
                  </button>
                );
              })}
            </div>
          )}

          {this.state.showPostForm && !this.state.showCategoryForm && (
            <div className="posts">
              <FormPost
                refresh={() => {
                  this.refresh();
                }}
                data={this.state.selectedPost}
                onHide={() =>
                  this.setState({ selectedPost: null, showPostForm: false })
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
