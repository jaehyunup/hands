import React from 'react';
import FindJobList from './FindJobList';

class FindJob extends React.Component {
  render() {
    return (
      <div className="container" 
      style={{
        width:'100%',
        height:'700px',
        border:'1px solid black',
        margin:'100px auto',
        display: 'flex',
      }}>

        <div className="item"
        style={{
          width:'500px',
          height:'500px',
          border:'1px solid black',
          margin: '100px 50px'
        }}>
        </div>

        <FindJobList />

      </div>
    );
  }
}

export default FindJob;
