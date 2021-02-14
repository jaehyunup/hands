import React, { Component } from 'react';
import women from '../../img/women.png'
import {Link} from "react-router-dom";
import Signin from "../account/SignIn"
import { Col, Container, Image, Row} from 'react-bootstrap'
import "../../styles/mainpage.css"
import MainHeader from "../header/MainHeader"
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <>
        <MainHeader></MainHeader>
        <Container fluid>
                    <Signin modalIsOpen={this.state.modalFlag} close={this.closeModal} />
                    <Row className="hero">
                        <div className="diagonal-hero-bg">
                            <div className="stars">
                                <div className="small"/>
                                <div className="medium"/>
                                <div className="big"/>
                            </div>
                        </div>
                    </Row>

                    <Row className="d-flex align-items-center vh-100">
                        <Col md={6} lg={6} xs={12}>
                            <div className="illustration">
                            <Image style={{
                                display: 'inline-block',
                                width: '350px',
                                marginLeft: '13rem',
                            }} src={women}/>
                            <div class="ground"></div>
                            <div class="ground-one"></div>
                            <div class="bush-one"></div>
                            <div class="building-left">
                                <div class="top"></div>
                            </div>
                            <div class="building-right">
                                <div class="top"></div>
                            </div>
                            <div class="building">
                                <div class="top"></div>
                                <div class="window-1"></div>
                                <div class="window-2"></div>
                                <div class="window-3"></div>
                                <div class="window-4"></div>
                                <div class="window-5"></div>
                                <div class="window-6"></div>
                                <div class="window-7"></div>
                                <div class="window-8"></div>
                            </div>
                            <div class="bush-two"></div>
                            <div class="bush-three"></div>
                            <div class="stem-one">
                                <div class="leaves-one"></div>
                                <div class="leaves-two"></div>
                                <div class="branch"></div>
                            </div>
                            <div class="stem-two"></div>
                            <div class="balloon">
                                <div class="base"></div>
                                <div class="head"></div>
                            </div>
                        </div>
                        </Col>
                        <Col md={6} lg={6} xs={12}>
                            <div className="mainTextDiv">
                                <h1>우리 핸디들은</h1>
                                <p className="textSlide"></p>
                                <h1>용돈을 벌어가요</h1>
                                <div className="text-bottom-button">
                                    <button className="btn btn-lg mainjoinBtn mt-4 mx-1">가입하고 용돈벌기</button>
                                    <button className="btn btn-lg mainjobBtn mt-4 mx-1">일거리 구경하기</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                  <Row className="d-flex align-items-center justify-content-center vh-100 section1">
                    <Col md={12} lg={12}>
                      <div class="section1TextDiv my-4 pt-2">
                          <h3>프로필을 통해 자신을 소개하고 연관된 소일거리를 찾아보세요.</h3>
                          <p>나와 연결된 사람, 관심사가 비슷한 사람과 거래하세요.</p>
                          <Link to="">내 프로필 작성하러 가기</Link>
                      </div>
                    </Col>
                    <Col md={3} lg={3}>
                        
                    </Col>
                    <Col md={3} lg={3}>
                        
                    </Col>
                  </Row>
        </Container>
      </>
    )
  }
}


export default Main;