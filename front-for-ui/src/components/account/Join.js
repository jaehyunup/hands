import React, { useState } from 'react';
import JoinAccount from './JoinAccount'

import { Route } from 'react-router-dom';
import login_img from '../../img/login_img.png';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  };
  render() {

    return (
      <div className="container" 
      style={{
        width:'1000px',
        height:'700px',
        margin:'100px auto',
        display: 'flex',
      }}>
        <div className="item"
        style={{
          width:'500px',
          height:'500px',
          margin: '100px 50px'
        }}><img src={login_img} style={{
          width:'100%',
          height:'100%'
        }}></img>
        </div>
        <Route exact path="/home/join" component={JoinAccount}/>

      </div>
    );
  }
}




export default Join;
