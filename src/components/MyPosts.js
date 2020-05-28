import React from "react";
import Navbar from "./NavBar";
import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import fetchAPI from '../lib/request';


function clickEdit(){
    alert('editar comment');
}

 class MyPosts extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
        posts:[],
        };
        console.log(this.state);
      }
      //Delete post when clicking delete button
      //Hacer confirmación antes de picarle borrar
      //Darle refresh para que ya no salga
      onDeleteClick=(id)=>{
          console.log(id);

        const settings = {
            method: 'DELETE',
        }
        fetchAPI(`/deletePost/${id}`,settings)
        .then(response=>{
            response.json();
            console.log(response);
        })
        .catch( err => {
            console.log(err);
        })



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
        console.log(accessToken);
        const userId=accessToken.userOid;
        //console.log(userId);

        fetchAPI(`/postsByUser/${userId}`, settings)

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



      render(){

          const {posts}=this.state;

          return (
            <>
                <Navbar></Navbar>
                <div className="imagesFeed">
                    {posts.map(post=>
                        <div className="borderImage">
                            <div>
                                 @{post.userOid.username}
                            </div>
                                <img  className="images" src={post.image} alt={post.title}/>
                                        <p>{post.title}</p>
                                        <Button variant="secondary" onClick={clickEdit}>Editar pie de foto</Button>
                                        <Button variant="danger" onClick={() => this.onDeleteClick(post._id)}>Eliminar Post</Button> 
                        </div>
                    )}

                </div>
             </>  
        );             
     }  
 }

 export default MyPosts;