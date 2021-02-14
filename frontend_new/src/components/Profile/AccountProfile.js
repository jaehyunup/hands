import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { checkprofile } from '../../actions'

class AccountProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      follow: [],
      keyword:'',
      holdingcredit:0,
      addcredit:'',
      keywords:[]
    }
    // profile정보 바로 조회
    this.props.checkprofile(this.props.logintoken)
    
    //credit조회 axios
    axios.get(`http://i4d101.p.ssafy.io:8080/credit/${this.props.userUuid}`, {headers:{
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.props.logintoken
    }})
    .then(res => {
      this.setState({
        holdingcredit:res.data.credit
      })
      console.log("credit 조회")
    })

    //키워드 조회 axios
    axios.get(`http://i4d101.p.ssafy.io:8080/hands-keyword-server/user/keywords?`,{params: {
      userUuid: this.props.userUuid
    }},{headers:{
      'Content-Type': 'application/json',
    }})
    .then(res=> {
      this.setState({
        keywords: res.data.keywords
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  //변수제어 함수
  onKeywordHandler = e => {this.setState({keyword:e.target.value})}
  onAddCreditHandler = e => {this.setState({addcredit: e.target.value})}

  // 프로필수정페이지로 이동
  onUpdateProfile = e => {
    e.preventDefault();
    this.props.history.push('/profile/update')
  }
  
  // 회원탈퇴 함수
  onDeleteAccount = e => {
    e.preventDefault();

    //회원탈퇴 axios
    axios.delete("http://i4d101.p.ssafy.io:8080/auth/user",{headers:{
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.props.logintoken
    }})
    .then(res => {
      alert("회원탈퇴가 완료되었습니다.")
      this.props.history.push('/home')
    })
    .catch(err => {
      console.log(err)
    })
  }

  //핸디권한부여 토글 함수
  onToggleHandy = e => {
    e.preventDefault();
    const _type = (this.props.type+1)%2
    const typeInfo={
      type: _type
    }

    //핸디권한부여 토클 axios
    axios.put("http://i4d101.p.ssafy.io:8080/auth/profile/type",JSON.stringify(typeInfo), {headers:{
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.props.logintoken
    }})
    .then(res => {
      alert('유저님의 활동이 변경되었습니다.')
      this.props.checkprofile(this.props.logintoken)
    })
    .catch(err => {
      console.error(err)
    })
  }

  //비밀번호변경페이지 이동
  onChangePassword = e => {
    e.preventDefault()
    this.props.history.push('/profile/changepassword')
  }

  //credit충전 함수
  onAddcredit = e => {
    e.preventDefault()
    const inputInfo = {
      userUuid:this.props.userUuid,
      value:this.state.addcredit
    }

    //credit충전 axios
    axios.put("http://i4d101.p.ssafy.io:8080/credit", JSON.stringify(inputInfo), {headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => {
      //credit 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/credit/${this.props.userUuid}`, {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
      }})
      .then(res => {
        this.setState({
          holdingcredit:res.data.credit
        })
      })
      this.setState({
        addcredit:''
      })
    })
    .catch(err => {
      console.log('크레딧 충전 실패')
      console.log(err)
    })
  }

  //키워드 리스트 출력 함수
  keywordList = () => {
    const keywords = this.state.keywords
    
    const keywordlist = keywords.map((keyword, index) =>
     <li key={index}>{keyword}  <button keyword={keyword} onClick={this.deleteKeyword}>x</button></li>)

    return <ul>{keywordlist}</ul>
  }

  //키워드삭제 함수
  deleteKeyword =(e) => {
    e.preventDefault()
    const inputInfo = {
      userUuid:this.props.userUuid,
      keywords:[ e.target.attributes[0].value ]
    }

    //키워드삭제 axios
    axios.delete("http://i4d101.p.ssafy.io:8080/hands-keyword-server/user/keywords",
     {headers:{
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(inputInfo)
    
  })
    .then(res => {
      //키워드 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/hands-keyword-server/user/keywords?`,{params: {
      userUuid: this.props.userUuid
      }},{headers:{
        'Content-Type': 'application/json',
      }})
      .then(res=> {
        this.setState({
          keywords: res.data.keywords
        })
      })
      .catch(err => {
        console.log(err)
        console.log("키워드조회실패")
      })
      })
    .catch(err => {
      console.log('삭제실패')
      console.error(err)
    })
  }
  
  //키워드추가 함수
  onAddKeyword = e => {
    e.preventDefault()
    const inputInfo = {
      userUuid: this.props.userUuid,
      keywords: [this.state.keyword]
    }
    //공백일경우 추가x
    if (!this.state.keyword) {
      return
    }

    //키워드 추가 axios
    axios.post("http://i4d101.p.ssafy.io:8080/hands-keyword-server/user/keywords", JSON.stringify(inputInfo),{headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => {
      //키워드 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/hands-keyword-server/user/keywords?`,{params: {
        userUuid: this.props.userUuid
      }},{headers:{
        'Content-Type': 'application/json',
      }})
      .then(res=> {
        this.setState({
          keywords: res.data.keywords
        })
      })
      .catch(err => {
        console.log(err)
      })
      this.setState({
        keyword:'',
      })
    })
  }

  // enter키로 키워드 추가
  handleKeyPress = e => {
    console.log(e.key)
    if (e.key === 'Enter') {
      this.onAddKeyword(e)
    }
  }

  render() {
    if (!this.props.logintoken) {
      this.props.history.push('/home')
    }

    return (
      <div>
        <div>{this.props.name}님의 Profile</div>
        <div>
          <label for="name">이름  </label>
          <text if="name">{this.props.name}</text><br/>
          <label for="nickname">닉네임  </label>
          <text if="nickname">{this.props.nickname}</text><br/>
          <label for="phone">휴대전화번호  </label>
          <text if="phone">{this.props.phone}</text><br/>
          <label for="gender">성별  </label>
          <text if="pgender">{this.props.gender}</text><br/>
          <label for="address">주소 </label>
          <text if="address">{this.props.address}</text><br/>
          <label for="description">자기소개 </label>
          <text if="description">{this.props.description}</text><br/>
          <label for="type">현재 활동 </label>
          {this.props.type == 0 && <div><span id="type">핸더</span>
          <button onClick={this.onToggleHandy}>핸디활동하기</button></div>}
          {this.props.type == 1 && <div><span id="type">핸더, 핸디활동</span><button onClick={this.onToggleHandy}>핸더활동만 하기</button></div>}
          <br/>
          <label>보유 CREDIT:</label>
          <text>{this.state.holdingcredit}</text><br/>
          <label for="addcredit">크레딧충전</label>
          <input id="addcredit" value={this.state.addcredit} onChange={this.onAddCreditHandler}></input>
          <button onClick={this.onAddcredit}>충전</button><br/>

          <label>설정 키워드</label><br/>
          <text>{this.keywordList()}</text><br/>
          <label id="addkeywords">키워드 추가</label>
          <input id="addkeywords" value={this.state.keyword} onChange={this.onKeywordHandler} onKeyPress={this.handleKeyPress}></input>
          <button>추가</button>

        </div>
        <button onClick={this.onUpdateProfile}>프로필 수정하기</button><br/>
        <button onClick={this.onChangePassword}>비밀번호 변경하기</button><br/>
        <button onClick={this.onDeleteAccount}>회원탈퇴</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
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
    checkprofile:(token_info) => {dispatch(checkprofile(token_info))
    } 
  }
}

AccountProfile = connect(mapStateToProps ,mapDispatchToProps) (AccountProfile);
export default AccountProfile