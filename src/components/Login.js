import React from 'react';
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import fetchAPI from '../lib/request';

class Login extends React.Component {
    componentDidMount() {
        if(localStorage.getItem("accessToken")){
            this.props.history.push("/feed")
        }
    }
    handleLogin = (event) => {
        event.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let data = {
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
        fetchAPI("/users/login", settings)
        .then( response => {
            return response.json();
        })
        .then( login => {
            localStorage.setItem("accessToken",login.token);
            this.props.history.push("/feed");
        })
        .catch( err => {
            console.log(err);
        })
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
                                <form onSubmit={this.handleLogin}>
                                    <div className="py-5">
                                        <h1 className="mb-5">Iniciar Sesión</h1>
                                        <div className="form-group">
                                            <input type="email" placeholder='Email' id="email" style={{width: '70%'}}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" placeholder='Contraseña' id="password" style={{width: '70%'}}/>
                                        </div>
                                        <button type="submit" className="btn mt-5" style={{width: '45%', backgroundColor: '#03989e', color: 'white', fontWeight: 'bold', fontSize:20}}>
                                            Iniciar Sesion
                                        </button>
                                    </div>
                                </form>
                                <h6 className="text-center">¿Aún no tienes cuenta de Kencho?</h6>
                                <Link to="/signup" style={{color: '#03989e', fontWeight: 'bold', fontSize: 20}}>Registrate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
}
export default Login;
