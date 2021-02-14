import React from 'react';

import { Button,Navbar, Nav,NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom"
import style from "../styles/header.css"

class Header extends React.Component {
  render() {
    return (
    <Navbar collapseOnSelect className="py-3" expand="lg" fixed="top">
      <Navbar.Brand href="#home">HANDS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto px-3">
          <Nav.Link>
              <Link to="/home/findjob"/>일거리찾기
          </Nav.Link>
          <Nav.Link><
            Link to=""/>우리동네 핸디찾기
          </Nav.Link>
        </Nav>
        <Nav className="sub-nav py-2">
          <Nav.Link className="loginText"><Link to=""/>로그인</Nav.Link>
          <Button className="joinBtn mx-2">회원가입</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}


export default Header;

