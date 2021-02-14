import React, { Component } from "react";
import MapDiv from "./MapDiv";
class MapContent extends Component {
  render() {
    return <MapDiv></MapDiv>;
  }
  constructor(props){
    super(props);
  // 여기서 this.setState()를 호출하면 안 됩니다!
    this.state = { map: null};
  }

    componentDidMount() {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e0b3ed37d07b95d74f607c9851ae3474&autoload=false";
      document.head.appendChild(script);
    
      script.onload = () => {
        window.kakao.maps.load(() => {
          let container = document.getElementById("jobmap");
          let options = {
            center: new window.kakao.maps.LatLng(37.506502, 127.053617),
            level: 7
          };
          this.setState({
            map : new window.kakao.maps.Map(container, options)
          })
        });
      }; 
    }
    componentDidUpdate(){
      console.log("업뎃")
      this.getLocation();
    }
    setCenter(latitue,longitude) {
      // 이동할 위도 경도 위치를 생성합니다 
      console.log("dnlrudeh")
      var moveLatLon = window.kakao.maps.LatLng(latitue, longitude);
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.state.map.panTo(moveLatLon);            
    }    
    getLocation() {
      if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.watchPosition((position)=> {
          console.log(position)
          this.setCenter(position.coords.latitude,position.coords.longitude);
        }, function(error) {
          console.error(error);
        });
      }else{
        alert(";")
      }
    }
  }
    export default MapContent;
