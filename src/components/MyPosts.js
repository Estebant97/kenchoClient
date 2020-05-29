import React from "react";
import Navbar from "./NavBar";
import { Button,Modal,Form } from 'react-bootstrap';
import fetchAPI from '../lib/request';



 class MyPosts extends React.Component{

    constructor(props) {
        super(props);
        console.log(props);
       

        this.state = {
        posts:[],
        deletePostModalShow:false,
        editCaptionModalShow:false,
        }
       
        console.log(this.state);
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



     
      //Delete post when clicking delete button
      //Hacer confirmación antes de picarle borrar
      //Darle refresh para que ya no salga
      onDeleteClick=id=>event=>{
          event.preventDefault();
          console.log(id);
          
        const settings = {
            method: 'DELETE',
        }
        fetchAPI(`/deletePost/${id}`,settings)
        .then(response=>{
            response.json();
            console.log(response);
        })
        .then( del => {
            window.location.reload();
        })
        .catch( err => {
            console.log(err);
        })
    }

        //Modificar titulo del meme
        handleSubmit=id=>event=>{
            console.log(id);
            event.preventDefault();
            const data = {
                _id : id,
                title : event.target.newTitle.value,
            }
            const settings = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify( data )
            };
    
            fetchAPI(`/updatePost/${id}`, settings)
                        .then( response => {
                            return response.json();
                        })
                        .then( update => {
                            window.location.reload();
                            alert.innerHTML += `<div class="alert alert-success" role="alert">
                                                El título del post se ha actualizado correctamente
                                                </div>`;
                        })
                        .catch( err => {
                            console.log(err);
                        })

       

    }
  
      
      
      
      
      render(){

          const {posts}=this.state;
          console.log(posts);
        let deletePostModalClose=()=>this.setState({deletePostModalShow:false});
        let editCaptionModalClose=()=>this.setState({editCaptionModalShow:false});
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
                                        <Button variant="secondary" onClick={()=>this.setState({editCaptionModalShow:true})} id="editCaption">Editar título del meme</Button>
                                        {/*<Button variant="danger" onClick={() => this.onDeleteClick(post._id)}>Eliminar Post</Button>*/}
                                        <Button variant="danger" onClick={()=>this.setState({deletePostModalShow:true})}>Eliminar post</Button>
                                            <Modal  show={this.state.deletePostModalShow}
                                                onHide={deletePostModalClose}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Eliminar post
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                        <Modal.Body>
                                                            ¿Seguro que deseas eliminar este post?
                                                        </Modal.Body>
                                                            <Modal.Footer>
                                                                <Form onSubmit={this.onDeleteClick(post._id)}>
                                                                <Button variant="danger" type="submit">Eliminar post</Button>
                                                                <Button onClick={this.props.onHide}>Cerrar</Button>
                                                                </Form>
                                                               
                                                                {/*<Button variant="danger" onClick={() => this.onDeleteClick(post._id)}>Eliminar Post</Button>*/}
                                                               
                                                            </Modal.Footer>
                                            </Modal>
                                                <Modal show={this.state.editCaptionModalShow}
                                                onHide={editCaptionModalClose}
                                                 size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Editar título del post
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                        <Modal.Body>
                                                            <div className="container">    
                                                                <Form onSubmit={this.handleSubmit(post._id)}>
                                                                    <Form.Group controlId="newTitle">
                                                                        <Form.Label>Editar título </Form.Label>
                                                                            <Form.Control
                                                                            type="text"
                                                                            name="newTitle"
                                                                            required
                                                                            />
                                                                    </Form.Group>
                                                                        <Form.Group>
                                                                            <Button variant="success" type="submit">Guardar cambios</Button>
                                                                        </Form.Group>
                                                                </Form>
                                                            </div>
                                                        </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button onClick={this.props.onHide}>Cerrar</Button>
                                                            </Modal.Footer>
                                                    </Modal>
                                       
                        </div>
                    )}

                </div>
             </>  
        );             
     }  
 }

 export default MyPosts;