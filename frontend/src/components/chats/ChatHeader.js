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

class ChatHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return(
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        )
    }
}
export default ChatHeader;