import React from 'react';
import LoginAccount from './LoginAccount'
import FindAccount from './FindAccount'
import FindAccountSuccess from './FindAccountSuccess'
import { Route } from 'react-router-dom';
import login_img from '../../img/login_img.png';

class Login extends React.Component {
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
        <Route exact path="/home/login" component={LoginAccount}/>
        <Route path="/home/login/findAccount" component={FindAccount}/>
        <Route path="/home/login/findAccountSuccess" component={FindAccountSuccess}/>
      </div>
    );
  }
}




export default Login;
