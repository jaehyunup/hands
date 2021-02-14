
import React from 'react';
import {Button,Navbar, Nav,Form,Image} from 'react-bootstrap';
import {TextField,Fab} from '@material-ui/core';
import logo from '../../img/logo.png'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import Signin from "../../components/account/Signin"

class FindJobHeader extends React.Component {
    render(){
        return(
            <>
    <Navbar collapseOnSelect className="py-3" expand="sm">
      <Navbar.Brand href="#home">
      <Image width={80} src={logo}></Image>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto px-3">
          <Nav.Link>
              <Link to=""/>일거리찾기
          </Nav.Link>
          <Nav.Link>
            <Link to=""/>우리동네 핸디찾기
          </Nav.Link>
        </Nav>
        <Nav className="sub-nav py-2">
          <Nav.Link className="loginText" onClick={this.openModal}>일거리 관리</Nav.Link>
          <Button className="joinBtn mx-2">일거리만들기</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
    }
}export default FindJobHeader;