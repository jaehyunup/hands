import { combineReducers } from 'redux';

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {USERLOGIN, USERLOGOUT, CHECKPROFILE, UPDATEPROFILE, FINDFOLLOW, CURRENTLOCATION, MAPJOBLIST,CHATROOM} from '../actions/actionType'
import {TOGLELOGIN} from '../actions/actionType'

const persistConfig = {
  key: "root",

  storage,

  whitelist:["userApp"]
}

const userApp = (state = {}, action) => {
  console.log(action)
  switch(action.type){
    case USERLOGIN:
      return {...state, logined: action.payload, token:action.token, type:action.usertype}
    case USERLOGOUT:
      return {...state, logined: null, token:null}
    case CHECKPROFILE:
      return {...state, userProfile: action.payload, type:action.payload.type}
    case UPDATEPROFILE:
      console.log(action)
      return {...state, userProfile: action.payload, token:action.token }
    case FINDFOLLOW:
      return {...state, follows:action.payload }
    case CURRENTLOCATION:
      return {...state, currentlocation: action.payload }
    case MAPJOBLIST:
      return {...state, mapjoblist: action.payload }
    case CHATROOM:
      return {...state, roomId:action.payload}
    default:
      return state;
  }
}


// const userApp = combineReducers({
//   user
// })


export default persistReducer(persistConfig ,userApp);