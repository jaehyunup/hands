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
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

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

class ChatContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stompClient: null,
      socketJsRef: null,
      roomId: this.props.roomId,
      sender: this.props.myUuid,
      myMessage: '',
      roomAllmessages: [],
      HOST: 'http://i4d101.p.ssafy.io:8050/',
    };
    
  }

  componentDidUpdate(prevProps) {
    if (this.props.roomId !== prevProps.roomId) { //room 바꼇을때
      this.connect();
      this.getMessages();
    }
  }

  

  connect = () => {
    var lsock = new SockJS(this.state.HOST + 'ws-stomp/');
    var lstompClient = Stomp.over(lsock);

    this.setState(
      {
        socketJsRef: lsock,
        stompClient: lstompClient,
      },
      function () {
        var client = this.state.stompClient;
        var recvMsg = this.recvMessage;
        var roomId = this.props.roomId;
        //var myUuid = this.props.myUuid;
        var nickName = this.props.profile.nickname;

        this.state.stompClient.connect({}, function (frame) {
          console.log(this);
          client.subscribe( //broadcast : 서버에서 데이터 바뀌는지 확인
            '/sub/chat/room/' + roomId,
            function (message) {
              var recv = JSON.parse(message.body); //{type: enter 또는 talk , sender : uuid, message : "lblablalba"}
              recvMsg(recv);
            }
          );

          client.send(
            '/pub/chat/message',
            {},
            JSON.stringify({
              type: 'ENTER',
              roomId: roomId,
              sender: nickName,
            })
          );
        });
      }
    );
  }

  //실시간 채팅 할 때 상대방 메세지 받기
  recvMessage = (message) => {
    console.log('----------------');
    console.dir(message);
    console.log('----------------');
    var recv = message;
    var arrTmp = this.state.roomAllmessages;
    arrTmp.push({
      type: recv.type,
      sender: recv.type === 'ENTER' ? '[알림]' : recv.sender,
      message: recv.message,
    });

    this.setState({roomAllmessages: arrTmp});
    
  };
  
  //내가 메세지 보내기
  sendMessage = async (msg) => {
    var roomId = this.props.roomId;
    // var myUuid = this.props.myUuid;
    var nickName = this.props.profile.nickname;

    await this.state.stompClient.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: nickName,
        message: msg,
      })
    );
  };

  getMessages = () => {
    axios
      .get(
        'http://i4d101.p.ssafy.io:8080/chat/chat/room/message/' + this.props.roomId
      )
      .then((response) => {
        alert('call!!');
        console.log(response.data);
        this.setState({roomAllmessages : response.data})
      })
      .catch((response) => {
        alert('fail');
        console.log(response);
      });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage(e.target.value);
      e.target.value = '';
    }
  };

  render() {
    return (
      <>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {this.state.roomAllmessages.map( (msg, index) => {console.log({msg});return( 
            msg.sender === this.props.profile.nickname
            ?(
              <ListItem key={index}>
                  <Grid container>
                      <Grid item xs={12}>
                          <ListItemText align="right" primary={msg.message} secondary={msg.sender}></ListItemText>
                      </Grid>
                  </Grid>
              </ListItem>)
            :(
              <ListItem key={index}>
                  <Grid container>
                      <Grid item xs={12}>
                          <ListItemText align="left" primary={msg.message} secondary={msg.sender}></ListItemText>
                      </Grid>
                  </Grid>
              </ListItem>
            ))})}
          </List>
          <Divider />
          <Grid container style={{padding: '20px'}}>
              <Grid item xs={11}>
                  <TextField id="outlined-basic-email" label="Type Something" fullWidth onKeyPress={this.handleKeyPress} />
              </Grid>
              <Grid xs={1} align="right">
                  <Fab color="primary" aria-label="add"><SendIcon /></Fab>
              </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.roomId) {
    return {
      myUuid : state.logined.userUuid,
      profile: state.logined.userProfile,
      roomId : state.roomId
    }
  }
  else {
    return {
      myUuid : state.logined.userUuid,
      profile: state.logined.userProfile,
      }
    }
  }

ChatContents = connect(mapStateToProps) (ChatContents);

export default ChatContents;