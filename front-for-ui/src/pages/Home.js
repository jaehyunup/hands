import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/main/Main'
import Login from '../components/account/Login'
import Join from '../components/account/Join'
import FindJob from '../components/article/FindJob'
import FindHandy from '../components/article/FindHandy'
import { Route } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Header/>
      <Route exact path="/home" component={Main}/>
      <Route path="/home/login" component={Login}/>
      <Route path="/home/join" component={Join}/>
      <Route path="/home/findjob" component={FindJob}/>
      <Route path="/home/findhandy" component={FindHandy}/>
    </div>
  );
};

export default Home;