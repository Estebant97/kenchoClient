import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';

export class DeletePost extends Component{
    constructor(props){
        super(props);
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
                        Eliminar post
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        ¿Seguro que deseas eliminar este post?
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" >Eliminar post</Button>
                             {/*<Button variant="danger" onClick={() => this.onDeleteClick(post._id)}>Eliminar Post</Button>*/}
                            <Button onClick={this.props.onHide}>Cerrar</Button>
                        </Modal.Footer>
            </Modal>
        );
    }
}
export default DeletePost; 