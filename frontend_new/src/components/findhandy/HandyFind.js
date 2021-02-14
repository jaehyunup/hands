import React, { Component } from 'react';
import axios from 'axios';

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


  render() {
    return (
      <div>
        <div>HandyFind</div>
        {this.state.handylist.map((handy) =>
          <li key={handy.profileId}>{handy.nickname}</li>
        )}
      </div>
    )
  }
}

export default HandyFind;