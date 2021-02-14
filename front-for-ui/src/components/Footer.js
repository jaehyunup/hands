import React from 'react';
import {Navbar,NavbarBrand,Container} from 'react-bootstrap'
class Footer extends React.Component {
  render() {
    return (
         <div className="fixed-bottom">
                <Navbar bg="dark" fixed="bottom" color="right">
                    <Container>
                        <NavbarBrand>Footer</NavbarBrand>
                    </Container>
                </Navbar>
        </div>
      );
  }
}



export default Footer;
