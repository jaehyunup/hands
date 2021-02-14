import React from 'react';
import { Box } from '@material-ui/core';
import { Form, Dropdown } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import login_img from '../../img/login_img.png';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';




class FindHandy extends React.Component {
  render() {
    
    return (
      <div
      style={{
        width:'1200px',
        height:'700px',
        margin:'100px 100px',
        display: 'flex',
      }}>
        <div className="item"
        style={{
          width:'300px',
          height:'100%',
          margin: '0px 50px'
        }}>
          <div 
          style={{
            height:'300px',
            border:'1px solid black',
            marginBottom:'10px'
          }}>
            추천핸디
            <Box
            display="flex"
            flexDirection="row"
            style={{
              height:'50px',
              border:'1px solid black',
              margin:'10px 10px'
            }}>
              <Box 
              style={{
                height:'100%',
                width:'20%',
                border:'1px solid black',
              }}>
                <Avatar alt="cat" src="/../../img/cat.JPG"/>
              </Box>
              <Box
              style={{
                height:'100%',
                width:'50%',
                border:'1px solid black',
              }}>
                <p
                style={{
                  margin:'0'
                }}
                >ssafy4</p>
                <p>최근거래 1건</p>
              </Box>
              <Box
              style={{
                height:'100%',
                width:'30%',
                border:'1px solid black',
              }}>
                <Button variant="contained" color="primary"           >팔로우</Button>
              </Box>
            </Box>
          </div>
          
    
          <div>
            <img src={login_img} style={{
            width:'100%',
            height:'100%'
          }}></img>
          </div>
        </div>
        <div className="item"
        style={{
          width:'700px',
          border:'1px solid black',
          margin: '0px 50px',
          marginBottom: '100px'
        }}>
          <div className="item"
            style={{
              width:'700px',
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
              width:'700px',
              height:'500px',
              border:'1px solid black',
            }}>
              <Box
              display="flex"
              flexDirection="row"
              style={{
                height:'50px',
                border:'1px solid black',
                margin:'10px 10px'
              }}>
                <Box 
                style={{
                  height:'100%',
                  width:'10%',
                  border:'1px solid black',
                }}>
                  <Avatar alt="cat" src="/../../img/cat.JPG"/>
                </Box>
                <Box
                style={{
                  height:'100%',
                  width:'75%',
                  border:'1px solid black',
                }}>
                  <p
                  style={{
                    margin:'0'
                  }}
                  >ssafy4</p>
                  <p>#고양이 #강아지 #펫 #밥주기 </p>
                </Box>
                <Box
                style={{
                  height:'100%',
                  width:'15%',
                  border:'1px solid black',
                }}>
                  <Button variant="contained" color="primary"           >상세보기</Button>
                </Box>
              </Box>
          </div>
        </div>

      </div>
    );
  }
}




export default FindHandy;
