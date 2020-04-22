import React from 'react';
import { connect } from 'react-redux';
import { onConnect } from '../store/actions/userActions';
import { login } from '../service/api_services';
import './SignUp.css';
import './SignUp.scss';
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
                <p> 
                <form style={{
                    display: "flex", flexDirection: "column",
                    alignSelf: "center", margin: "60px 0px"
                }} className="SignUpForm">
                    <div>
                        <h2>Inscription</h2>
                        <input type="text"
                            name="nickname"
                            value={this.state.email}
                            placeholder="Nom d'utilisateur"
                            onChange={this.onChange.bind(this)} />
                        <br></br>
                        <input type="email"
                            name="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.onChange.bind(this)} />
                        <br></br>
                        <input type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Mot de passe"
                            onChange={this.onChange.bind(this)} />
                        <br></br>
                        
                        <button className="bn draw-border" onClick={this.connect.bind(this)}>
                            Inscription</button>
                        <br></br>
                        <Link className="close draw-border" to="./Home">Annuler</Link>
                    </div>
                </form></p>
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
