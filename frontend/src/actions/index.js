import axios from 'axios';

import {USERLOGIN, USERLOGOUT, UPDATEPROFILE, CHECKPROFILE, TOGGLEHANDY,CHANGEPASSWORD, FINDFOLLOW } from './actionType'
import {TOGLELOGIN} from './actionType'

//로그인
export async function login (user_info) {
  const _data = await axios.post("http://i4d101.p.ssafy.io:8080/auth/login",JSON.stringify(user_info),
  {headers:{
    'Content-Type': 'application/json'
  }})
  .then(res => [res.data, res.headers["x-auth-token"]])
  .catch(err=> ['',''])

  return { type: USERLOGIN, payload:_data[0], token:_data[1]}
}

//프로필 조회
export async function checkprofile (_token) {
  const _data = await axios.get("http://i4d101.p.ssafy.io:8080/auth/profile",
  {headers:{
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': _token
  }})
  .then(res => res.data)
  .catch(err=> {
    console.log("조회실패")
    console.error(err)})
  return { type: CHECKPROFILE, payload:_data, token: _token}
}

//로그아웃
export async function logout () {
  console.log('logout')
  return { type: USERLOGOUT, payload: null, token:null}
}

//프로필 수정
export async function updateprofile(user_info, logintoken) {
  const _data = await axios.put("http://i4d101.p.ssafy.io:8080/auth/profile",JSON.stringify(user_info),
  {headers:{
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': logintoken
  }})
  .then(res => res.data)
  .catch(err=> console.error(err))

  return { type: UPDATEPROFILE, payload:_data, token:logintoken}
}

//핸디권한 부여,제거
export async function toggelHandy(typeinfo,logintoken) {
  const _data = await axios.put('http://i4d101.p.ssafy.io:8080/auth/profile', JSON.stringify(typeinfo),{headers:{
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': logintoken
  }})
  return { type:TOGGLEHANDY,  }
}

//비밀번호 변경
export async function changepassword(newPassword, logintoken) {
  axios.put("http://i4d101.p.ssafy.io:8080/auth/user/password", JSON.stringify(newPassword),{headers:{
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': logintoken
  }})

  return { type:CHANGEPASSWORD,}
}


//팔로우조회
export async function findfollow(findfollowInfo, logintoken) {
  console.log(findfollowInfo)
  console.log(logintoken)
  const _data = axios.post("http://i4d101.p.ssafy.io:8080/social/findFollow",JSON.stringify(findfollowInfo),{headers:{
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': logintoken
  }})
  .then(res => res.data)
  .catch(err => {
    console.log(err)
  })
  return { type : FINDFOLLOW, payload : _data}
}
//안씀
export function toglelogin () {
  return {
    type : TOGLELOGIN
  }
}
