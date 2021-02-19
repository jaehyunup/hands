import axios from 'axios';
import React from 'react';

class FindAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'',
      phone:'',
      email:'',
    }
  }
  //변수제어함수들
  onNameHandler = e =>{this.setState({name: e.target.value})}
  onPhoneHandler = e =>{this.setState({phone: e.target.value})}
  onEmailHandler = e => {this.setState({email: e.target.value})}

  // 이메일찾기 함수
  onFindEmailHandler = e => {
    e.preventDefault()
    const phone = this.state.phone.substring(0,3) + "-" + this.state.phone.substring(3,7) + "-" + this.state.phone.substring(7,11)

    const inputData = {
      name:this.state.name,
      phone:phone
    }
    //아이디찾기 axios
    axios.post('http://i4d101.p.ssafy.io:8080/auth/forgot/id', JSON.stringify(inputData),{headers:{'Content-Type': 'application/json'}})
    .then(res => {
      const userId = res.data.userId
      alert(`회원님의 이메일은 ${userId} 입니다`)
      this.setState({
        name:'',
        phone:''
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  //비밀번호찾기 함수
  onChangePasswordHandler = e => {
    e.preventDefault()

    const inputData = {
      userId:this.state.email
    }
    //비밀번호 찾기 axios
    axios.post('http://i4d101.p.ssafy.io:8080/auth/forgot/password', JSON.stringify(inputData),{headers:{'Content-Type': 'application/json'}})
    .then(res => {
      alert("메일이 발송되었습니다. 입력하신 이메일을 확인해주세요.")
    })
  }

  render() {
    return (
      <div>
        <div>FindAccount</div>
        <form>
          <label for="name">이름</label>
          <input id="name" placeholder="이름" type="text" value={this.state.name} onChange={this.onNameHandler}></input>

          <label for="phone">휴대전화번호</label>
          <input id="phone" placeholder="-뺴고 입력해주세요" type="text" value={this.state.phone} onChange={this.onPhoneHandler}></input>

          <button onClick={this.onFindEmailHandler}>이메일 확인하기</button>
        </form>
        <br/>
        <form>
          <label for="email">이메일</label>
          <input id="email" placeholder="이메일" type="email" value={this.state.email} onChange={this.onEmailHandler}></input>
          <button onClick={this.onChangePasswordHandler}>비밀번호 재설정 </button>
          <p>이메일을 입력하시면 입력하신 이메일로 비밀번호 재설정 메일이 발송됩니다.</p>
        </form>
      </div>
    )
  }
}

export default FindAccount