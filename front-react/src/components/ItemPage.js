import React from 'react';
import { getRessource } from '../service/api_services';
import { useParams } from "react-router-dom";
import {Button, Card, CardContent, CardHeader, CardMedia, CardActions, ButtonGroup, Typography, CardActionArea} from "@material-ui/core";
import './ItemPage.css';

let parse = require('html-react-parser');

export default class ItemFullPage extends React.Component {

    constructor(props){
        super(props)
        this.state={selectedPost:null}
    }

    componentDidMount(){
        getRessource("item", this.props.id).then(result=>{
            if(result.title){
                this.setState({selectedPost:result});
                console.log('get!');
            }
            else {
                console.log('not get!');
            }
        });
    }

    render() {
        return (
            <div className="row" style={{flexDirection:"column"}}>
                {this.state.selectedPost?
                    <Card style={{ marginLeft: 200, marginRight: 200, marginTop: 20, marginBottom: 10}}>
                        <CardActionArea>
                            <CardContent>
                                <img src={this.state.selectedPost.image}/>
                            </CardContent>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.selectedPost.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.selectedPost.description}
                                </Typography>
                                <span>Etat: {this.state.selectedPost.state}</span>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                            <ButtonGroup variant="text" >
                                <Button onClick={function () {
                                    window.location = "/home";
                                }}>
                                    Retour
                                </Button>
                                <Button color="primary" onClick={function () {
                                    window.location = "/buy/" + this.state.selectedPost._id;
                                }}>
                                    Commander
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Card>


                    : <div style={{flexDirection:"column"}}>
                        <h2>Bad id : Post not found</h2>
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