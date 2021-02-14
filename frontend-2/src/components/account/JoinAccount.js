import React from 'react';
import Button from 'react-bootstrap/Button'
import { joinUser } from '../../actions/userAction'

class JoinAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Name:'',
      Password:'',
      ConfirmPassword:'',
      PhoneNumber:'',
      emailCheck:'',
      passwordCheck:'',
      nameCheck:'',
    }
  }
  //이메일 인풋창 핸들링
  onEmailHandler = e => {
    this.setState({
      Email:e.target.value
    })
  }
  // 이메일 중복 검사
  checkEmail = e => {
    e.preventDefault();

    // 이메일 유효성 검사 
    const check_Email = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    }

    const inputEmail = {
        email: this.state.Email
    }
    const email_info = {
      method: "POST",
      body: JSON.stringify(inputEmail),
      headers: {
        "Content-Type": "application/json"
      }
    }

    if (check_Email(this.state.Email) === false) {
      alert("이메일 형식이 유효하지 않습니다.")
      this.setState({
        Email:""
      })
    }else {
      fetch("http://localhost:3000/user/email",email_info)
      .then(res => res.json())
      .then(json=> {
        if (json === true) {
          alert("사용가능 한 이메일입니다.")
          this.setState({
            emailCheck: this.state.Email
          })
        }
        else {
          alert("이미 존재하는 아이디입니다.")
        }
      })
    }

  }

  onNameHandler = (e) => {
    this.setState({
      Name: e.target.value
    })
  }

  checkName = e => {
    e.preventDefault();

    const check_Name = function(str) {
      var regNm = /^[가-힣]{1,5}/;
      return regNm.test(str) ? true : false;
    }

    const inputName = {
      name: this.state.Name
    }

    if (check_Name(this.state.Name) ===false) {
      alert("한글만 1~5자리만 사용 가능합니다.")
    }else {
      this.setState({
        nameCheck: this.state.Name
      })
    }

  }

  onPasswordHandler = (e) => {
    this.setState({
      Password: e.target.value
    })
  }

  onConfirmPasswordHandler = (e) => {
    this.setState({
      ConfirmPassword: e.target.value
    })
  }

  checkPassword = e => {
    e.preventDefault();

    //비밀번호 유효성 검사(영문,숫자 혼합 6~20)
    const check_Password = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    }

    if (check_Password(this.state.ConfirmPassword) === false) {
      alert("영문,숫자를 혼합하여 6~20자 이내로 작성해주세요")
      this.setState({
        Password:"",
        ConfirmPassword:""
      })
    }else {
      if (this.state.Password === this.state.ConfirmPassword) {
        alert("일치합니다.")
        this.setState({
          passwordCheck: this.state.ConfirmPassword
        })
      }else {
        alert("비밀번호가 일치하지 않습니다.")
      }
      }
    }

  onPhoneNumberHandler = (e) => {
    this.setState({
      PhoneNumber: e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    const {
      Email,
      emailCheck,
      Name,
      nameCheck,
      passwordCheck,
      password,
      ConfirmPassword
    } = this.state

    const signupInfo = {
      email:this.state.emailCheck,
      password: this.state.passwordCheck,
      name: this.state.nameCheck
    }

    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }

    if (
      Email &&
      Name &&
      password &&
      ConfirmPassword &&
      Email === emailCheck &&
      Name === nameCheck &&
      password === ConfirmPassword &&
      ConfirmPassword === passwordCheck
    ) {
      fetch(joinUser(signupInfo.body)).then((res) => {
        alert("가입이 정상적으로 완료되었습니다.")
        this.props.history.push('/home/login')
      })
    } else {
      alert("정보입력을 확인해주세요.")
    }
  }

  render() {

    
    return (
      <div className="item" 
      style={{
        width:'500px',
        height:'500px',
        margin: '100px 50px'
      }}>

      <h3>우리동네 파트너쉽,</h3>
      <p style={{
        fontSize:'50px'
      }}>HANDS</p>
      <div style={{
        marginTop:'30px'
      }}>
        <form
          onSubmit={this.onSubmitHandler}
        >

        <input placeholder="이름" type="text" value={this.state.Name} onChange={this.onNameHandler}
         style={{
          height:'40px',
          width:'300px',
        }}></input>

        <input placeholder="전화번호" type="text" value={this.state.PhoneNumber} onChange={this.onPhoneNumberHandler}
        style={{
          height:'40px',
          width:'300px',
          marginTop:'15px'
        }}></input>

        <input placeholder="이메일" type="email" value={this.state.Email} onChange={this.onEmailHandler}
        style={{
          height:'40px',
          width:'300px',
          marginTop:'15px'

        }}></input>
        <br/>

        <input placeholder="비밀번호" type="password" value={this.state.Password} onChange={this.onPasswordHandler}
        style={{
          height:'40px',
          width:'300px',
          marginTop:'15px'

        }}></input>

        <input placeholder="비밀번호확인" type="password" value={this.ConfirmPassword} onChange={this.onConfirmPasswordHandler}
        style={{
          height:'40px',
          width:'300px',
          marginTop:'15px'
        }}></input>
        <br/>

        <Button variant="warning"
          type="submit"
          style={{
            width:'300px',
            margin:'auto',
            marginTop:'15px'

        }}>회원가입</Button>
        <br/>


      </form>
      </div>

    </div>
    );
  }
}


export default JoinAccount;
