import React, { Component } from "react";
import MapDiv from "./MapDiv";
import { connect } from 'react-redux';

class MapContent extends Component {
    render() {
      return <MapDiv changeMapHandler={this.ChangeMapCenter}></MapDiv>;
    }
    constructor(props){
      super(props);
      this.state = { map: null,geocoder:null,currentlocation:this.props.currentlocation,markerList:[]};
    }
    componentDidMount() {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e0b3ed37d07b95d74f607c9851ae3474&autoload=false&libraries=services";
      document.head.appendChild(script);
    
      script.onload = () => {
        window.kakao.maps.load(() => {
          let container = document.getElementById("jobmap");
          let options = {
            center: new window.kakao.maps.LatLng(37.506502, 127.053617),
            level: 7
          };
          this.setState({
            map : new window.kakao.maps.Map(container, options),
            geocoder: new window.kakao.maps.services.Geocoder()
          })
          
        });
      }; 
    }

    componentDidUpdate(prevState, nextProps) {
      if (prevState.mapJoblist !== nextProps.mapJoblist) {
          console.log("잡 마커커커")
      }
      console.log("잡 마커")
    }

    renderMarker = () => {
      if(this.state.markerList.length!=0){
        this.state.markerList.map((marker,index)=>{
          marker.setMap(null);
         }
        )
      }
      for(var i=0;i<this.state.mapJoblist.length;i++){
        this.state.geocoder.addressSearch(this.state.mapJoblist[i], (result, status) =>{

        }
      )}
    }

    ChangeMapCenter = (fullAddress) =>{
      this.state.geocoder.addressSearch(fullAddress, (result, status) =>{
        // 정상적으로 검색이 완료됐으면 
         if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            var imageSrc = 'https://img.icons8.com/fluent/96/000000/marker-storm.png', // 마커이미지의 주소입니다    
            imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new window.kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.      
            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
                map: this.state.map,
                position: coords,
                image : markerImage,
            });
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            this.state.map.setCenter(coords);
            this.state.map.setLevel(3);
        }
    })};
  
    setCenter(latitue,longitude) {
      // 이동할 위도 경도 위치를 생성합니다 
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
const mapStateToProps = (state) => {
  return {
    mapJoblist: state.mapJoblist
  }
}

MapContent = connect(mapStateToProps) (MapContent);
export default MapContent;


