import React from "react";
import {Link} from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
const NavBar = ({searchVisible}) => { const handleLogout = (event) => {
    localStorage.removeItem("accessToken");

}
return (<Navbar expand="lg" style={{backgroundColor: '#03989e'}}>
<div className="container">
    <Navbar.Brand href="/feed">Kencho</Navbar.Brand>
    <div hidden={searchVisible}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/liked-posts">Mis Likes</Nav.Link>
                <Nav.Link as={Link} to="/activity-log">Mi Actividad</Nav.Link>
                <Nav.Link as={Link}to="/add-post">Añadir Meme</Nav.Link>
                <Nav.Link onClick={handleLogout} as={Link} to="/">Cerrar Sesión</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </div>
</div>
</Navbar>)};
export default NavBar;
