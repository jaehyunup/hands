import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Redirect} from 'react-router';
import '../index.css'

//page import
import Main from './pages/Main'
import Join from './pages/Join'
import Login from './pages/Login'
import FindHandy from './pages/FindHandy'
import FindJob from './pages/FindJob'
import CreateJob from './pages/CreateJob'
import Profile from './pages/Profile'
import ChatContents from './chats/ChatContents'

class App extends Component {
  render() {
    return ( 
      <div>
        <Route path="/home" component={Main}/>
        <Route path="/join" component={Join}/>
        <Route path="/login" component={Login}/>
        <Route path="/findjob" component={FindJob}/>
        <Route path="/createjob" component={CreateJob}/>
        <Route path="/findhandy" component={FindHandy}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/chat" component={ChatContents}/>
      </div>
    );
  }
}

export default App;