import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row} from 'react-bootstrap'
import logo from "../../img/logo.png"
import {Button,FormControlLabel,Checkbox,OutlinedInput,InputLabel,MenuItem,Select,FormControl,Fab} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import ForumIcon from '@material-ui/icons/Forum';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../../actions'



class SignIn extends Component {
  constructor(props){
    super(props)
    this.state={
      userId:"",
      password:"",
      logintoken:'',
      
      chkFlag:false,
    }
  }
 
  toggleCheck = (e)=>{
    this.setState({
      chkFlag:!this.state.chkFlag
    })
  }
  loginHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };   ////계산된 속성명 사용

  preventHandler = (e) =>{
    e.stopPropagation();
  }
  componentDidMount(){
    console.log(document.getElementById("root"))
    var root=document.getElementById("root")
    root.addEventListener('scroll touchmove mousewheel', function(e){
      var x=window.scrollX;
      var y=window.scrollY;
      window.onscroll=function(){window.scrollTo(x, y);};
      return false;
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if ((this.props.logintoken !== prevProps.logintoken) && !prevState.logintoken) {
      console.log('change!')
      this.loginHandler()
    }
  }

//////////////////수정시작

  //변수제어함수
  onEmailHandler = e => {this.setState({userId: e.target.value})}
  onPasswordHandler = e => {this.setState({password: e.target.value})}

  //로그인시도
  loginClickHandler = async (e)=> {
    e.preventDefault();

    const userInfo = {
      userId : this.state.userId,
      password : this.state.password
    } 
    //로그인함수 실행
    this.props.userlogin(userInfo)

    // setTimeout(this.loginHandler, 1000);
  }
  
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
      this.props.loginModalToggleHandler()
      this.props.history.push('/home')
      alert("로그인되었습니다.")

    }
    else {
      alert("아이디/비밀번호를 다시확인해주세요.")
    }
  }
  

  render() {
    const { loginModalFlag,onLoginModal ,loginModalToggleHandler} = this.props;   //아까 버튼에서 props로 가져온것
    return (
      <>
        { loginModalFlag ? (  
          <Row id={"lm"} className={"d-flex vh-100 loginModalRoot mt-5"} onClick={loginModalToggleHandler}>
            <Col md={{offset:4,span:4}} sm={{offset:4,span:4}} className={"d-flex align-items-center justify-content-center"} onClick={this.preventHandler}>
                <Row className={"loginModalBox d-flex align-items-center justify-content-center"} >
                  <Image width={"30%"} style={{contentAlign:"center"}} className={"my-2 mb-3"} src={logo}></Image>
                  
                  <Col md={12} sm={12}>
                    <div style={{textAlign:"center"}}>
                      <p className={"loginModalHeader"}>핸즈 로그인</p>
                    </div>   
                  </Col>

                  <Col md={12} sm={12}>
                    <div>
                      <FormControl style={{width:"100%"}} margin='dense' variant="outlined">
                                <InputLabel shrink htmlFor="userId-placeholder">이메일계정</InputLabel>
                                <OutlinedInput labelId="userId-placeholder" label="이메일계정" id="input-userId" name="userId" value={this.state.userId} onChange={this.onEmailHandler}/>
                      </FormControl>
                    </div>   
                  </Col>
                  <Col md={12} sm={12}>
                    <div>
                    <FormControl style={{width:"100%"}} margin='dense' variant="outlined">
                                <InputLabel shrink htmlFor="password-placeholder">비밀번호</InputLabel>
                                <OutlinedInput  labelId="password-placeholder" label="비밀번호" id="input-password" name="password" type="password" value={this.state.password} onChange={this.onPasswordHandler}/>
                    </FormControl>
                    </div>   
                  </Col>

                  <Col md={12} sm={12} className={"mt-3"}>
                    <div class={{}}>
                    <p className={"forgotPassword"}>비밀번호를 잊으셨나요?<Link className={"joinLinkText"} to="/forgotpassword"> 비밀번호찾기</Link></p>
                    </div>
                  </Col>

                  <Col md={12} sm={12}>
                    <div class={{}}>
                     <FormControlLabel
                        control={<Checkbox margin='dense' checked={this.state.chkFlag} onChange={this.toggleCheck} name="input-chkFlag" />}
                        label="로그인 유지하기"
                      />
                    </div>
                  </Col>

                  <Col md={12} sm={12} className={"my-1"}>
                    <div class={{}}>
                    <Button className={"loginModalBtn1"} onClick={this.loginClickHandler}>로그인</Button>
                    </div>
                  </Col>

                  <Col md={12} sm={12} className={"my-1"}>
                    <div class={{}}>
                    <Button startIcon={<ForumIcon />} className={"loginModalBtn2"}>카카오계정 로그인</Button>
                    </div>
                  </Col>

                  <Col md={12} sm={12} className={"my-1"}>
                    <div class={{}}>
                    <Button startIcon={<FacebookIcon />} className={"loginModalBtn3"}>페이스북 로그인</Button>
                    </div>
                  </Col>

                  <Col md={12} sm={12} className={"mt-4"}>
                    <div class={{}}>
                      <p className={"modaljointext"}>회원이 아니신가요?<Link className={"joinLinkText"} to="/join"> 회원가입</Link></p>
                    </div>
                  </Col>

                  
                </Row>
              </Col>
          </Row>
        ) : null}
      </>
    );
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

SignIn = connect(mapStateToProps ,mapDispatchToProps) (SignIn);

export default withRouter(SignIn);