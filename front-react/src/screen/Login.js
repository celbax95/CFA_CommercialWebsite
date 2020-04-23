import React from 'react';
import { connect } from 'react-redux';
import { onConnect } from '../store/actions/userActions';
import { login } from '../service/api_services';
import './Editor.css';
import './Button.scss';
import { Link } from "react-router-dom";

const crypto = require("crypto");

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = { email: "", password: "" }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    encodedPassword() {
        return crypto.createHash("sha512").update(this.state.password.trim()).digest("base64");
    }

    connect(e) {
        e.preventDefault();
        let postData = { email: this.state.email, password: this.encodedPassword() };
        login(postData).then(result => {
            this.props.onConnect(result.response);
            window.location = "/Home";
        });
    }

    render() {
        return (
            <div className="row" style={{ flexDirection: "column" }}>
                <form className="connexionForm" style={{
                        display: "flex", flexDirection: "column"
                    }}>
                    <div className="connexionFilds">
                        <h2>Identification</h2>
                        <input type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.onChange.bind(this)} />
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Mot de passe"
                            onChange={this.onChange.bind(this)} />
                        <button className="bn draw-border" onClick={this.connect.bind(this)}>
                            Se connecter</button>
                        <Link className="close draw-border" to="./Home">Annuler</Link>
                    </div>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onConnect: data => { dispatch(onConnect(data.user, data.token)); }
    };
};
export default connect(null, mapDispatchToProps)(Login);
