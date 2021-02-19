import React from 'react';
import { Route } from 'react-router-dom';
import UpdateJob from '../job/JobUpdate';

class UpdateJob extends React.Component {
  render() {
    return (
      <div>
        <Route path="/updatejob" component={UpdateJob}></Route>
      </div>
    )
  }
}

export default UpdateJob;