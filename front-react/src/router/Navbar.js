import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

import { disconnect } from "../store/actions/userActions";
import { connect } from "react-redux";

function NavBar(props) {
  return (
    <nav>
      <ul className="mainUl">
        <li className="mainBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="CUSTTTTT">
              <Link to="/login">MyCategory</Link>
            </li>
          </ul>
        </li>

        <li className="adminbar">
          <ul>
            {!props.isLogin && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {props.isLogin && (
              <li className="adminNav">
                <div
                  className="loggout"
                  onClick={() => {
                    props.disconnect();
                    window.location.href = "/";
                  }}
                >
                  Loggout
                </div>
                <div className="navSeparator" />
                <div>
                  <Link to="/admin">Admin</Link>
                </div>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    disconnect: () => {
      dispatch(disconnect());
    },
  };
};
export default connect(null, mapDispatchToProps)(NavBar);
