import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {updateprofile} from '../../actions'
class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:this.props.name,
      gender:this.props.gender,
      nickname: this.props.nickname,
      phone: this.props.phone.substring(0,3) +this.props.phone.substring(4,8) +  this.props.phone.substring(9,13),
      address:this.props.address,
      description:this.props.description,
      type:this.props.type,

      beforeNickname:this.props.nickname,
      beforePhone:this.props.phone,
      nicknameCheck:true,
      phoneCheck:true,
    }
  }
  
  //변수제어 함수
  onNicknameHandler = e => {this.setState({nickname: e.target.value, nicknameCheck:false})}
  onPhoneHandler = e => {this.setState({phone: e.target.value, phoneCheck:false})}
  onAddressHandler = e => {this.setState({address: e.target.value})}
  onDescriptionHandler = e => {this.setState({description: e.target.value})}

  //닉네임 중복확인
  checkNickname= (e)=> {
    e.preventDefault()
    //닉네임 그대로일때 처리
    if (this.state.nickname == this.state.beforeNickname) {
      console.log('사용가능한 닉네임입니다.')
      alert("사용가능한 닉네임입니다. ")
      this.setState({
        nicknameCheck:true
      })
    } 
    else {
    //닉네임 중복확인 axios
    axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/nickname/${this.state.nickname}`)
    .then(res=>{
      console.log('사용가능한 닉네임입니다.')
      alert("사용가능한 닉네임입니다. ")
      this.setState({
        nicknameCheck:true
      })
    })
    .catch(err=>{
      console.log('사용할 수 없는 닉네임입니다.')
      alert("사용할 수 없는 닉네임입니다.")
    })
    }
  }

  //휴대전화번호 중복확인
  checkPhone =  async (e) => {
    e.preventDefault()

    const phoneInfo = this.state.phone
    const phone = phoneInfo.substring(0,3) + "-" + phoneInfo.substring(3,7) + "-" + phoneInfo.substring(7,11)
    //휴대전화번호 그대로일떄 허용처리
    if (phone == this.state.beforePhone) {
      console.log("사용할 수 있는 휴대전화번호 입니다.")
      alert("사용할 수 있는 휴대전화번호 입니다.")
      this.setState({
        phoneCheck:true
      })
    }
    else {
      //휴대전화번호 유효성처리
      if (phone.length < 13) {
        console.log("휴대전화번호 형식이 유효하지 않습니다.")
        return
      }
      // 휴대전화번호 중복체크 axios
      await axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/phone/${phoneInfo}`)
      .then(res=>{
        alert("사용할 수 있는 휴대전화번호 입니다.")
        this.setState({
          phoneCheck:true
        })
      })
      .catch(err=>{
        console.error(err)
        alert("이미존재하는 휴대전화번호 입니다.")
        console.log("이미존재하는 휴대전화번호 입니다.")
      })
  }
  }

  //프로필정보수정 함수
  onSubmitHandler = (e) => {
    e.preventDefault()

    const phoneInfo = this.state.phone
    const phone = phoneInfo.substring(0,3) + "-" + phoneInfo.substring(3,7) + "-" + phoneInfo.substring(7,11)

    const updateInfo = {
      nickname: this.state.nickname,
      phone:phone,
      address:this.state.address,
      description:this.state.description,
      type:this.state.type,
      name:this.state.name,
      gender:this.state.gender
      
    }


    if (this.setState.nicknameCheck === false) {
      alert("닉네임 중복확인을 해주세요")
      return
    }
    else {
      if (this.state.phoneCheck === false) {
        alert('휴대전화번호 중복확인을 해주세요.')
      }
      else {
        if (updateInfo.nickname && updateInfo.phone) {
          //회원정보수정 action호출

          this.props.updateprofile(updateInfo, this.props.logintoken)

          this.props.history.push('/profile')
        } else {
          alert("다시입력해주세요.")
        }
      }
    }
  }
  
  render() {
    if (!this.props.logintoken) {
      this.props.history.push('/home')
    }

    return (
      <div>
        <div>프로필 수정</div>
        <form onSubmit={this.onSubmitHandler}>
          <label for="nickname">닉네임  </label>
          <input if="nickname" value={this.state.nickname} onChange={this.onNicknameHandler}></input><button onClick={this.checkNickname}>닉네임 확인</button><br/>

          <label for="phone">휴대전화번호  </label>
          <input if="phone" value={this.state.phone} onChange={this.onPhoneHandler}></input>
          <button onClick={this.checkPhone}>휴대전화번호 확인</button><br/>

          <label for="address">주소 </label>
          <input if="address" value={this.state.address} onChange={this.onAddressHandler}></input><br/>
          <label for="description">자기소개 </label>
          <textarea if="description" value={this.state.description} onChange={this.onDescriptionHandler}></textarea><br/>



          <button type="submit">수정하기</button>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  if (state.logined) {
    return {
      logintoken: state.token,
      profileId : state.logined.profileId,
      userUuid:state.logined.userUuid,
      email:state.logined.email,
      name:state.logined.name,
      phone:state.logined.phone,
      address:state.logined.address,
      gender:state.logined.gender,
      description:state.logined.description,
      nickname:state.logined.nickname,
      type:state.logined.type,
    }
  }else{
    return{

    }
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    updateprofile:(userinfo,token_info) => {dispatch(updateprofile(userinfo,token_info))
    } 

  }}

UpdateProfile = connect(mapStateToProps ,mapDispatchToProps) (UpdateProfile);

export default withRouter(UpdateProfile)