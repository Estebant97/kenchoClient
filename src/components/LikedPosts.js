import React from "react";
import Navbar from "./NavBar";


class LikedPosts extends React.Component {
    componentDidMount(){
        if(!localStorage.getItem("accessToken")){
            this.props.history.push("/login")
        }
    }
    render() {
        return (
            <>
            <Navbar></Navbar>
            <div className="container">
                <div> <h1>Aqui se desplegaran los posts likeados por el usuario</h1></div>
               
            </div>
            </>
        );
    }
}
export default LikedPosts;
