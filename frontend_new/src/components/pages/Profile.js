import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import AccountProfile from '../Profile/AccountProfile'
import UpdateProfile from '../Profile/UpdateProfile'
import { checkprofile } from '../../actions';
import ChangePassword from '../Profile/ChangePassword'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    // 로그인되어있을때만 링크가보이지만
    // 로그인하지않은상태로 혹여나 접근한다면
    // 로그인페이지로 이동

    if (!this.props.logintoken) {
      this.props.history.push('/login')
      return
    }
  }
  
  render() {
    return (
      <div>
        <div>Profile</div>
        <Route exact path="/profile" component={AccountProfile}/>
        <Route path="/profile/update" component={UpdateProfile}/>
        <Route path="/profile/changepassword" component={ChangePassword}></Route>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logintoken: state.token,
}}

// const mapDispatchToProps  = (dispatch) => {
//   return {
//     checkprofile:(token_info) => {dispatch(checkprofile(token_info))
//     } 
//   }
// }

// Profile = connect(mapStateToProps, mapDispatchToProps) (Profile);

// export default withRouter(Profile)

Profile = connect(mapStateToProps) (Profile);

export default Profile