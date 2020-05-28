import React from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import LikedPosts from './components/LikedPosts';
import ActivityLog from './components/ActivityLog';
import OpenPost from './components/OpenPost'
import Feed from './components/Feed';
import AddPost from './components/AddPost';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
      <>
          <div>
              <Router>
                  <Switch>
                      <Route path="/feed" component={Feed}/>
                      <Route path="/signup" component={Signup}/>
                      <Route path="/liked-posts" component={LikedPosts}/>
                      <Route path="/activity-log" component={ActivityLog}/>
                      <Route path="/open-post/:id" component={OpenPost} />
                      <Route path="/add-post" component={AddPost} />
                      <Route path="/" component={Login}/>
                  </Switch>
              </Router>
          </div>
      </>
  );
}

export default App;
