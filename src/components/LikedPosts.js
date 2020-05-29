import React from "react";
import Navbar from "./NavBar";
import fetchAPI from '../lib/request';

class LikedPosts extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
     
        this.state = {
        likes:[],
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
        const likes = document.querySelector('.result');

        fetchAPI("/getLikesByUser", settings)
        .then( response => {
            return response.json();
        })
        .then( data => {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                console.log(data[i]);
                likes.innerHTML += `<div> ${data[i].postOid.title} </div>`
            }
        })
        .catch( err => {
            console.log(err);
        })
        }
      }    

    render() {
        //const { name, description, category, price } = this.state;
        const {likes}=this.state;
        return (
            <>
                <Navbar></Navbar>
                <div className="container">
                    <div className="row">
                        <div className="mt-5 py-3">
                            <h1>Titulos de posts likeados</h1>
                           
                           <div className="result">
                               
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
export default LikedPosts;