import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Redirect} from 'react-router'
import Header from './Header'

//page import
import Main from './pages/Main'
import Join from './pages/Join'
import Login from './pages/Login'
import FindHandy from './pages/FindHandy'
import FindJob from './pages/FindJob'
import CreateJob from './pages/CreateJob'
import Profile from './pages/Profile'

class App extends Component {
  render() {
    return ( 
      <div>
        <Header/>
        <Redirect exact path="/" to="/home"/>
        <Route path="/home" component={Main}/>
        <Route path="/join" component={Join}/>
        <Route path="/login" component={Login}/>
        <Route path="/findjob" component={FindJob}/>
        <Route path="/createjob" component={CreateJob}/>
        <Route path="/findhandy" component={FindHandy}/>
        <Route path="/profile" component={Profile}/>
      </div>
    );
  }
}

export default App;