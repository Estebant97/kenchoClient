import React from "react";
import Navbar from "./NavBar";
import fetchAPI from '../lib/request';

class ActivityLog extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
     
        this.state = {
        comments:[],
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

    render() {
        //const { name, description, category, price } = this.state;
        const {comments}=this.state;
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
                                   {comment.content}
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
