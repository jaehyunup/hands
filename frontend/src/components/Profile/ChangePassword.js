import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { logout } from '../../actions'
import { compose } from 'redux';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      beforepassword:'',
      password:'',
      newpassword:'',
      newconfirmpassword:'',
    }
  }

  //변수제어 함수
  onNewPasswordHandler = e => {this.setState({newpassword: e.target.value})}
  onNewConfirmPasswordHandler = e => {this.setState({newconfirmpassword:e.target.value})}

  //로그아웃 함수
  onLogOut = () => {
    
    this.props.history.push('/home')
    //로그아웃실행
    this.props.userlogout()

    // setTimeout(this.logoutHandler, 1000);
  }

  //비밀번호변경 함수
  onSubmitHandler = e => {
    e.preventDefault()

    if (this.state.newpassword &&
      this.state.newconfirmpassword) {
        if (this.state.newpassword == this.state.newconfirmpassword) {
          const inputInfo = {
            newPassword: this.state.newpassword
          }
          //비밀번호변경 axios
          console.log(JSON.stringify(inputInfo))
          console.log(this.props.logintoken)
          
          axios.put("http://i4d101.p.ssafy.io:8080/auth/user/password", JSON.stringify(inputInfo), {headers:{
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.props.logintoken
          }})
          .then(res => {
            alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요")
            this.onLogOut()
          })
          .catch(err => {
            console.log(err)
          })
        }else {
          alert("변경할 비밀번호가 일치하지 않습니다.")
        }
      }else{
        alert("변경할 비밀번호를 입력해주세요.")
      }

  }
  render() {
    return (
      <div>
        <div>ChangePassword</div>
        <form onSubmit={this.onSubmitHandler}>
          {/* <label for="password">현재 비밀번호 </label>
          <input id="password" type="password"></input><br/> */}
          <label for="newpassword">새로운 비밀번호</label>
          <input id="newpassword" type="password" value={this.state.newpassword} onChange={this.onNewPasswordHandler}></input><br/>
          <label for="newconfirmpassword">비밀번호 확인</label>
          <input id="newconfirmpassword" type="password" value={this.state.newconfirmpassword} onChange={this.onNewConfirmPasswordHandler}></input><br/>
          <button type="submit">비밀번호 변경</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logintoken:state.token
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    userlogout:() => {dispatch(logout())} 
  }
}

ChangePassword = connect(mapStateToProps ,mapDispatchToProps) (ChangePassword);

export default ChangePassword;