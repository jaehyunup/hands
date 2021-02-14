import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../pages';
import Login from '../components/account/Login'
import JobPage from '../pages/job/jobPage'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


class App extends Component {
  render() {
    return ( 
      <div style={{
        width:'100%',
        margin:'0px'
      }}>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/job" component={JobPage}/>
      </div>
    );
  }
}

export default App;