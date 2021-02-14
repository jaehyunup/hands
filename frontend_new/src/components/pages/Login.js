import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginAccount from '../account/LoginAccount'
import FindAccount from '../account/FindAccount'

class Login extends React.Component {
  render() {
    return (
      <div>
        <div>Login</div>
        <Route exact path="/login" component={LoginAccount}/>
        <Route exact path="/login/findaccount" component={FindAccount}/>
        <a href="/home">홈으로</a>
      </div>
    )
  }
}

export default Login;