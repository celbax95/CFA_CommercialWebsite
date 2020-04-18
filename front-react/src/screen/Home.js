import React from "react";
import Post from "../component/Post";

import { getRessources } from "../service/api_services";

export default class Home extends React.Component {
  constructor(props) {
    super();
    this.state = { posts: [], firstPost: null };
  }

  componentDidMount(props) {
    getRessources("post").then((result) => {
      if (result.length > 0) {
        let posts = result.slice();
        this.setState({
          posts: posts.sort((a, b) => {
            return (
              new Date(b.created).getTime() - new Date(a.created).getTime()
            );
          }),
          firstPost: result[0],
        });
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="leftcolumn">
          {this.state.posts.map((item, index) => {
            return <Post key={index} data={item} displayText={true} />;
          })}
        </div>
        <div className="rightcolumn">
          {this.state.firstPost && (
            <Post data={this.state.firstPost} displayText={false} />
          )}

          <div className="card">
            <h2>About Me</h2>
            <p>
              Some text about me in culpa qui officia deserunt mollit anim..
            </p>
          </div>
          <div className="card">
            <h3>Popular Post</h3>
            {this.state.posts.map((item, index) => {
              return <Post key={index} data={item} displayText={false} />;
            })}
          </div>
          <div className="card">
            <h3>Follow Me</h3>
            <p>Some text..</p>
          </div>
        </div>
      </div>
    );
  }
}
