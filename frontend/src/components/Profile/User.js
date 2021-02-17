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
  import PhoneIcon from '@material-ui/icons/Phone';
  import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
  import EmailIcon from '@material-ui/icons/Email';
  import LocationOnIcon from '@material-ui/icons/LocationOn';
  import ClearIcon from '@material-ui/icons/Clear';
import {Row,Col,Container} from 'react-bootstrap'
import '../../styles/profilemodal.css'
import axios from 'axios';


export default class User extends React.Component {
  state = {
    userProfileData:{
        "profileId": 0,
        "userUuid": "",
        "email": "",
        "name": "",
        "phone": "",
        "address": "",
        "gender": "",
        "description": "",
        "nickname": "",
        "type": 1
    },
    user: [],
    location: [],
    urls:[
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
    ]
  }
  creatAvatar(){
      return "https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"
  }
  getUserDetail = async () =>{
    return await axios.get("http://i4d101.p.ssafy.io:8080/auth/profile/"+this.props.match.params.userNickName)
  }

  followHandler = (e) =>{
      console.log(e.currentTarget.value)
  }

  componentDidMount() {
    this.getUserDetail().then(response => {
        this.setState({
            userProfileData:response.data
        })
    })
    .catch(e => {
        console.error("유저 정보를 가져오는데 문제가 발생");
    })
  }

  render(){
    return (
        <div className={"d-flex vh-100 profileModalRoot align-items-center justify-content-center"}>
            <Fab style={{position:"absolute",top:20,right:340}} size="small" color="secondary"><ClearIcon size={"extended"}></ClearIcon></Fab>

            <div className="User profileModalBox align-items-center justify-content-center">
                <h4 style={{textAlign:"right",margin: '20px',display:"inline-block"}}>
                        유저정보
                </h4>
                <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                <div>
                        <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                        alt={"아바타"} style={{width: '40px', marginLeft:20,marginRight: 0, display: 'inline-block', verticalAlign: 'middle'}}/>
                        
                </div>
                <div>
                <h4 style={{margin: '20px'}}>
                    {this.state.userProfileData.nickname}
                </h4>
            </div>
            <div style={{position: 'absolute', left: 200}}>
                <ButtonGroup
                variant="contained"
                aria-label="full-width contained secondary button group"
                >
                <Button variant="contained" color="primary" value={this.state.userProfileData.email} onClick={this.followHandler} >팔로우</Button>
                </ButtonGroup>
            </div>
            </div>
            <Divider className={"my-3"}/>
            <h4 style={{margin: '20px'}}>
            유저 소개
            </h4>
            <p style={{margin: '20px'}}>{this.state.userProfileData.description}</p>

            <Grid container spacing={2}>
            <Grid item xs>
                <List>
                <ListItem>
                    <ListItemIcon>
                    <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="전화번호"
                    secondary="비공개"
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <PhoneIphoneIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="평균 평점"
                    secondary="★★★★☆"
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
                    primary="활동지역"
                    secondary={this.state.userProfileData.address}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                    <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                    primary="이메일"
                    secondary={this.state.userProfileData.email}
                    />
                </ListItem>
                </List>
            </Grid>
            </Grid>
            <h4 style={{margin: '20px'}}>
                리뷰
            </h4>
            <Container>
                <Row className={"reviewRow"}>
                    <Col md={12} lg={12}>
                        <Row className={"reviewUser"}>
                        <ListItem>
                            <ListItemIcon>
                            <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                            alt={"아바타"} style={{width: '30px',height:'30px', marginRight: 10, display: 'inline-block', verticalAlign: 'middle'}}/>
                            </ListItemIcon>
                            <ListItemText
                            primary="구미공주"
                            secondary="★★★★☆"
                            />
                        </ListItem>
                        </Row>
                        <Row className={"px-4"}>
                            <p>친절하시고 적극적으로 일해주셔서 매우 좋았습니다.</p>
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
}