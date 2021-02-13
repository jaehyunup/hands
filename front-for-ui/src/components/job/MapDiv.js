import React from 'react';
import GpsIcon from '@material-ui/icons/GpsFixed';
import {Fab} from '@material-ui/core';

class MapDiv extends React.Component {
  render() {
    return (
      <div fluid id="jobmap" className={"vh-100"} style={{ position:"relative",margin:"0",padding:"0",width:"100%"}}>
          <Fab className={"ml-auto"} color="secondary" 
                style={{position:"absolute",right:"0",bottom:"0",zIndex:"99",marginRight:"2%",marginBottom:"2%"}}>
              <GpsIcon className={"my-2 mx-2"}/>
          </Fab>
      </div>
    );
  }
}

export default MapDiv;
