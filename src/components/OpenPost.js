import React from "react";
import Navbar from "./NavBar";
import fetchAPI from '../lib/request';
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
                        alert.innerHTML = "";
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
            alert.innerHTML = "";
            alert.innerHTML += `<div class="alert alert-warning" role="alert">
                                    El post ya ha sido likeado
                                 </div>`;
        }
    }
    handleUnlike = (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        const {post} = this.state;
        const postid = post[0]._id;
        let liked = false;
        let alert = document.querySelector('.result');
        if(this.state.isLiked === true) {
        console.log("entro")
        this.setState({isLiked: false});
        const data = {
            postOid: postid, 
            liked : liked
        }
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body : JSON.stringify( data )
        }
        fetchAPI('/deleteLike', settings)
        .then( response => {
            return response.json()
        })
        .then( del => {
            alert.innerHTML = "";
            alert.innerHTML += `<div class="alert alert-success" role="alert">
                                    El post ya no esta likeado
                                 </div>`;
        })
        .catch( err => {
            console.log( err );
        })

        } else {
            alert.innerHTML = "";
            alert.innerHTML += `<div class="alert alert-warning" role="alert">
                                    El post no ha sido likeado
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
                                                    <FontAwesomeIcon icon={faArrowDown} size='3x' className="arrowDown"  onClick={this.handleUnlike}></FontAwesomeIcon>
                                                                    
                                            </span>
                                                <div>
                                                    <form onSubmit={this.handleComment}>
                                                        <textarea name="userComment" id="comment"/>
                                                            <div>
                                                                <input type="submit" value="Comentar" id="commentButton"/>
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
                 </div>
            </>
        );
    }
}
export default OpenPost;