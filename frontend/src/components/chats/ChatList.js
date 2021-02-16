import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import axios from 'axios';
import {chatRoom} from '../../actions';

const classes = {
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
}

class ChatList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chatList : [],
        };
    }
    
    componentDidMount() {
       this.loadChatList();
    }

    loadChatList = async () => {
        axios
        .get("http://i4d101.p.ssafy.io:8080/chat/chat/roomsById?myUuid="+this.props.logined.userUuid)
        .then(res => {
            console.log("채팅리스트 불러오기 axios.get.then");
            console.log(res);
            this.setState({
                chatList : res.data
            });
        })
        .catch(e => {console.error(e);})
    }

    listClick = (e) => {
        console.log("list클릭!",e.target);
        //roomid 넘겨주기
        // this.props.chatroompass();
        
    }

    render(){
        const {chatList} = this.state; 
        return(
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary={this.props.logined.userProfile.name}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List >
                    {chatList.map( chat => {return(
                        <ListItem button key="RemySharp" onClick={this.listClick} hidden={chat.roomid}>
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={chat.roomName}></ListItemText>
                        </ListItem>
                    )})}
                </List>
            </Grid>
        )
    }
}

//userlogin 로그인데이터 받아오기
const mapStateToProps = (state) => {
    return {
      logined: state.logined
  }
}

//채팅방 클릭했을 때 넘겨줄 방정보
const mapDispatchToProps  = (dispatch) => {
    return {
        chatroompass: (roomid) => { dispatch(chatRoom(roomid)) }
    }
}

ChatList = connect(mapStateToProps, mapDispatchToProps) (ChatList);

export default ChatList;