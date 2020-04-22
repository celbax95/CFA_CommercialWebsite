import React from 'react';
import { getRessource } from '../service/api_services';
import { useParams } from "react-router-dom";

let parse = require('html-react-parser');

export default class UserPage extends React.Component { 
    constructor(props){
        super(props)
        this.state={selectedUser:null}
    }

    componentDidMount(){
        getRessource("user", this.props.user).then(result=>{
            if(result.title){
                this.setState({selectedUser:result});
            }
        });
    }

    render() {
        return (
          <div className="row" style={{flexDirection:"column"}}>
              {this.props.user?
                  <div style={{flexDirection:"column"}}>
                      <h2>{this.state.selectedUser.userName}</h2>
                      <h2>{this.state.selectedUser.email}</h2>
                      <h2>{this.state.selectedUser.address}</h2>
                      <h2>{this.state.selectedUser.favorites}</h2>
                      <h2>{this.state.selectedUser.registrationDate}</h2>
                      {/* <h2>{this.state.selectedUser.email}</h2> */}
                      {/* {parse(this.state.selectedUser.contenu)}   */}
                  </div>
                  : <div style={{flexDirection:"column"}}>
                      <h2>Bad id : User not found</h2> 
                  </div>
              }
          </div>
        );
    }
}

function Page(){
    let { id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
}