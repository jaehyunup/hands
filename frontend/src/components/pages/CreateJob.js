import React from 'react';
import { Route } from 'react-router-dom';
import JobCreate from '../job/JobCreate';

class FindHandy extends React.Component {
  render() {
    return (
      <div>
        <Route path="/createjob" component={JobCreate}></Route>
      </div>
    )
  }
}

export default FindHandy;