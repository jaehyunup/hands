import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HandyFind from '../findhandy/HandyFind'



class FindHandy extends React.Component {
  render() {
    return (
      <div>
        <div>FindHandy</div>
        <Route path="/findhandy" component={HandyFind}></Route>
      </div>
    )
  }
}

export default FindHandy;