import React from 'react';
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

class LoginAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idx: null,
      Email:'',
      Password:'',
      isLogin:null
    };
  }
  onEmailHandler = e => {
    this.setState({
      Email: e.target.value
    })
  }
  onPasswordHandler = e => {
    this.setState=({
      Password: e.target.value
    })
  }
  onSubmitHandler = e => {
    e.preventDefault();

    let login_info = {
      method:"POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    }
    fetch("http://localhost:3000/home/login", login_info)
    .then(res => {
      return res.json()
    })
    .then(json => {
      if (json.success === true) {
        alert("로그인 되었습니다.")
        window.localStorage.setItem('userInfo', JSON.stringify(json))
        this.setState({
          idx:json.idx,
          email: json.email,
          isLogin:json.success
        });
        this.props.history.push("/home")
      } else {
        alert ("아이디 혹은 비밀번호를 확인하세요")
      }
    })
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
        marginTop:'50px'
      }}>
        <form
        onSubmit={this.onSubmitHandler}
        >
          <label for="email">이메일</label>
          <br/>
        <input id="email" placeholder="이메일 주소" type="email" value={this.state.Email} onChange={this.onEmailHandler}
        style={{
          height:'40px',
          width:'300px'
        }}></input>
        <br/>
        <label for="password">비밀번호</label>
        <br/>
        <input id="password" placeholder="비밀번호" type="password" value={this.state.Password} onChange={this.onPasswordHandler}
        style={{
          height:'40px',
          width:'300px',
        }}></input>
        <br/>
        <Link to="/home/login/findAccount" 
          style={{
          marginTop:'15px',
          color:'black'
          
        }}>
          비밀번호찾기
        </Link>
        <Button variant="warning"
          type="submit"
          style={{
            width:'300px',
            margin:'auto',
            marginTop:'15px'
        }}>로그인</Button>
        <br/>
        <Button style={{
          marginTop:'30px',
          
        }}>
        <Link to="/home/join" 
        style={{
        marginTop:'10px',
        color:'black'
        
        }}>
          회원가입
        </Link>
        </Button>
        <div>소셜로그인</div>
        </form>
      </div>


    </div>
    );
  }
}


export default LoginAccount;
