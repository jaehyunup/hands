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
    }
  }
  //이메일 인풋창 핸들링
  onEmailHandler = e => {
    e.preventDefault()
    this.setState({
      Emacil:e.target.value
    })
  }


  onNameHandler = (e) => {
    this.setState({
      Name: e.target.value
    })
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

  onPhoneNumberHandler = (e) => {
    this.setState({
      PhoneNumber: e.target.value
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    if (this.state.Password === this.state.ConfirmPassword) {
      let body = {
        email: this.state.Email,
        name: this.state.Name,
        password: this.state.Password,
        phoneNumber: this.state.PhoneNumber
      };
      fetch(joinUser(body)).then((res) => {
        alert("가입이 정상적으로 완료되었습니다.")
        this.props.history.push('/home/login')
      })
    } else {
      alert("비밀번호가 일치하지 않습니다.")
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
