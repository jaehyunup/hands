import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { checkprofile, findfollow } from '../../actions'


class HandyFind extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      handylist: [],
    }

    //전체핸디조회 axios
    axios.get("http://i4d101.p.ssafy.io:8080/auth/handy")
    .then(res => {
      this.setState({
        handylist:res.data
      })
    })
    .catch(err => {
      console.error(err)
    })
  }
  // followbutton = (handy) => {
  //   const checkfollowinfo = {
  //     myId:this.props.email,
  //     followId:handy.email
  //   }
  //   const _data = axios.post('http://i4d101.p.ssafy.io:8080/social/FindFollowById', JSON.stringify(checkfollowinfo), {headers:{
  //     'Content-Type': 'application/json',
  //     'X-AUTH-TOKEN': this.props.logintoken
  //   }})
  //   .then(res => {
  //     const resp = res.data.message
  //     if (resp == "NO") {
  //       return <button>팔로우</button>
  //     }
  //     else if (resp == "YES") {
  //       return <button>언 팔로우</button>
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }


  render() {
    return (
      <div>
        <div>HandyFind</div>
        {
          
        this.state.handylist.map((handy) =>
            <li key={handy.email}>{handy.nickname}
              {
              }
             <button></button> 
             
             </li>
        )
        
        }
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
      email:state.logined.email,
      userUuid:state.logined.userUuid,
      name:state.logined.name,
      phone:state.logined.phone,
      address:state.logined.address,
      gender:state.logined.gender,
      description:state.logined.description,
      nickname:state.logined.nickname,
      type:state.logined.type,
      follows:state.follows
    }
  }else{
    return{

    }
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    findfollow: (followinfo,token) => {dispatch(findfollow(followinfo,token))
    },
    checkprofile:(token_info) => {dispatch(checkprofile(token_info))
    } 
  }
}


HandyFind = connect(mapStateToProps,mapDispatchToProps) (HandyFind);


export default HandyFind;