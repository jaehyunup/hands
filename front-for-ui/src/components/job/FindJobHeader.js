
import React from 'react';
import {Navbar, Nav,Form,Image} from 'react-bootstrap';
import {TextField,Fab} from '@material-ui/core';
import logo from '../../img/logo.png'
import SearchIcon from '@material-ui/icons/Search';
class FindJobHeader extends React.Component {
    render(){
        return(
            <Navbar style={{width:"100%"}}>
                <Navbar.Brand href="#home"><Image src={logo} width={"20%"}></Image></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#link">
                    </Nav.Link>
                </Nav>
                  
            </Navbar>
    )
    }
}export default FindJobHeader;