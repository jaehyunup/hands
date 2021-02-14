import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';

import { Route } from 'react-router-dom';
import login_img from '../../img/login_img.png';

class FindJob extends React.Component {
  render() {
    return (
      <div className="container" 
      style={{
        width:'100%',
        height:'700px',
        border:'1px solid black',
        margin:'100px auto',
        display: 'flex',
      }}>
        <div className="item"
        style={{
          width:'500px',
          height:'500px',
          border:'1px solid black',
          margin: '100px 50px'
        }}><img src={login_img} style={{
          width:'100%',
          height:'100%'
        }}></img>
        </div>
        <div className="item"
        style={{
          width:'500px',
          border:'1px solid black',
          margin: '0px 50px',
          marginBottom: '100px'
        }}>
          <div className="item"
            style={{
              width:'500px',
              height:'100px',
              border:'1px solid black',
            }}
          >
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check inline type="checkbox" label="청소" />
                <Form.Check inline type="checkbox" label="배달" />
                <Form.Check inline type="checkbox" label="안전귀가" />
                <Form.Check inline type="checkbox" label="펫" />
              </Form.Group>
            </Form>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                정렬 방법
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">거리순</Dropdown.Item>
                <Dropdown.Item href="#/action-2">평점순</Dropdown.Item>
                <Dropdown.Item href="#/action-3">기타</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="item"
            style={{
              width:'500px',
              height:'500px',
              border:'1px solid black',
            }}>
          </div>
        </div>

      </div>
    );
  }
}




export default FindJob;
