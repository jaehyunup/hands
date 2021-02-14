import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../pages';


class App extends Component {
  render() {
    return ( 
      <div style={{
        width:'1400px',
        margin:'auto'
      }}>
        <Route path="/home" component={Home}/>
      </div>
    );
  }
}

export default App;