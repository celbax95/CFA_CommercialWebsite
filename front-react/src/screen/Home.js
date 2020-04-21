import React from "react";

import { connect } from "react-redux";
import { onConnect } from "../store/actions/userActions";
import { disconnect } from "../store/actions/userActions";
import { login } from "../service/api_services";
import { getRessources } from "../service/api_services";

const crypto = require("crypto");

class Home extends React.Component {
  constructor(props) {
    super();

    let user = JSON.parse(props.user);

    this.state = { email: "root", password: "root", user: user };
  }

  componentDidMount(props) {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  encodedPassword() {
    return crypto
      .createHash("sha512")
      .update(this.state.password.trim())
      .digest("base64");
  }

  connect(e) {
    e.preventDefault();

    let data = { email: this.state.email, password: this.encodedPassword() };
    login(data).then((result) => {
      this.props.onConnect(result.response);
      alert("Connected");
      window.location = "/";
    });
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="homeContent">
        {!this.props.user && (
          <form>
            <input
              className="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange.bind(this)}
              placeholder="eMail"
              style={{ fontSize: 20 }}
            ></input>
            <input
              className="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange.bind(this)}
              placeholder="Password"
              style={{ fontSize: 20 }}
            ></input>
            <button
              type="submit"
              style={{ padding: 20 }}
              onClick={(e) => this.connect(e)}
            >
              SUBMIT
            </button>
          </form>
        )}

        {this.state.user && (
          <button
            onClick={() => {
              this.props.disconnect();
              window.location.href = "/";
            }}
          >
            {"LOGOUT " + this.state.user.userName}
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onConnect: (data) => {
      dispatch(onConnect(data.user, data.token));
    },
    disconnect: () => {
      dispatch(disconnect());
    },
  };
};
export default connect(null, mapDispatchProps)(Home);
