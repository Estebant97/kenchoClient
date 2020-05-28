import React from "react";
import Navbar from "./NavBar";
import { Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {faCommentAlt} from "@fortawesome/free-regular-svg-icons";
import fetchAPI from '../lib/request';
import { access } from "fs";
//import { withRouter } from "react-router-dom";
//import { useHistory } from "react-router-dom";
//var Modal = ReactBootstrap.Modal;
//import {corgi} from "../assets/corgi.png";

//Redirecciona al open post
//Se le tienen que mandar los props del post para que cargue la img y comments

/*
function postToOpen(){
    //this.props.history.push("/open-post");
    window.location.href='/open-post';
}

*/

//likedPost = true, agregarlo a los post likeados del usuario


class Feed extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
     
        this.state = {
          posts:[],
        };
        console.log(this.state);
      }
      //funcion cuando le pican like 
      //checar parametros recibidos
      

      onClick =(id) => {
        this.props.history.push(`/open-post/${id}`);
      }
     
    componentDidMount(){
        if(!localStorage.getItem("accessToken")){
            this.props.history.push("/login")
        }
        const accessToken = localStorage.getItem("accessToken");
        const settings = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        //check if its in production 
        fetchAPI("/posts", settings)
        .then( response => {
            return response.json();
        })
        .then( data => {
            this.setState({posts:data});
            console.log( data );
            console.log(this.state);
        })
        .catch( err => {
            console.log(err);
        })
    }


    render() {
        const {posts}=this.state;
        console.log("entro al render");
        console.log(posts);
       
        return (
            <>
                <Navbar></Navbar>
                <div className="row">
                        <div className="col-sm-9 ml-5">
                            <h1 className="my-5">Memes Kencho</h1>
                        </div>
                            <div className="card text-white bg-dark mb-3" style={{maxWidth : "18rem", maxHeight: "5rem"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">@Username</h5>
                                    </div>  
                                </div>
                                <div className="imagesFeed">
                                     <div >
                                        {posts.map(post=>
                                        <div className="borderImage">
                                            <div>
                                                {post.userOid.username}
                                             </div>
                                                <img  className="images" src={post.image} onClick={()=>this.onClick(post._id)} alt="meme"/>
                                                    <p>{post.title}</p>
                                                        
                                                        
                                                                <span className="commentBox" onClick={()=>this.onClick(post._id)} >
                                                                    <FontAwesomeIcon icon={faCommentAlt} size='3x' className="comment">
                                                                    </FontAwesomeIcon>
                                                                </span>
                                                    
                                                        
                                         </div>
                                        )}  
                                </div>
                        </div>

                </div>
                
            </>
        );
    }

}
export default Feed;
