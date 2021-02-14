import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { login } from '../../actions'
import { useDispatch } from "react-redux";
import {Login} from '../pages/Login';
import userApp from '../../reducers';
import { withRouter } from 'react-router';
import axios from 'axios';


class LoginAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
    }
    //이미 로그인상태면 접근못함
    if (this.props.logintoken) {
      console.log("이미 로그인")
      this.props.history.push('/home')
      return
    }
  }

  //변수제어함수
  onEmailHandler = e => {this.setState({email: e.target.value})}
  onPasswordHandler = e => {this.setState({password: e.target.value})}

  //로그인실행
  loginHandler = () =>{
    const login_token = this.props.logintoken
    if (login_token) {
      // 로그인할떄 인증된 사용자인지 확인하는 axios
      // axios.get(`http://i4d101.p.ssafy.io:8080/mail/confirmation?email=${this.state.email}`)
      // .then(res => {
      //   console.log(res)
      //   const status = res.data
      //   if (status) {
      //     console.log('로그인성공')
      //     alert("로그인되었습니다.")
      //     this.props.history.push('/home')
      //   }
      //   else {
      //     console.log('인증되지않은 이메일')
      //     alert("이메일인증이 필요합니다. 메일을 확인해주세요.")
      //     window.location.href ='/login'
      //   }
      // })
      // .catch(err=> {
      //   console.log(err)
      //   window.location.href ='/login'
      // })
      this.props.history.push('/home')
      alert("로그인되었습니다.")
      /*
      if () {}
      인증된사용자면 로그인
      else {}
      아니면 로그인실패
      */
    }
    else {
      alert("아이디/비밀번호를 다시확인해주세요.")
      console.log('로그인실패')
    }
  }

  //로그인시도
  onSubmitHandler = async (e)=> {
    e.preventDefault();

    const userInfo = {
      userId : this.state.email,
      password : this.state.password
    } 
    //로그인함수 실행
    await this.props.userlogin(userInfo)

    setTimeout(this.loginHandler, 1000);
  }

  render() {
    return (
      <div>
        <div>LoginAccount</div>
        <form onSubmit={this.onSubmitHandler}>
          <label for="email">이메일</label>
          <input id="email" placeholder="이메일 주소" type="email" value={this.state.email} onChange={this.onEmailHandler} ></input><br/>

          <label for="password">비밀번호</label>
          <input id="password" placeholder="비밀번호" type="password" value={this.state.password} onChange={this.onPasswordHandler}></input><br/>
          <Link to="/login/findaccount">이메일/비밀번호 찾기</Link><br/>
          <button>로그인</button><br/>
          <Link to="/join">회원가입</Link>
        </form>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    logintoken: state.token
}}

const mapDispatchToProps  = (dispatch) => {
  return {
    userlogin:(login_info) => { dispatch(login(login_info))
    } 
  }
}

LoginAccount = connect(mapStateToProps ,mapDispatchToProps) (LoginAccount);


export default withRouter(LoginAccount);