import React,{Component} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import fetchAPI from '../lib/request';


export class EditCaption extends Component{
    constructor(props){
        super(props);
        this.state = {
            post:[],

          };
    }
    handleSubmit(event){
        event.preventDefault();
        const data = {
            _id : this.props._id,
            title : event.target.newTitle.value,
        }
        const settings = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify( data )
        };

        fetchAPI(`/updatePost/${this.props.match.params._id}`, settings)
                    .then( response => {
                        return response.json();
                    })
                    .then( update => {
                        alert.innerHTML += `<div class="alert alert-success" role="alert">
                                            El título del post se ha actualizado correctamente
                                            </div>`;
                    })
                    .catch( err => {
                        console.log(err);
                    })

    }
    render(){
        return(
            <Modal
            {...this.props}
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

                        <Form onSubmit={this.handleSubmit}>
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
        );
    }
}
export default EditCaption;