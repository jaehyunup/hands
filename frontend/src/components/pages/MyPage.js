import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HandyFind from '../findhandy/HandyFind'
import MyPageComp from '../account/MypageComp'
import MainHeader from '../header/MainHeader'
import { Col, Container, Image, Row} from 'react-bootstrap'

class FindHandy extends React.Component {
  render() {
    return (
      <>
        <MyPageComp></MyPageComp>
      </>
    )
  }
}

export default FindHandy;