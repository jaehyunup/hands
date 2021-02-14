import React from 'react';
import { Button,Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../../styles/mainheader.css"

class MainHeader extends React.Component {
  render() {
    return (
    <>
    <Navbar collapseOnSelect className="py-3" expand="sm" fixed="top">
      <Navbar.Brand href="#home">HANDS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto px-3">
          <Nav.Link>
              <Link to="/home/findjob"/>일거리찾기
          </Nav.Link>
          <Nav.Link>
            <Link to=""/>우리동네 핸디찾기
          </Nav.Link>
        </Nav>
        <Nav className="sub-nav py-2">
          <Button className="loginText" onClick={this.openModal}>로그인</Button>
          <Button className="joinBtn mx-2">회원가입</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
  }
}


export default MainHeader;

