import React from 'react';
import { Route } from 'react-router-dom';
import FindJobContents from '../../components/job/FindJobContents'
import {Container,Row,Col} from 'react-bootstrap';
import '../../styles/job.css'
import Map from '../../components/job/FindJobMap'
import FindJobHeader from '../../components/job/FindJobHeader'
class jobPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalFlag: false,
      category:"전체",
    };
    this.handleChange = this.handleChange.bind(this);
    }
    openModal = () => {
        console.log(this.state.modalFlag)
        this.setState({ modalFlag: true });
    };

    closeModal = () => {
        this.setState({ modalFlag: false });
    };
    handleChange(event) {
        this.setState({category: event.target.value});
    }

  render (){
    return (
    <>
      <Container fluid className = {"findjobroot"} > 
              <Row>
              <FindJobHeader></FindJobHeader>
              </Row>
              <Row>
                  <Col md={6} lg={6}>
                    <Row className={"mapRow"}>
                        <Map></Map>
                    </Row>
                  </Col>
                  <Col md={6} lg={6} className={"px-0"}>
                       <FindJobContents></FindJobContents>
                  </Col>
              </Row>
             
        </Container>
    </>
  )};

};

export default jobPage;