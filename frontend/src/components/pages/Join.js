import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import logo from '../../img/logo.png'
import {Container, Image} from 'react-bootstrap'
import "../../styles/join.css"
class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  };
  render() {

    return (
      <div>
      <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light py-3">
          <div class="container">
            <a href="#" class="navbar-brand">
              <Image src={logo} width='150'></Image>
            </a>
          </div>
        </nav>
      </header>
      <Container>
        <div class="row py-2 align-items-center">
          <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" class="img-fluid mb-3 d-none d-md-block"/>
            <h1 class="mt-5">계정을 만드세요</h1>
            <p class="font-italic text-muted mt-3 mb-0">핸디는 사람들이 제각각 갖고있는</p>
            <p class="font-italic text-muted">자그마한 
                재능을 가치있게 여깁니다
            </p>
          </div>
          <div class="col-md-7 col-lg-6 ml-auto">
            <form action="#">
              <div class="row">
                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-user text-muted"></i>
                    </span>
                  </div>
                  <input id="username" type="text" name="username" placeholder="이름" class="form-control bg-white border-left-0 border-md"/>
                </div>
      
                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="nickname" type="text" name="nickname" placeholder="닉네임" class="form-control bg-white border-md border-left-0"/>
                </div>
      
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-envelope text-muted"></i>
                    </span>
                  </div>
                  <input id="email" type="email" name="email" placeholder="이메일(아이디)" class="form-control bg-white border-left-0 border-md"/>
                </div>
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="phone" type="tel" name="phone" placeholder="휴대폰 번호" class="form-control bg-white border-md border-left-0"/>
                </div>
      
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="address" type="text" name="address" placeholder="주소" class="form-control bg-white border-md border-left-0"/>
                </div>
             
      
                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input id="password" type="password" name="password" placeholder="비밀번호" class="form-control bg-white border-left-0 border-md"/>
                </div>

                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="비밀번호 확인" class="form-control bg-white border-left-0 border-md"/>
                </div>
                <div class="form-group col-lg-6 mx-auto mb-0">
                  <a href="#" class="btn joinbtn btn-block py-2">
                    <span class="font-weight-bold">가입하기</span>
                  </a>
                </div>
                <div class="form-group col-lg-6 mx-auto mb-0">
                  <a href="#" class="btn passbtn btn-block py-2">
                    <span class="font-weight-bold">비밀번호 찾기</span>
                  </a>
                </div>
      
      
                <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                  <div class="border-bottom w-100 ml-5"></div>
                  <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                  <div class="border-bottom w-100 mr-5"></div>
                </div>
                <div class="form-group col-lg-12 mx-auto">
                  <a href="#" class="btn btn-primary btn-block py-2 btn-facebook">
                    <i class="fa fa-facebook-f mr-2"></i>
                    <span class="font-weight-bold">페이스북으로 가입하기</span>
                  </a>
                  <a href="#" class="btn btn-primary btn-block py-2 btn-twitter">
                    <i class="fa fa-twitter mr-2"></i>
                    <span class="font-weight-bold">트위터로 가입하기</span>
                  </a>
                </div>
                <div class="text-center w-100">
                  <p class="text-muted">이미 계정이 있으신가요? <a href="#" class="text-primary ml-2"> 로그인하기</a></p>
                </div>
              </div>
            </form>
          </div>
          </div>
        </Container>
        </div>
    );
  }
}

export default Join;
