import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { logout } from '../actions'
import { withRouter } from 'react-router';

class Header extends React.Component {


  logoutHandler = () =>{
    this.props.history.push('/login')
  }

  onLogOut = (e) => {
    e.preventDefault();
    this.props.history.push('/home')

    this.props.userlogout()

    setTimeout(this.logoutHandler, 1000);
  }

  render() {
    return (
      <div>
        <a href="/home">HAND</a>
        <Link to="/findjob">일거리찾기</Link>
        <Link to="/findhandy">핸디찾기</Link>
        {this.props.logintoken && <Link to="/profile">마이페이지</Link>}
        {this.props.logintoken && <Link onClick={this.onLogOut}>로그아웃</Link>} 
        {!this.props.logintoken && <Link to="/login" >로그인</Link>}
        

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    logintoken: state.token
}
}

const mapDispatchToProps  = (dispatch) => {
  return {
    userlogout:() => {dispatch(logout())
    } 
  }
}

Header = connect(mapStateToProps ,mapDispatchToProps) (Header);

export default withRouter(Header);