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
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
};

class ChatContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stompClient: null,

      socketJsRef: null,
      clientConnected: false,
      roomid: '262137c8-adb0-4537-b2ca-771f4002c46c', //props로 들어올 데이터
      room: {},
      sender: 'b161a98072b34e0fbdf5bdcad0fe99f0',
      myMessage: '테스트메시지입니다',
      roomAllmessages: [],
    };
    //this.getMessages();
  }

  componentDidMount() {
    var lsock = new SockJS('http://localhost:8050/websocket');
    let lstompClient = Stomp.over(lsock);

    this.setState(
      {
        socketJsRef: lsock,
        stompClient: lstompClient,
      },
      () => {
        console.log(this.state.socketJsRef);
        console.log(this.state.stompClient);
        var client = this.state.stompClient;
        this.state.socketJsRef.onopen = function () {
          console.log('open');
        };
        this.state.stompClient.connect({}, function (frame) {
          console.log('Connected: ' + frame);
          client.subscribe('/topic/public', function (greeting) {
            console.log(greeting);
            //you can execute any function here
          });
        });
      }
    );
  }

  // getMessages = async() => {
  //     console.log("call "+this.roomid);
  //     await axios
  //     .get("http://i4d101.p.ssafy.io:8080/chat/chat/room/enter/"+this.roomid)
  //     .then(res => {
  //         alert("call");
  //         this.setState({messages : res.data});
  //     })
  //     .catch(e => {alert("fail")});
  // }

  sendMessage = () => {
    this.state.stompClient.send('/hello', {}, JSON.stringify('{a:b}'));
  };

  // recvMessage = (recv) => {
  //     this.messages.unshift({ //배열값 앞에 추가
  //         type: recv.type,
  //         sender: recv.type === 'ENTER'
  //                     ?'[알림]'
  //                     :recv.sender,
  //         message: recv.message
  //     })
  // }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {
    return (
      <div class="container" id="app">
        {/* <div>
                        <h2>{this.room.roomName}</h2>
                    </div> */}

        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">내용</label>
          </div>
          <input
            type="text"
            class="form-control"
            value={this.message}
            onKeyPress={this.handleKeyPress}
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={this.sendMessage}>
              보내기
            </button>
          </div>
        </div>
        <ul class="list-group"></ul>
      </div>
    );
  }
}
export default ChatContents;
