import React from 'react';
import GpsIcon from '@material-ui/icons/GpsFixed';
import {Button,Fab} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DirectionsIcon from '@material-ui/icons/Directions';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import {currentlocation} from '../../actions';
import DaumPostcode from 'react-daum-postcode';

const postCodeStyle = {
  position: "absolute",
  top: 60,
  zIndex: "100",
  overflow: "hidden"
}

class MapDiv extends React.Component {
  constructor(props){
  
    super(props);
    this.state = {
      dong:'',
      dongInput : "",
      dongGps : "",
      isdaumpost : false,
      fullAddress : '',
      detailAddress : '',
      zoneCode : '',
    }
  }
  handleDongInput = (e)=> { this.setState({dongInput : e.target.value}) }
  sendDongInput = async () => {   
    // await this.handleDongInput();
    console.log(this.state.dongInput);
    await this.props.currentaddresspass(this.state.dong);
  }

  handleAddress = (data) => {
    let AllAddress = data.jibunAddress;
    let extraAddress = '';
    let zoneCodes = data.zonecode;
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    this.setState ({
      detailAddress: AllAddress,
        zoneCode : zoneCodes,
        dong:data.bname
    })
    this.toggleDaumDiv()
    this.props.changeMapHandler(AllAddress) // 맵 중앙좌표 변경
    this.sendDongInput()
  }

  toggleDaumDiv = () => {
    this.setState({
      isdaumpost : !this.state.isdaumpost
    })
  }


  /////////////////////이부분은 여기서 할지말지///////////////////////
  sendDongGps = () => {
    console.log(this.state.dongGps);
    this.props.currentaddresspass();
  }

  
  render() {
    return (
      <>
      
      <Paper component="form" background="dark" style={{width:"80%",marginLeft:"10%",zIndex:999,display: 'flex',alignItems: 'center',height:"4rem",marginTop:"8%"}}>
      <InputBase
              style={{marginLeft: "1rem",flex: 1}}
              placeholder="여기를 클릭해 주소를 입력해주세요"
              // placeholder={this.props.currentlocation}
              inputProps={{ 'aria-label': 'search google maps' }}
              value={this.state.detailAddress}
              onChange={this.handleDongInput}
              onClick={this.toggleDaumDiv}
          />
      {
                        (this.state.isdaumpost ? 
                            <>
                            <Button className={"ml-1"} variant="contained" color="primary"  onClick={this.toggleDaumDiv}>취소</Button>
                            <DaumPostcode
                                className={"mt-5"}
                                onComplete={this.handleAddress}
                                autoResize
                                autoClose
                                width={450}
                                height={200}
                                style={postCodeStyle}
                                isdaumpost={this.state.isdaumpost}
                                
                            />
                            </>
                        : null)
                    }          
         
         
          <IconButton style={{adding: 10}} aria-label="search" onClick={this.sendDongInput} disabled>
              <SearchIcon />
          </IconButton>
          <Divider style={{height: 28,margin: 4}} orientation="vertical" />
          <IconButton color="secondary" style={{padding:10}} aria-label="location" onClick={this.sendDongGps}>
              <GpsIcon />
          </IconButton>
      </Paper>
      
      <div id="jobmap" style={{ position:"relative",margin:"0",padding:"0",width:"100%",height:"40rem",marginTop:"-19%"}}>
      </div>
      </>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    currentaddress: state.currentlocation
}}

const mapDispatchToProps  = (dispatch) => {
  return {
    currentaddresspass:(address) => { dispatch(currentlocation(address))
    } 
  }
}



MapDiv = connect(mapStateToProps ,mapDispatchToProps) (MapDiv);


export default MapDiv;
