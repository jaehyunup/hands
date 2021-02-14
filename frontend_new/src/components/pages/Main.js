import axios from 'axios';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header'
import {findfollow,checkprofile} from '../../actions'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    return (
      <div>
        <div>Main</div>
      </div>
    )
  }
}


export default Main;