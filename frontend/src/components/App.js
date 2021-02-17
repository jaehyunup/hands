import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import '../index.css';

//page import
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import FindHandy from './pages/FindHandy';
import FindJob from './pages/FindJob';
import CreateJob from './pages/CreateJob';
import User from './Profile/User';
import MyPage from './pages/MyPage';
import JobDetail from './job/JobDetail';
import CreateReview from './review/ReviewCreate';

import ChatContents from './chats/ChatContents';

class App extends Component {
  render() {
    return (
      <>
        <Route path="/home" component={Main} />
        <Route path="/join" component={Join} />
        <Route path="/login" component={Login} />
        <Route path="/findjob" component={FindJob} />
        <Route path="/createjob" component={CreateJob} />
        <Route path="/findhandy" component={FindHandy} />
        <Route path="/chat" component={ChatContents} />
        <Route path="/profile/:userUuid" component={User} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/job/:jobId" component={JobDetail} />
        <Route path="/review/create" component={CreateReview} />
      </>
    );
  }
}

export default App;
