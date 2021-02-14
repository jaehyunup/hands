import React, { isValidElement } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router';


class JoinAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    }
  }

  
  //변수제어 함수
  onNameHandler = (e) => {this.setState({name: e.target.value, nameCheck:false})}
  onNicknameHandler = (e) => {this.setState({nickname: e.target.value,nicknameCheck:false})}
  onEmailHandler = (e) => {this.setState({email:e.target.value,userId:e.target.value,emailCheck:false})}
  onPasswordHandler = (e) => {this.setState({password: e.target.value,passwordCheck:false})}
  onConfirmPasswordHandler = (e) => {this.setState({confirmPassword: e.target.value})}
  onPhoneHandler = (e) => {this.setState({phone: e.target.value,phoneCheck:false})}
  onAddressHandler = (e) => {this.setState({address: e.target.value})}
  onGenderHandler = (e) => {this.setState({gender: e.target.value})}
  onDescriptionHandler = (e) => {this.setState({description: e.target.value})}

  //닉네임중복확인함수
  checkNickname= (e)=> {
    e.preventDefault()
    //닉네임중복확인 axios
    axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/nickname/${this.state.nickname}`)
    .then(res=>{
      alert('사용가능한 닉네임입니다.')
      this.setState({
        nicknameCheck:true
      })
    })
    .catch(err=>{
      alert("사용할 수 없는 닉네임입니다.")
    })
  }


  //이메일 형식,중복 확인
  checkEmail= (e)=>{
    e.preventDefault()

    //이메일 유효성 검사
    const check_Email = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    }

    //이메일 유효성검사조건문
    if (check_Email(this.state.email) === false) {
      alert('이메일 형식이 유효하지 않습니다.')
      console.log("이메일 형식이 유효하지 않습니다.")
      this.setState({email:""})
    }
    else{
      //이메일 중복확인 axios
      axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/id/${this.state.email}`)
      .then(res => {
        alert("사용할 수 있는 이메일입니다.")
        this.setState({
          emailCheck:true
        })
      })
      .catch(err=>{
        alert("이미 존재하는 이메일 입니다.")
        console.error(err)
        console.log("이미 존재하는 이메일 입니다.")
      })
    }
  }
  //이름유효형식 확인함수
  checkName = async (e) => {
    console.log('checkName')
    const check_Name = function(str) {
      var regNm = /^[가-힣]{1,5}/;
      return regNm.test(str) ? true : false;
    }

    if (check_Name(this.state.name) ===false) {
      alert("한글 1~5자리만 사용 가능합니다.")
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
      alert("영문,숫자를 혼합하여 6~20자 이내로 작성해주세요")
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
    await this.checkName()
    await this.checkPhone(this.state.phone)
    await this.checkPassword()

    const body = {
      userId: this.state.userId,
      password: this.state.password,
      email: this.state.email,
      nickname: this.state.nickname,
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      gender: this.state.gender,
      description: this.state.description,
      type: this.state.type,
      userUuid: '',
    }

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
                  userUuid:this.state.userUuid
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
                this.props.history.push('/login')

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
        <div>JoinAccount</div>
        <form onSubmit={this.onSubmitHandler}>
          <label for="name">* 이름</label>
          <input id="name" placeholder="이름" type="text" value={this.state.name} onChange={this.onNameHandler}></input><br/>

          <label for="nickname">* 닉네임</label>
          <input id="nickname" placeholder="닉네임" type="text" value={this.state.nickname} onChange={this.onNicknameHandler}></input>
          <button onClick={this.checkNickname}>닉네임 확인</button><br/>

          <label for="email">* 이메일</label>
          <input id="email" placeholder="이메일(이메일이 로그인할때 아이디로 사용됩니다.)" type="email" value={this.state.email} onChange={this.onEmailHandler}></input>
          <button onClick={this.checkEmail}>이메일 확인</button><br/>

          <label for="password">* 비밀번호</label>
          <input id="password" placeholder="비밀번호" type="password" value={this.state.password} onChange={this.onPasswordHandler}></input><br/>

          <label for="confirmpassword">* 비밀번호확인</label>
          <input id="confirmpassword" placeholder="비밀번호확인" type="password" value={this.state.confirmPassword} onChange={this.onConfirmPasswordHandler}></input><br/>

          <label for="phone">* 휴대전화번호</label>
          <input if="phone" placeholder="-뺴고 입력해주세요" type="text" value={this.state.phone} onChange={this.onPhoneHandler}></input><br/>

          <label for="address">주소</label>
          <input if="address" placeholder="주소" type="text" value={this.state.address} onChange={this.onAddressHandler}></input><br/>

          <label for="gender">성별</label>
          <input id="gender" placeholder="성별" type="text" value={this.state.gender} onChange={this.onGenderHandler}></input><br/>

          <label for="description">자기소개</label>
          <textarea id="description" value={this.state.description} onChange={this.onDescriptionHandler}></textarea><br/> 

          <p>*표시는 필수입력 정보입니다.</p>
          <button type="submit">회원가입</button>
          <button onClick={this.gologin}>로그인</button>
        </form>

      </div>
    )
  }
}

export default withRouter(JoinAccount);
