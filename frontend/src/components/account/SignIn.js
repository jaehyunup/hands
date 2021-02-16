import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row} from 'react-bootstrap'
import logo from "../../img/logo.png"
import {Button,FormControlLabel,Checkbox,OutlinedInput,InputLabel,MenuItem,Select,FormControl,Fab} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import ForumIcon from '@material-ui/icons/Forum';
class SignIn extends Component {
  constructor(props){
    super(props)
    this.state={
      userId:"",
      password:"",
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


  loginClickHandler = () => {
    const { userId, password } = this.state;
    fetch("http://10.58.2.17:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }; 

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
                                <OutlinedInput labelId="userId-placeholder" label="이메일계정" id="input-userId" name="userId" value={this.state.userId} onChange={this.loginHandler}/>
                      </FormControl>
                    </div>   
                  </Col>
                  <Col md={12} sm={12}>
                    <div>
                    <FormControl style={{width:"100%"}} margin='dense' variant="outlined">
                                <InputLabel shrink htmlFor="password-placeholder">비밀번호</InputLabel>
                                <OutlinedInput labelId="password-placeholder" label="비밀번호" id="input-password" name="password" value={this.state.password} onChange={this.loginHandler}/>
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
                    <Button className={"loginModalBtn1"}>로그인</Button>
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

export default SignIn;