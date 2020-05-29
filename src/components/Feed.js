import React from "react";
import Navbar from "./NavBar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from "@fortawesome/free-regular-svg-icons";
import fetchAPI from '../lib/request';

//Redirecciona al open post
//Se le tienen que mandar los props del post para que cargue la img y comments


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
        console.log(accessToken.username);
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
        const accessToken = localStorage.getItem("accessToken");
        const userId=accessToken.userOid;
        console.log(userId);
        const {posts}=this.state;
        console.log("entro al render");
        console.log(posts);
       
       
        return (
            <>
                <Navbar></Navbar>
                <div className="row">
                        <div className="col-sm-9 ml-5">
                            <h1 className="my-5" id="feedTitle">Memes Kencho</h1>
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