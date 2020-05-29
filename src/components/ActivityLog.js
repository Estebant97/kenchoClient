import React from "react";
import Navbar from "./NavBar";
import fetchAPI from '../lib/request';
import { Button,Modal,Form } from 'react-bootstrap';

class ActivityLog extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);
     
        this.state = {
        comments:[],
        deleteCommentModalShow:false,
        };
        console.log(this.state);
      }
      componentDidMount(){
        if(!localStorage.getItem("accessToken")){
            this.props.history.push("/login")
        } else {
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

        fetchAPI(`/getCommentsByUserId/${userId}`, settings)
        
        .then( response => {
            return response.json();
        })
        .then( data => {
            this.setState({comments:data});
            console.log( data );
            console.log(this.state);
        })
        .catch( err => {
            console.log(err);
        })
        }
      }
      onDeleteClick=id=>event=>{
        event.preventDefault();
        console.log(id);
        
            const settings = {
             method: 'DELETE',
            }
                fetchAPI(`/deleteComment/${id}`,settings)
                .then(response=>{
                    response.json();
                    console.log(response);
                })
                .then( deleted => {
                    window.location.reload();
                    alert.innerHTML += `<div class="alert alert-success" role="alert">
                                        El comentario se ha eliminado correctamente
                                        </div>`;
                })
                .catch( err => {
                console.log(err);
                })
     }    

    render() {
        //const { name, description, category, price } = this.state;
        let deletePostModalClose=()=>this.setState({deletePostModalShow:false});
        const {comments}=this.state;
        console.log(comments);
        
        return (
            <>
                <Navbar></Navbar>
                <div className="container">
                    <div className="row">
                        <div className="mt-5 py-3">
                            <h1>Comentarios del usuario</h1>
                           
                           <div>
                           
                               {comments.map(comment=>
                               <div>
                                  <div>Post: {comment.postOid.title}</div>
                                   <div>Comentario:{comment.content}</div>
                                   <Button variant="danger" onClick={()=>this.setState({deleteCommentModalShow:true})}>Eliminar comentario</Button>
                                            <Modal  show={this.state.deleteCommentModalShow}
                                                onHide={deletePostModalClose}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Eliminar comentario
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                        <Modal.Body>
                                                            ¿Seguro que deseas eliminar este comentario?
                                                        </Modal.Body>
                                                            <Modal.Footer>
                                                                <Form onSubmit={this.onDeleteClick(comment._id)}>
                                                                
                                                                <Button variant="danger" type="click" >Eliminar comentario este</Button>
                                                                <Button onClick={this.props.onHide}>Cerrar</Button>
                                                                </Form>
                                                               
                                                                {/*<Button variant="danger" onClick={() => this.onDeleteClick(post._id)}>Eliminar Post</Button>*/}
                                                               
                                                            </Modal.Footer>
                                            </Modal>
                                   <br></br>
                                   </div>
                                )}
                           </div>
                        </div>
                        <div>
                        </div>
                      
                    </div>
                </div>

            </>
        );
    }
}
export default ActivityLog;