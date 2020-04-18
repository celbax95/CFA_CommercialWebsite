import React from "react";
import { connect } from "react-redux";
import { onConnect } from "../store/actions/userActions";
import { login } from "../service/api_services";
import "./Login.css";
const crypto = require("crypto");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "a@a.a", password: "pass" };
  }

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
      window.location = "/admin";
    });
  }

  render() {
    return (
      <div className="row" style={{ flexDirection: "column" }}>
        <h2>Login</h2>
        <form className="loginForm">
          <input
            className="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange.bind(this)}
            placeholder="Login"
          />
          <input
            className="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange.bind(this)}
            placeholder="Password"
          />
          <button
            className="connexion"
            name="connexion"
            onClick={(e) => this.connect(e)}
          >
            Connexion
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    onConnect: (data) => {
      dispatch(onConnect(data.user, data.token));
    },
  };
};
export default connect(null, mapDispatchProps)(Login);
