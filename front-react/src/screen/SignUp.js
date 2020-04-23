import React from 'react';
import { connect } from 'react-redux';
import { onConnect } from '../store/actions/userActions';
import { login, createRessource } from '../service/api_services';
import './Editor.css';
import './Button.scss';
import { Link } from "react-router-dom";


const crypto = require("crypto");

class Login extends React.Component {

    constructor(props) {
        super(props)
        if (!props.data) {
            this.state = { userName: "", email: "", password: "" }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    encodedPassword() {
        return crypto.createHash("sha512").update(this.state.password.trim()).digest("base64");
    }

    connect(e) {
        e.preventDefault();
        let postData = { userName: this.state.userName, email: this.state.email, password: this.encodedPassword() };
        // console.log(this.state.userName);
        login(postData).then(result => {
            this.props.onConnect(result.response);
            window.location = "/Home";
        });
    }

    save(e) {
        e.preventDefault();
        let userData = Object.assign({}, this.state);
        if (!this.props.data) {
            createRessource("user", userData).then(result => {
                alert("Enregistrement éffectué.");
            });
        } else {
            alert("Utilisateur déjà enregistré");
        }
    }

    render() {
        return (
            <div className="row" style={{ flexDirection: "column" }}>
                    <form className="connexionForm" 
                    style={{
                        display: "flex", flexDirection: "column"
                    }} >
                        <div className="connexionFields">
                            <h2>Inscription</h2>
                            <input type="text"
                                name="userName"
                                value={this.state.userName}
                                placeholder="Nom d'utilisateur"
                                onChange={this.onChange.bind(this)} />
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
                                <div className="connexionButton">
                            <button className="bn draw-border" onClick={this.save.bind(this)}>
                                Inscription</button>
                            <Link className="close draw-border" to="./Home">Annuler</Link>
                            </div>
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
