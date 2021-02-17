
import React from 'react';
import {Link} from 'react-router-dom';

import {Button,Navbar, Nav,Image} from 'react-bootstrap';
import logo from '../../img/logo.png'
import '../../styles/jobheader.css'

class FindJobHeader extends React.Component {
    render(){
        return(
            <>
    <Navbar collapseOnSelect className="py-3" expand="sm">
      <Navbar.Brand>
        <Link to="/home">
          <Image width={90} src={logo}></Image>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="sub-nav py-2">
          <Link to="/mypage"><Button className={"subnavbtnpink"}>일거리 관리</Button></Link>
          <Link to="/createjob"> <Button className={"subnavbtnblue"} >일거리만들기</Button></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    )
    }
}export default FindJobHeader;