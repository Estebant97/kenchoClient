import React from "react";
import Navbar from "./NavBar";
import fetchAPI from '../lib/request';
import { Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";


function like(){
    alert('agregado a post likeados');
    
}
function unlike(){
    alert('eliminar de post likeados');
}


class OpenPost extends React.Component {


    constructor(props) {
        super(props);
     
        this.state = {
          post:[],
          isLiked:false,
          //commenter:[],
          
        };
    
      }
//CHECAR FUNCION PARA AGREGAR UN POST LIKEADO
/*
      like=(postOid)=>{
        alert('agregado a post likeados');
        let data ={
            //userOid:userOid,
            postOid:postOid,
            liked:true
        }
        const settings={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify( data )
        }
       
        fetchAPI('/newLike',settings)
        .then(response=>{
            return response.json();
        })
        .then(newLikedPosts=>{
            console.log(newLikedPosts);
        })
        .catch( err => {
            console.log(err);
        })
        
    }
   */
    componentDidMount(){
        if(!localStorage.getItem("accessToken")){
            this.props.history.push("/login")
        }
        const settings = {
            method: 'GET'
        }
        const accessToken = localStorage.getItem("accessToken");
        //check if its in production 
        fetchAPI(`/postsById/${this.props.match.params.id}`, settings)
        .then( response => {
            return response.json();
        })
        .then( data => {
            
            this.setState({post:data});
            //console.log( data );
            //console.log(this.state);
            //commenter(data.userOid);
            //commenter(this.props.match.params.userOid);
        })
        .catch( err => {
            console.log(err);
        })
        const postOid = this.props.match.params.id;
        const data = {postOid}
        const settingsGet = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body : JSON.stringify( data )
        }
        fetchAPI('/isLiked', settingsGet)
        .then( response => {
            return response.json();
        })
        .then( liked => {
            this.setState({isLiked:liked});
        })
        .catch( err => {
            console.log(err);
        })
        
    }
   
    //SUBMIT DEL FORM CON COMENTARIO
    
      handleComment=(event)=>{
        event.preventDefault();
        const {post} = this.state;
        const postOid = post[0]._id;
        const accessToken = localStorage.getItem("accessToken");
        const content = document.getElementById('comment').value;
        const data = {
            content : content,
            postOid : postOid
        }
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body : JSON.stringify( data )
        };
        fetchAPI('/newComment', settings)
        .then( response => {
            return response.json();
        })
        .then( comment => {
            window.location.reload();
        })
        .catch( err => {
            console.log(err);
        })
    }
    handleLike = (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const {post} = this.state;
        //const {isLiked} = this.state;
        const postid = post[0]._id;
        let liked = true;
        let alert = document.querySelector('.result');
        if(this.state.isLiked === false) {
        console.log("entro")
        this.setState({isLiked: true});
        const settingsGet = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        fetchAPI('/getLikesByUser', settingsGet)
        .then(response => {
            return response.json();
        })
        .then( like => {
                    const data = {
                        postOid : postid,
                        liked : liked
                    }
                    const settings = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`
                        },
                        body : JSON.stringify( data )
                    };
                    fetchAPI('/newLike', settings)
                    .then( response => {
                        return response.json();
                    })
                    .then( liked => {
                        alert.innerHTML += `<div class="alert alert-success" role="alert">
                                                        El post ha sido likeado
                                                        </div>`;
                        console.log(liked);
                    })
                    .catch( err => {
                        console.log(err);
                    }) 
        }) 
        .catch(err => {
            console.log(err);
        }) 
        } else {
            alert.innerHTML += `<div class="alert alert-warning" role="alert">
                                    El post ya ha sido likeado
                                 </div>`;
        }
    }
    render() {
        const {post}=this.state;
        return (
            <>
                <Navbar></Navbar>
                <div className="result">
                    
                </div>
                <div className="imagesFeed">
                    {post.map(post=>
                        <div className="borderImage">
                            <div>
                                 @{post.userOid.username}
                            </div>
                                <img  className="images" src={post.image} alt={post.title}/>
                                        <p>{post.title}</p>
                                            <span>
                                            {/*<FontAwesomeIcon icon={faArrowUp} size='3x' className="arrowUp" onClick={()=>this.like(post._id)}>*/}
                                                <FontAwesomeIcon icon={faArrowUp} size='3x' className="arrowUp" onClick={this.handleLike}></FontAwesomeIcon>
                                                    <FontAwesomeIcon icon={faArrowDown} size='3x' className="arrowDown"  onClick={unlike}>
                                                    </FontAwesomeIcon>
                                                                    
                                            </span>
                                                <div>
                                                    <form onSubmit={this.handleComment}>
                                                        <textarea name="userComment" id="comment"/>
                                                            <div>
                                                                <input type="submit" value="Submit" />
                                                            </div>
                                                    </form>
                                                </div>
                                               
                                                    <div>
                                                        {this.state.value}
                                                    </div>
                                                
                                                
                                            <div> 
                                                {post.comments.map(comment=>
                                                    <div>
                                                         <p> {comment.userOid.username}</p>
                                                         <p>{comment.content}</p>
                                                    </div>
                                                    )}
                                                    
                                            </div>
                            </div>
                    )}  
                    {/*
                <div className="borderImage">
                                   <p>@username</p>
                               <br>
                               </br>
                                   <img className="images"src={require('../assets/corgi.png')} alt="Corgi" />
                                    <p>Caption del meme</p>
                                    <br>
                                     </br>
                                   <div>
                                       <span>
                                   <FontAwesomeIcon icon={faArrowUp} size='4x' className="arrowUp" onClick={like}>
                                   </FontAwesomeIcon>
                                
                                   <FontAwesomeIcon icon={faArrowDown} size='4x' className="arrowDown" onClick={unlike}>
                                   </FontAwesomeIcon>
                                   </span>
                                  <div>
                                     <textarea placeholder="Dejar un comentario..."
                                    onChange={this.handleChange}
                                    rows={3}
                                    cols={40}
                                    />
                                     </div>
                                     <Button variant="success" style={{ height: 30 }} >Comentar</Button>
                                 <p>Cargar todos los comentarios abajo</p>
                               </div>
                               </div>
                               <br>
                               </br>
                    */}
                 </div>
            </>
        );
    }
}
export default OpenPost;