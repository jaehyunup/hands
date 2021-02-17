import React from 'react';
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    ButtonGroup,
    GridList,
    GridListTile,
    Fab,
  } from '@material-ui/core';
  import SubjectIcon from '@material-ui/icons/Subject';
  import AddAlarmIcon from '@material-ui/icons/AddAlarm';
  import WatchLaterIcon from '@material-ui/icons/WatchLater';
  import axios from 'axios';
  import EqualizerIcon from '@material-ui/icons/Equalizer';
  import LocationOnIcon from '@material-ui/icons/LocationOn';
  import ClearIcon from '@material-ui/icons/Clear';
  import { withRouter } from 'react-router';
  import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
  import SendIcon from '@material-ui/icons/Send';
  import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import {Row,Col,Container} from 'react-bootstrap'
import '../../styles/profilemodal.css'

class JobDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            geocoder:null,
            jobId: "1d24a0da-a8ba-43b4-bf06-a2c9959cfb29",//props.match.params.jobId,
            contents:'불가피한 사정으로 잠깐 산책시켜주실 분을 구합니다.',
            category:'펫',
            workingHour: "15",
            jobCredit: "3000",
            workingDate: "2021-02-28",
            jobUserUuid:'',
            workingAddress: "경산북도 구미 진평동",
            status: "거래전",
            jobName: "저희집 강아지를 산책시켜주세요",
            userNickname:'손동민',
            dday: 12,
            urls:[
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
            ],
            jobDetailMapObj:null,
            reviewData: [],
            reviewWriter :'',
        }

    }
  followUser = (e)=>{
    console.log(this.state.jobId)
  }
  getJobDetailData = async () =>{
    return await axios.get("http://i4d101.p.ssafy.io:8080/job/jobInfo?jobId="+this.state.jobId)
  }
  getUserReviewData = async () => {
      return await axios.get("http://i4d101.p.ssafy.io:8080/review/review/userUuid?userUuid="+this.state.jobUserUuid)
  }
  getUserProfile = async () => {
    return await axios.post("http://i4d101.p.ssafy.io:8080/auth/profile/uuid/"+this.state.reviewData.userUuid)
  }
  componentDidMount() {
    //job 상세정보 불러옴
    this.getJobDetailData().then(response => {
        this.setState({
            contents:response.data.content,
            category:response.data.cadtegoryId,
            workingHour: response.data.workingHour,
            jobCredit:response.data.jobCredit,
            workingDate: response.data.workingData,
            workingAddress:response.data.workingAddress,
            status: response.data.status,
            jobName: response.data.jobName,
            userNickname:response.data.userNickname,
            jobUserUuid:response.data.jobUserUUid,
        })
        this.getUserReviewData().then(async(response) => {
            console.log(response.data);
            await this.setState({reviewData: response.data});
            this.getUserProfile().then(res => {
                console.log(res.data);
                this.setState({ reviewWriter: res.data.userNickname })
            }).catch(e => {console.log("리뷰글 쓴사람 프로필 조회 에러")})
        }).catch(e=>{
            console.log("리뷰데이터가 존재하지 않습니다")
        })
    })
    .catch(e => {
        console.error("일거리 정보를 가져오는데 문제가 발생");
    })


    //지도
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e0b3ed37d07b95d74f607c9851ae3474&autoload=false&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load( async () => {
        let container = document.getElementById("jobdetailmap");
        let options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };
        this.setState({
          jobDetailMapObj : new window.kakao.maps.Map(container, options)
        })
        this.setState({
            geocoder: new window.kakao.maps.services.Geocoder()
        })
        this.state.geocoder.addressSearch(this.state.workingAddress, (result, status) =>{
        
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
                    map: this.state.jobDetailMapObj,
                    position: coords,
                    image : markerImage,
                });
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                this.state.jobDetailMapObj.setCenter(coords);
                this.state.jobDetailMapObj.setLevel(3);

            } 
        });    

      });
    };
    
  }

  creatAvatar(){
      return "https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"
  }
  moveBack=()=>{
    this.props.history.goBack()
  }
  
  contractInsert = async() => {
    axios
    .post(
        "http://i4d101.p.ssafy.io:8080/contract/insert",
        JSON.stringify({
            contractJobId : this.state.contractJobId,
            handy : this.state.handy,
            hander : this.state.hander }),
        {headers:{
            'Content-Type': 'application/json'
        }}
    )
    .then(res => {alert("insert 성공")})
    .catch(e => {console.log(e)})
  }
  pointTOstar = () =>{
      var star = '★★★★★';
      switch(this.state.reviewData.score){
          case '0' : star = '☆☆☆☆☆'; return star;
          case '1' : star = '★☆☆☆☆'; return star;
          case '2' : star = '★★☆☆☆'; return star;
          case '3' : star = '★★★☆☆'; return star; 
          case '4' : star = '★★★★☆'; return star;
          case '5' : 
          default : return star;
      }
  }

  render(){
    return (
        <div className={"d-flex vh-100 profileModalRoot align-items-center justify-content-center"}>
            <Fab style={{position:"absolute",top:20,right:0}} size="small" color="secondary" onClick={this.moveBack}><ClearIcon size={"extended"}></ClearIcon></Fab>
            <div id="jobdetailmap" style={{margin:"10",padding:"10",width:"100%",height:"35rem"}}>
            </div>
            
            
            <div className="User profileModalBox align-items-center justify-content-center">
                    <h5 style={{margin: '20px'}}>
                    {this.state.jobName}
                    </h5>
                    <ListItem>
                                    <ListItemIcon>
                                    <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                                    alt={"아바타"} style={{width: '30px',height:'30px', marginRight: 10, display: 'inline-block', verticalAlign: 'middle'}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                    primary={this.state.userNickname+" 핸더"}
                                    secondary={Math.floor(Math.random() * (80+ 1))+"번의 거래이력"}
                                    />
                    <Button startIcon={<SendIcon/>} className={"mx-3"} variant="contained" color="primary" onClick={this.Addcredit}>채팅</Button>
                    <Button startIcon={<ThumbsUpDownIcon/>} className={"mr-3"} variant="contained" color="secondary" onClick={this.contractInsert}>거래신청</Button>
                    </ListItem>
                    

                <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>  
            </div>
            <Divider className={"my-3"}/>
            
            <p style={{marginLeft:"20px",marginRight:"20px"}}>{this.state.contents}</p>

            <Grid container spacing={2}>
            <Grid item xs>
                <List>
                <ListItem>
                    <ListItemIcon>
                    <SubjectIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="카테고리"
                    secondary={this.state.category}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <WatchLaterIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="소요시간"
                    secondary={this.state.workingHour+"시간근무"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="크레딧"
                    secondary={this.state.jobCredit+" 크레딧"}
                    />
                </ListItem>
                </List>
            </Grid>
            <Grid item xs>
                <List>
                <ListItem>
                    <ListItemIcon>
                    <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="지역"
                    secondary={this.state.workingAddress}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <AddAlarmIcon/>
                    </ListItemIcon>
                    <ListItemText
                    primary="D-DAY"
                    secondary={this.state.dday+"일 남음"}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <EqualizerIcon/>
                    </ListItemIcon>
                    <ListItemText
                    primary="인기도"
                    secondary={Math.floor(Math.random() * (20 + 1))+"명이 관심"}
                    />
                </ListItem>
                </List>
                
            </Grid>
            </Grid>
            <h4 style={{margin: '20px'}}>
                최근 받은 리뷰
            </h4>
            <Container>

            { this.state.reviewData.map( () => {return(
                <>
                    <Row className={"reviewRow"}>
                        <Col md={12} lg={12}>
                            <Row className={"reviewUser"}>
                            <ListItem>
                                <ListItemIcon>
                                <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                                alt={"아바타"} style={{width: '30px',height:'30px', marginRight: 10, display: 'inline-block', verticalAlign: 'middle'}}/>
                                </ListItemIcon>
                                <ListItemText
                                primary={this.state.reviewWriter}
                                secondary={this.pointTOstar}
                                />
                            </ListItem>
                            </Row>
                            <Row className={"px-4"}>
                                <p>{this.state.reviewData.reviewContent}</p>
                            </Row>
                            <Row>
                            <div className={"mx-4"} style={{display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-around',
                                        overflow: 'hidden'}}>
                                <GridList cellHeight={100} style={{
                                                                width: "100%",
                                                                height: "8rem",
                                                            }} cols={4}>
                                                {this.state.reviewData.imgs.map((url) => (
                                                <GridListTile key={url}>
                                                    <img src={url} alt={"img"} />
                                                </GridListTile>
                                                ))}
                                </GridList>
                            </div>

                            </Row>
                        </Col>
                    </Row>
                    <Divider/>
                </>
            )})}



                <Row className={"reviewRow"}>
                    <Col md={12} lg={12}>
                        <Row className={"reviewUser"}>
                        <ListItem>
                            <ListItemIcon>
                            <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                            alt={"아바타"} style={{width: '30px',height:'30px', marginRight: 10, display: 'inline-block', verticalAlign: 'middle'}}/>
                            </ListItemIcon>
                            <ListItemText
                            primary="구미공자"
                            secondary="★☆☆☆☆"
                            />
                        </ListItem>
                        </Row>
                        <Row className={"px-4"}>
                            <p>개별로임</p>
                        </Row>
                        <Row>
                        <div className={"mx-4"} style={{display: 'flex',
                                    flexWrap: 'wrap',
                                    
                                    justifyContent: 'space-around',
                                    overflow: 'hidden'}}>
                            <GridList cellHeight={100} style={{
                                                            width: "100%",
                                                            height: "8rem",
                                                        }} cols={4}>
                                            {this.state.urls.map((url) => (
                                            <GridListTile key={url}>
                                                <img src={url} alt={"img"} />
                                            </GridListTile>
                                            ))}
                            </GridList>
                        </div>

                        </Row>
                    </Col>
                </Row>
                <Divider/>
                
            </Container>
        </div>
    </div>
    );
  }
}export default withRouter(JobDetail)