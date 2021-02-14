import React from 'react';
import Header from '../components/navbar/header/Header'
import Main from '../components/main/Main'
import Join from '../components/account/Join'
import JobPage from './job/jobPage'
import { Route } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Header/>
      <Route exact path="/home" component={Main}/>
    </div>
  );
};

export default Home;