import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import AccountProfile from '../Profile/AccountProfile'
import UpdateProfile from '../Profile/UpdateProfile'
import { checkprofile, findfollow} from '../../actions';
import ChangePassword from '../Profile/ChangePassword'
import User from '../../components/Profile/User'
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // 로그인되어있을때만 링크가보이지만
    // 로그인하지않은상태로 혹여나 접근한다면
    // 로그인페이지로 이동

   

  }
  
  render() {
    return (
      <div>
        <User></User>
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



Profile = connect(mapStateToProps,mapDispatchToProps) (Profile);

export default Profile