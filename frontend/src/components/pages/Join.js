import React, { useState } from 'react';
import { Route ,Link} from 'react-router-dom';
import logo from '../../img/logo.png'
import {Container, Image} from 'react-bootstrap'
import "../../styles/join.css"
import axios from 'axios'
import { withRouter } from 'react-router';
import Signin from "../account/SignIn"
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
class Join extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      name:'',
      nickname:'',
      email: '',
      password:'',
      confirmPassword:'',
      phone:'',
      address:'',
      gender:'',
      description:'',
      type:0,

      userId:'',

      nameCheck:false,
      nicknameCheck:false,
      emailCheck:false,
      passwordCheck:false,
      phoneCheck:false,
      loginModalFlag:false

    }
  }

  modalToggle = () =>{
    this.setState({
        loginModalFlag:!this.state.loginModalFlag
    })
  }

  loginModalOn = () =>{
      this.setState({
          loginModalFlag:true
      })
  }
  //변수제어 함수
  onNameHandler = (e) => {this.setState({name: e.target.value, nameCheck:false})}
  onNicknameHandler = (e) => {this.setState({nickname: e.target.value,nicknameCheck:false})}
  onEmailHandler = (e) => {this.setState({email:e.target.value,userId:e.target.value,emailCheck:false})}
  onPasswordHandler = (e) => {this.setState({password: e.target.value,passwordCheck:false})}
  onConfirmPasswordHandler = (e) => {this.setState({confirmPassword: e.target.value})}
  onPhoneHandler = (e) => {this.setState({phone: e.target.value,phoneCheck:false})}
  onAddressHandler = (e) => {this.setState({address: e.target.value})}

  //닉네임중복확인함수
  checkNickname= async (e)=> {
    //닉네임중복확인 axios
    const _data = await axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/nickname/${this.state.nickname}`)
    .then(res => {
      return true
    })
    .catch(err=>{
      return false
    })
    return _data
  }


  //이메일 형식,중복 확인
  checkEmail= async (e)=>{

    //이메일 유효성 검사
    const check_Email = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    }

    let _data
    //이메일 유효성검사조건문
    if (check_Email(this.state.email) === false) {
      alert('이메일 형식이 유효하지 않습니다.')
      console.log("이메일 형식이 유효하지 않습니다.")
      this.setState({email:""})
      return false
    }
    else{
      //이메일 중복확인 axios
      _data = axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/id/${this.state.email}`)
      .then(res => {
        return true
      })
      .catch(err=>{
        return false
      })
    }
    return _data
  }
  //이름유효형식 확인함수
  checkName = async (e) => {
    console.log('checkName')
    const check_Name = function(str) {
      var regNm = /^[가-힣]{1,5}/;
      return regNm.test(str) ? true : false;
    }

    if (check_Name(this.state.name) ===false) {
      alert("이름은 한글 1~5자리만 사용 가능합니다.")
    }else {
      this.setState({
        nameCheck: true
      })
    }
  }

  //전화번호 형식, 중복 확인
  checkPhone =  async (phoneInfo) => {
    const phone = phoneInfo.substring(0,3) + "-" + phoneInfo.substring(3,7) + "-" + phoneInfo.substring(7,11)
    
    if (phone.length < 13) {
      alert("휴대전화번호 형식이 유효하지 않습니다.")
      return
    }
    //전화번호 중복확인 axios
    await axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/phone/${phoneInfo}`)
    .then(res=>{
      this.setState({
        phoneCheck:true
      })
    })
    .catch(err=>{
      console.error(err)
      console.log("이미존재하는 휴대전화번호 입니다.")
    })
  }

  // 비밀번호 형식, 일치하는지 확인하는 함수
  checkPassword = async () => {
    //비밀번호 유효성 검사(영문,숫자 혼합 6~20)
    const check_Password = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    }

    if (check_Password(this.state.confirmPassword) === false) {
      alert("비밀번호는 영문,숫자를 혼합하여 6~20자 이내로 작성해주세요")
      this.setState({
        password:"",
        confirmPassword:""
      })
    }
    else {
      if (this.state.password === this.state.confirmPassword) {
        this.setState({
          passwordCheck:true
        })
      }else {
        alert('비밀번호가 일치하지 않습니다')
      }
    }
  }


  //회원가입 진행
  onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log('signin')
    await this.checkName()
    await this.checkPhone(this.state.phone)
    await this.checkPassword()

    const _nicknameCheck = await this.checkNickname()
    const _emailCheck = await this.checkEmail()

    console.log(_nicknameCheck)
    console.log(_emailCheck)
    await this.setState({
      nicknameCheck: _nicknameCheck,
      emailCheck: _emailCheck
    })
    
    const body = {
      userId: this.state.userId,
      password: this.state.password,
      email: this.state.email,
      nickname: this.state.nickname,
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      type: this.state.type,
      
      userUuid: '',
    }
    console.log(body)
    console.log(this.state.nameCheck, this.state.nicknameCheck, this.state.emailCheck, this.state.passwordCheck)
    if (
      this.state.email &&
      this.state.name &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.nickname &&
      this.state.phone
    ) {
      if (this.state.nameCheck === true) {
        if (this.state.nicknameCheck === true) {
          if (this.state.emailCheck === true) {
            if(this.state.passwordCheck === true) {
              //회원가입 axios
              axios.post(`http://i4d101.p.ssafy.io:8080/auth/join`,JSON.stringify(body),
              {headers:{
                'Content-Type': 'application/json'
              }})
              .then(res => {
                this.setState({
                  userUuid: res.data
                })
                const inputinfo = {
                  userUuid:res.data
                }

                //크레딧 계좌생성 axios
                axios.post('http://i4d101.p.ssafy.io:8080/credit', JSON.stringify(inputinfo), {headers:{
                  'Content-Type': 'application/json'
                }})
                .then(res => {
                  console.log("크레딧 계좌 생성 성공")
                })
                .catch(err => {
                  console.error(err)
                  console.log("크레딧 계좌 생성 실패")
                })

                //인증메일 발송 axios
                axios.get(`http://i4d101.p.ssafy.io:8080/mail/confirmation?email=${this.state.email}`)
                .then(res => {
                  console.log('인증메일 발송')
                })
                alert("이메일로 인증메일이 발송 되었습니다. 인증을 해주세요.")
                this.props.history.push('/home')

              })
              .catch(err => {
                console.error(err)
                console.log("회원가입에 실패하였습니다.")
              })
            }
            else {
              alert("비밀번호를 다시 입력해주세요.")
            }
          }
          else {
            alert("이메일을 다시 입력해주세요")
          }
        }
        else {
          alert("닉네임을 다시 입력해주세요")
        }
      }
      else {
        alert("이름을 다시 입력해주세요")
      }
    }
    else {
      alert("필수입력정보를 입력해주세요")
    }
  }

  //로그인화면으로 전환
  gologin = (e) => {
    e.preventDefault()
    this.props.history.push('/login')
  }
  render() {

    return (
      <div>
      <header class="header">
        <nav class="navbar navbar-light pt-2">
          <div class="container">
            <a href="#" class="navbar-brand">
              <Link to="/home">
                <Image src={logo} width='130'></Image>
              </Link>
            </a>
          </div>
        </nav>
      </header>
      <Container fluid >
            <Signin loginModalFlag={this.state.loginModalFlag} onLoginModal={this.loginModalOn} loginModalToggleHandler={this.modalToggle}/>
        </Container>
      <Container>
        <div class="row py-2 align-items-center">
          <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" class="img-fluid mb-3 d-none d-md-block"/>
            <h1 class="mt-5">계정을 만드세요</h1>
            <p class="font-italic text-muted mt-3 mb-0">핸디는 사람들이 제각각 갖고있는</p>
            <p class="font-italic text-muted">자그마한 
                재능을 가치있게 여깁니다
            </p>
            <Link to="/home"><button style={{fontFamily:"gmarket-700"}} className={"btn btn-lg btn-secondary mt-4"}><KeyboardReturnIcon></KeyboardReturnIcon> 돌아가기</button></Link>

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
                  <input id="username" type="text" name="username" placeholder="이름"  class="form-control bg-white border-left-0 border-md"
                  value={this.state.name} onChange={this.onNameHandler} autocomplete="off"/>
                </div>
      
                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="nickname" type="text" name="nickname" placeholder="닉네임" class="form-control bg-white border-md border-left-0" autocomplete="off"
                  value={this.state.nickname} onChange={this.onNicknameHandler}/>
                </div>
      
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-envelope text-muted"></i>
                    </span>
                  </div>
                  <input id="email" type="email" name="email" placeholder="이메일(아이디)"  class="form-control bg-white border-left-0 border-md"
                  value={this.state.email} onChange={this.onEmailHandler} autocomplete="off"/>
                </div>
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="phone" type="tel" name="phone" placeholder="휴대폰 번호" class="form-control bg-white border-md border-left-0"
                  value={this.state.phone} onChange={this.onPhoneHandler} autocomplete="off"/>
                </div>
      
                <div class="input-group col-lg-12 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-phone-square text-muted"></i>
                    </span>
                  </div>
                  <input id="address" type="text" name="address" placeholder="주소" 
                  class="form-control bg-white border-md border-left-0"
                  value={this.state.address} onChange={this.onAddressHandler} autocomplete="off"/>
                </div>
             
      
                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input id="password" type="password" name="password" placeholder="비밀번호" class="form-control bg-white border-left-0 border-md"
                  value={this.state.password} onChange={this.onPasswordHandler}/>
                </div>

                <div class="input-group col-lg-6 mb-4">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white px-4 border-md border-right-0">
                      <i class="fa fa-lock text-muted"></i>
                    </span>
                  </div>
                  <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="비밀번호 확인" class="form-control bg-white border-left-0 border-md" value={this.state.confirmPassword} onChange={this.onConfirmPasswordHandler}/>
                </div>
                <div class="form-group col-lg-12 mx-auto mb-0">
                  <a href="#" class="btn joinbtn btn-block py-2" onClick={this.onSubmitHandler}>
                    <span class="font-weight-bold">가입하기</span>
                  </a>
                </div>
                {/* <div class="form-group col-lg-6 mx-auto mb-0">
                  <a href="#" class="btn passbtn btn-block py-2">
                    <span class="font-weight-bold">비밀번호 찾기</span>
                  </a>
                </div> */}
      
      
                <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                  <div class="border-bottom w-100 ml-5"></div>
                  <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                  <div class="border-bottom w-100 mr-5"></div>
                </div>
                <div class="form-group col-lg-12 mx-auto">
                  <button href="#" class="btn btn-primary btn-block py-2 btn-facebook">
                    <i class="fa fa-facebook-f mr-2"></i>
                    <span class="font-weight-bold">페이스북으로 가입하기</span>
                  </button>
                  <button href="#" class="btn btn-primary btn-block py-2 btn-twitter">
                    <i class="fa fa-twitter mr-2"></i>
                    <span class="font-weight-bold">트위터로 가입하기</span>
                  </button>
                </div>
                <div class="text-center w-100">
                  <p class="text-muted">이미 계정이 있으신가요? <a style={{fontFamily:"gmarket-700"}} onClick={this.modalToggle}  class="text-primary ml-2"> 로그인하기</a></p>
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

export default withRouter(Join);