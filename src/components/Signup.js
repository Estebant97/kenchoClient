import React from 'react';
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import fetchAPI from '../lib/request';

class Signup extends React.Component {
    //el ComponentDidMount va arriba en caso de ocuparlo
    handleRegister = (event) => {
        event.preventDefault();
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirmPass = document.getElementById('confirmPass').value;
        let alert = document.querySelector('.result');
        alert.innerHTML = '';
        //handle that posswords match
        if(password === confirmPass){
            let data = {
                username,
                email: email,
                password: password
            }
            let settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify( data )
            }
            fetchAPI("/users/register", settings)
            .then( response => {
                return response.json();
            })
            .then( login => {
                alert.innerHTML += `<div class="alert alert-success" role="alert">
                                    La cuenta ha sido creada con exito, favor de iniciar sesion
                                    </div>`;
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            alert.innerHTML += `<div class="alert alert-danger" role="alert">
                                    Las contraseñas no coinciden
                                </div>`;
            // al realizar este cambio limpiar los valores de password
        }
    }
    render () {
        return(
            <>
            <section
                style={{
                    height: '100vh',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    
                }}>
                <NavBar searchVisible={true}/>
                <div className="result">

                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="mx-auto"
                                 style={{
                                     marginTop: '10%',
                                     backgroundColor: 'white',
                                     borderRadius: 10,
                                     width: '35%',
                                     height: '60vh',
                                     textAlign: 'center'
                                 }}>
                                <form onSubmit={this.handleRegister}>
                                    <div className="py-5">
                                        <h1 className="mb-5">Registrate</h1>
                                        <div className="form-group">
                                            <input type="text" placeholder='Nombre de usuario' id="username" style={{width: '70%'}}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" placeholder='Email' id="email" style={{width: '70%'}}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" placeholder='Contraseña' id="password" style={{width: '70%'}}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" placeholder='Confirmar contraseña' id="confirmPass"style={{width: '70%'}}/>
                                        </div>
                                        <button type="submit" className="btn mt-5" style={{width: '45%', backgroundColor: '#03989e', color: 'white'}}>
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                                <h6 className="text-center">¿Ya eres usuario?</h6>
                                <Link to="/" style={{color: '#03989e', fontWeight: 'bold', fontSize: 20}}>Inicia sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
}
export default Signup;
