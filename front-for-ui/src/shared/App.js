import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../pages';
import Login from '../components/account/Login'
import Join from '../components/account/Join';


class App extends Component {
  render() {
    return ( 
      <div style={{
        width:'100%',
        margin:'0px'
      }}>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/join" component={Join}/>

      </div>
    );
  }
}

export default App;