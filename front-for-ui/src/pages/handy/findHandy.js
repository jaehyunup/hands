import React from 'react';
import Header from '../../components/navbar/header/Header'
import Footer from '../../components/navbar/footer/Footer'
import Main from '../../components/main/Main'
import Login from '../../components/account/Login'
import Join from '../../components/account/Join'
import FindJob from '../../components/job/findjob'
import FindHandy from '../../components/handy/FindHandy'
import { Route } from 'react-router-dom';


const Job = () => {
  return (
    <div>
      <Header/>
      <Route exact path="/job" component={FindJob}/>
    </div>
  );
};

export default Job;