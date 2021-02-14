import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"


class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/home">HANDS</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
            <Link to="/home/findjob" 
              style={{
              marginTop:'10px',
              color:'darkgray'
              
            }}>
              일거리찾기
            </Link>
              
              </Nav.Link>
            <Nav.Link>
            <Link to="/home/findhandy" 
              style={{
              marginTop:'10px',
              color:'darkgray'
              
            }}>
              핸디찾기
            </Link>
              
              </Nav.Link>
          </Nav>
          <Navbar.Brand>
            <Link to="/home/login" 
            style={{
              color:'darkgray'
            }}>
              로그인
            </Link>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}


export default Header;

