import React from 'react';
import { Route } from 'react-router';
import FindJobList from '../job/FindJobList';

class FindJob extends React.Component {
  render() {
    return (
      <div>
        <div>FindJob</div>
        <Route path="/findjob" component={FindJobList}></Route>
      </div>
    )
  }
}

export default FindJob;