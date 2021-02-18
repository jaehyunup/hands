import React from 'react';
import { Button,Navbar, Nav,Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions'
import { withRouter } from 'react-router';

import logo from '../../img/logo.png'


import "../../styles/mainheader.css"

class MainHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        loginModalFlag:false,
        logintoken:'',
    }
  }

  componentDidMount() {
    this.setState({
      logintoken:this.props.logintoken
    })
  }


  onLogOut = (e) => {
    e.preventDefault();
    
    this.props.userlogout()
    window.location.href = "/home"
  } 

  Gotojoin = (e) => {
    e.preventDefault();
    this.props.history.push('/join')

  }

  render() {
    return (
    <>
    <Navbar collapseOnSelect className="py-3" expand="sm" fixed="top">
      <Navbar.Brand ><Link to="/home"><Image width={90} src={logo}></Image></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto px-3">
          <Nav.Link>
              <Link to="/findjob">일거리찾기</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/chat">메신저</Link>
          </Nav.Link>
          {
          this.props.logintoken &&
          <Nav.Link>
            <Link to="/mypage">마이페이지</Link>
          </Nav.Link>

          }
        </Nav>
        <Nav className="sub-nav py-2">
          {
            !this.props.logintoken && 
            <Button className="loginText" onClick={this.props.modalToggleFunc}>로그인</Button>
          }
          {
            !this.props.logintoken && 
            // <Button className="joinBtn mx-2">회원가입</Button>
            <Button className="joinBtn mx-2" onClick={this.Gotojoin}>회원가입</Button>
          }
          {
            this.props.logintoken && 
            <Button onClick={this.onLogOut}>로그아웃</Button>
          } 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    logintoken: state.token
}
}

const mapDispatchToProps  = (dispatch) => {
  return {
    userlogout:() => {dispatch(logout())
    } 
  }
}


MainHeader = connect(mapStateToProps ,mapDispatchToProps) (MainHeader);


export default withRouter(MainHeader);