import React from 'react';
import { Link } from "react-router-dom"
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import MainHeader from '../header/MainHeader'
import '../../styles/mypage.css'
import {Avatar,Button} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { checkprofile, findfollow, updateprofile} from '../../actions';
import axios from 'axios'
import { withRouter } from 'react-router';

import DaumPostcode from 'react-daum-postcode';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

class MypageComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'home',
            userId:'',
            nickname:'',
            phone:'',
            address:'',
            holdingcredit:'',
            keywords:[],
            keyword:'',
            addcredit:'',
            isdaumpost:false,
            isPhoneClick:false,
            isNickNameClick:false,
            isCreditClick:false,
            is_CreditClick:false,
            changedNickname:'',
            changePhone:'',
            changedCredit:'',
            changed_Credit:'',
            jobs:'',
            avatarurl:"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg",
            tableRow:[],
            jobContractRows:[],
            contractAcceptData:null,

            HandytableRow:[],
            is_findContract:false,
            findContractInfo:{}

        };
        
    }
    async componentDidMount() {
        const logintoken = this.props.logintoken
        const myId = this.props.id

        // profile정보 바로 조회
        this.props.checkprofile(logintoken)
        
        this.setState({
            userId:this.props.id,
            nickname:this.props.nickname,
            phone:this.props.phone,
            address:this.props.address,
        })

        //credit조회 axios
        axios.get(`http://i4d101.p.ssafy.io:8080/credit/${this.props.userUuid}`, {headers:{
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': logintoken
        }})
        .then(res => {
            this.setState({
                holdingcredit:res.data.credit
            })
            console.log("credit 조회")
        })

        //키워드 조회 axios
        axios.get(`http://i4d101.p.ssafy.io:8080/keyword/user/keywords?`,{params: {
            userUuid: this.props.userUuid
        }},{headers:{
            'Content-Type': 'application/json',
        }})
        .then(res=> {
            this.setState({
                keywords: res.data.keywords
            })
        })
        .catch(err => {
            console.log(err)
        })

        //follow조회 
        const findfollowinfo = {
            myId:myId
        }
        if (findfollowinfo && logintoken) {
            this.props.findfollow(findfollowinfo, logintoken)
        }

        //내가 만든 일거리 조회
        axios.get("http://i4d101.p.ssafy.io:8080/job/findJobsByUuid?", {
            params : {
                jobUserUUid:this.props.userUuid
            }
        },{headers:{
            'Content-Type': 'application/json',
        }})
        .then(res => {
            this.makeRows(res.data)
        })


        ////////내 근무내역
        const body = {
            handy:this.props.userUuid,
        }
        const _data = await axios.post("http://i4d101.p.ssafy.io:8080/contract/selectHandy",
        JSON.stringify(body),
        {headers:{
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.props.logintoken
        }})
        .then(res => res.data)
        console.log("_data : ",_data)

        let findrow = []
        for (let i=0;i<_data.length;i++) {
            console.log(`_data:${i}`,_data[i])
            const onerow = await axios.get(`http://i4d101.p.ssafy.io:8080/job/jobInfo?jobId=${_data[i].contractJobId}`,{headers:{
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': logintoken
              }})
              .then(res => res.data)
            console.log('onerow: ',onerow)
            const jobInfo = {
                id: i,
                categoryId:onerow.categoryId,
                jobName:onerow.jobName,
                jobCredit:onerow.jobCredit,
                status:_data[i].contractStatus,
                jobRegDate:onerow.jobRegdate,
                contractId: _data[i].contractId,
                contractJobId: _data[i].contractJobId,
                hander: _data[i].hander,
                handy: _data[i].handy,
                contractStatus: _data[i].contractStatus
            }
            findrow.push(jobInfo)
        }
        this.setState({
            HandytableRow:findrow
        })
    }



    handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = '';
        let zoneCodes = data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

                const updateInfo = {
                    address:AllAddress
                }
                this.props.updateprofile(updateInfo, this.props.logintoken)


    }
    toggleNickNameClick= (e) =>{
        this.setState({
            isNickNameClick : !this.state.isNickNameClick
          })

    }

    nickNameCloselick= () =>{
        this.setState({
            isNickNameClick : false
          })
    }

    togglePhoneClick= (e) =>{
        this.setState({
            isPhoneClick : !this.state.isPhoneClick
        })

    }
    phoneCloseClick= () =>{
        this.setState({
            isPhoneClick : false
          })
    }
    creditClick= () =>{
        this.setState({
            isCreditClick : !this.state.isCreditClick,
            is_CreditClick : false
          })
    }
    credit_Click= () =>{
        this.setState({
            isCreditClick: false,
            is_CreditClick : !this.state.is_CreditClick
          })
    }

    toggleDaumDiv = () => {
          this.setState({
            isdaumpost : !this.state.isdaumpost
          })
    }

    addressChangeHandler = (e) =>{
        e.target.attr("color","default");
        e.target.innerHtml("변경확인")
    }

    nickNameChangeHandler = (e) =>{
        this.setState({
            changedNickname:e.target.value
        })
    }
    phoneChangeHandler = (e) =>{
        this.setState({
            changePhone:e.target.value
        })
    }
    CreditChangeHandler = (e) =>{
        this.setState({
            changedCredit:e.target.value
        })
    }
    Credit_ChangeHandler = (e) =>{
        this.setState({
            changed_Credit:e.target.value
        })
    }



    joinOut = () => {
        // 회원탈퇴로직
    }

    Addcredit = () => {
        alert("현재 크레딧 충전이 불가능합니다. 고객센터에 문의해주세요")
    }

    dateFormat2YYYMMDDHHMMSS =(dateString)=>{
        var a = new Date(dateString)
        var year = a.getFullYear();
        var month = a.getMonth()+1;
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min
        return time;
    }
    //일거리 게시글 삭제
    deleteJob =(e)=>{
        e.preventDefault()
        console.log(e.currentTarget.value)
        const body = {
            jobId : e.currentTarget.value
        }
        axios.delete("http://i4d101.p.ssafy.io:8080/job/deleteJob", {
            data: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.logintoken
            }
        }).then(res => {
            console.log(res)
            console.log('게시글 삭제')
            axios.get("http://i4d101.p.ssafy.io:8080/job/findJobsByUuid?", {
                params : {
                    jobUserUUid:this.props.userUuid
                }
            },{headers:{
                'Content-Type': 'application/json',
            }})
            .then(res => {
                this.makeRows(res.data)
            })
        }).catch(err => {
            console.error(err)
        })

        // delete 요청 바로날리기
    }

    //거래요청취소(handy입장)
    deletehandyJob =(e)=>{
        console.log(e.currentTarget.value)
        const body = {
            jobId : e.target.value
        }
        axios.delete("http://i4d101.p.ssafy.io:8080/job/deleteJob", {
            data: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': this.props.logintoken
            }
        })

        // delete 요청 바로날리기
    }

    moveUpdatePage =(e)=>{
        console.log(e.currentTarget.value)

        this.props.history.push('/jobupdate')
        // currentTarget.value = job id 키, 이걸로 수정 페이지 routing 하면됌
    }
    insertReview = (e)=>{
        console.log(e.currentTarget.value)
        this.props.history.push('/review/'+e.currentTarget.value)

       // /review/:contractId
    }

  //변수제어 함수
  onKeywordHandler = e => {this.setState({keyword:e.target.value})}
  onAddCreditHandler = e => {this.setState({addcredit: e.target.value})}
    
    // 회원탈퇴 함수
    onDeleteAccount = e => {
        e.preventDefault();

        //회원탈퇴 axios
        axios.delete("http://i4d101.p.ssafy.io:8080/auth/user",{headers:{
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': this.props.logintoken
        }})
        .then(res => {
            alert("회원탈퇴가 완료되었습니다.")
            window.location.href = '/home';
        })
        .catch(err => {
            console.log(err)
        })
    }

    //핸디권한부여 토글 함수
    // onToggleHandy = e => {
    //     e.preventDefault();
    //     const _type = (this.props.type+1)%2
    //     const typeInfo={
    //         type: _type
    //     }

        //핸디권한부여 토클 axios
    //     axios.put("http://i4d101.p.ssafy.io:8080/auth/profile/type",JSON.stringify(typeInfo), {headers:{
    //         'Content-Type': 'application/json',
    //         'X-AUTH-TOKEN': this.props.logintoken
    //     }})
    //     .then(res => {
    //         alert('유저님의 활동이 변경되었습니다.')
    //         this.props.checkprofile(this.props.logintoken)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }



    //키워드 리스트 출력 함수
    keywordList = () => {
        const keywords = this.state.keywords
        if (!keywords) {
            return null
        }
        const keywordlist = keywords.map((keyword, index) =>
            <span key={index} keyword={keyword} onClick={this.deleteKeyword}> {keyword}&nbsp;&nbsp;</span>)

        return <div>{keywordlist}</div>
    }

    //키워드삭제 함수
    deleteKeyword =(e) => {
        e.preventDefault()
        const inputInfo = {
            userUuid:this.props.userUuid,
            keywords:[ e.target.attributes[0].value ]
        }

        //키워드삭제 axios
        axios.delete("http://i4d101.p.ssafy.io:8080/keyword/user/keywords",
            {headers:{
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(inputInfo)
        
    })
        .then(res => {
            //키워드 조회(갱신) axios
            axios.get(`http://i4d101.p.ssafy.io:8080/keyword/user/keywords?`,{params: {
            userUuid: this.props.userUuid
            }},{headers:{
                'Content-Type': 'application/json',
            }})
            .then(res=> {
                this.setState({
                    keywords: res.data.keywords
                })
            })
            .catch(err => {
            })
            })
        .catch(err => {
        })
    }

  //키워드추가 함수
  onAddKeyword = e => {
    e.preventDefault()
    const inputInfo = {
      userUuid: this.props.userUuid,
      keywords: [this.state.keyword]
    }
    //공백일경우 추가x
    if (!this.state.keyword) {
      return
    }

    //키워드 추가 axios
    axios.post("http://i4d101.p.ssafy.io:8080/keyword/user/keywords", JSON.stringify(inputInfo),{headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => {
      //키워드 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/keyword/user/keywords?`,{params: {
        userUuid: this.props.userUuid
      }},{headers:{
        'Content-Type': 'application/json',
      }})
      .then(res=> {
        this.setState({
          keywords: res.data.keywords
        })
      })
      .catch(err => {
        console.log(err)
      })
      this.setState({
        keyword:'',
      })
    })
    }

  // enter키로 키워드 추가
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.onAddKeyword(e)
    }
  }

  //닉네임 중복확인
  checkNickname= async (e)=> {
        let _data
    //닉네임 그대로일때 처리
    if (this.state.nickname == this.state.changeNickname) {
            return "yes"            
    } 
    else {
    //닉네임 중복확인 axios
    _data = await axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/nickname/${this.state.changeNickname}`)
    .then(res=>{
            return "yes"
    })
    .catch(err=>{
            return "no"
    })
    }
        return _data
  }

    //닉네임변경 함수
    changeNickname = async (e) => {
        e.preventDefault()
        const _data = await this.checkNickname()
        if (_data === "yes") {
            const updateInfo = {
                nickname: this.state.changedNickname,
            }
            this.props.updateprofile(updateInfo, this.props.logintoken)
            this.toggleNickNameClick()
        }
        else {
            alert("사용할 수 없는 닉네임입니다.")
        }
    }

    //휴대전화번호 중복확인
    checkPhone =  async (e) => {
        let _data        
        const phoneInfo = this.state.changePhone
        const phone = phoneInfo.substring(0,3) + "-" + phoneInfo.substring(3,7) + "-" + phoneInfo.substring(7,11)
        //휴대전화번호 그대로일떄 허용처리
        if (phone == this.state.phone) {
            _data = "yes"
            return _data
        }
        else {
            //휴대전화번호 유효성처리
            if (phone.length < 13) {
                _data = "no"
                return _data
            }
            // 휴대전화번호 중복체크 axios
            _data = await axios.get(`http://i4d101.p.ssafy.io:8080/auth/validate/phone/${phoneInfo}`)
            .then(res=>{
                return "yes"
            })
            .catch(err=>{
                return "no"
            })
        return _data
    }}

    //휴대전화번호변경 함수
    changePhone = async (e) => {
        e.preventDefault()
        const _data = await this.checkPhone()
        if (_data === "yes") {
            const phoneInfo = this.state.changePhone
            const phone = phoneInfo.substring(0,3) + "-" + phoneInfo.substring(3,7) + "-" + phoneInfo.substring(7,11)

            const updateInfo = {
                phone: phone,
            }
            this.props.updateprofile(updateInfo, this.props.logintoken)
            this.togglePhoneClick()
        }
        else {
            alert("사용할 수 없는 전화번호입니다.")
        }
    }

  // 회원탈퇴 함수
  onDeleteAccount = e => {
    e.preventDefault();

    //회원탈퇴 axios
    axios.delete("http://i4d101.p.ssafy.io:8080/auth/user",{headers:{
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': this.props.logintoken
    }})
    .then(res => {
      alert("회원탈퇴가 완료되었습니다.")
      window.location.href = '/home';
    })
    .catch(err => {
      console.log(err)
    })
  }

    makeRows = jobs=>{
        var jobRows=[]
        if(jobs){
            jobs.map((job,index) => {
                var row={
                    id:job.jobId,
                    categoryId:job.categoryId,
                    jobName:job.jobName,
                    jobCredit:job.jobCredit,
                    status:job.status,
                    jobRegdate:job.jobRegdate
                }
                jobRows.push(row);
            })

            this.setState({
                tableRow:jobRows
            })
        }
    }

  //credit충전 함수
  changeCredit = e => {
    e.preventDefault()
    const inputInfo = {
      userUuid:this.props.userUuid,
      value:this.state.changedCredit
    }
        console.log(inputInfo)

    //credit충전 axios
    axios.put("http://i4d101.p.ssafy.io:8080/credit", JSON.stringify(inputInfo), {headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => {
      //credit 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/credit/${this.props.userUuid}`, {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
      }})
      .then(res => {
        this.setState({
          holdingcredit:res.data.credit,
                    changedCredit:'',
        })
      })
      this.setState({
        addcredit:''
      })
    })
    .catch(err => {
      console.log('크레딧 충전 실패')
      console.log(err)
    })
  }

    //credit 환전
  change_Credit = e => {
    e.preventDefault()
    const inputInfo = {
      userUuid:this.props.userUuid,
      value:-this.state.changed_Credit
    }

    //credit충전 axios
    axios.put("http://i4d101.p.ssafy.io:8080/credit", JSON.stringify(inputInfo), {headers:{
      'Content-Type': 'application/json'
    }})
    .then(res => {
      //credit 조회(갱신) axios
      axios.get(`http://i4d101.p.ssafy.io:8080/credit/${this.props.userUuid}`, {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
      }})
      .then(res => {
        this.setState({
          holdingcredit:res.data.credit,
                    changed_Credit:''
        })
      })
      this.setState({
        addcredit:''
      })
    })
    .catch(err => {
      console.log('크레딧 환전 실패')
      console.log(err)
    })
}


//////////글에대한 핸더의 거래 요청 관리
makeContractRow = async (selectJobUuid) =>{
    const inputInfo={
        contractJobId:selectJobUuid
    }
    var contractRowArr=[]
    const _data = await axios.post("http://i4d101.p.ssafy.io:8080/contract/select", JSON.stringify(inputInfo),{headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
    }})
    console.log("컨트랙트 불러왔음")
    console.log(_data.data)
    
    for(var i=0;i<_data.data.length;i++){
        const rowProfileData=await axios.post(`http://i4d101.p.ssafy.io:8080/auth/profile/uuid/`+_data.data[i].handy,
            { headers:{
                'Content-Type': 'application/json',
                 'X-AUTH-TOKEN': this.props.logintoken
                }
            })
            console.log(rowProfileData)
            var contractRowData={
                id:i,
                "contractId": _data.data[i].contractId,
                "nickname": rowProfileData.data.nickname,
                "contractStatus": _data.data[i].contractStatus,
                "contractJobId": _data.data[i].contractJobId,
                "hander": _data.data[i].hander,
                "handy": _data.data[i].handy,
            }
            contractRowArr.push(contractRowData)
    }
    console.log(contractRowArr)
    this.setState({
        jobContractRows:contractRowArr
    }
    )
    console.log(contractRowArr)
    
}

contractAcceptHandler = async (contractJobId,handyUuid,contractId,handerUuid) =>{
    
    const data={
        contractJobId:contractJobId,
        handy:handyUuid,
        "contractId":contractId,
        "hander":handerUuid,
        
    }
    console.log("이거확인해라이쌰ㅐㅑ더랴덜")
    console.log(data)
    axios.post("http://i4d101.p.ssafy.io:8080/contract/accept", JSON.stringify(data),
    {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
    }}).then((res)=>{
        console.log(res)
    })

    const jobstatusdata={
        contractJobId:contractJobId,
        status:"거래중"
    }
    await axios.put("http://i4d101.p.ssafy.io:8080/job/updateJobStatus", JSON.stringify(jobstatusdata),
    {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
    }}).then((res)=>{
        console.log(res)
    })
    }

////////// 핸더의 글관리 끝 

////내 근무내역 수정
FindHandy = () => {
    const body = {
        handy:this.props.userUuid,
    }
    axios.post("http://i4d101.p.ssafy.io:8080/contract/selectHandy",
    JSON.stringify(body),
    {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
    }})
    .then(res => {
        console.log(res)
    })


}

// 손ㄷㅇ민씨 거래내역 토글
ToggleIsFindContract = (e) => {
    const contractJobId = e.currentTarget.value
    this.setFindContract(contractJobId)
    this.setState({
        is_findContract:!this.state.is_findContract
    })



}

//거래내역 데이터넣기
setFindContract = async (jid) => {
    const jobId = jid
    const _data = await axios.get(`http://i4d101.p.ssafy.io:8080/job/jobInfo?jobId=${jobId}`, {headers:{
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': this.props.logintoken
    }} )
    console.log('findConstractdata: ',_data.data)
    this.setState({
        findContractInfo:_data.data
    })

}

successHandler = async (a,b) => {
    const ContractSuccess_Info = {
        "contractJobId": b,
        "handy": a
    }
    await axios.post("http://i4d101.p.ssafy.io:8080/contract/change",
                JSON.stringify(ContractSuccess_Info),
                {headers:{
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.props.logintoken
                }}
                ).then(res => {
                    console.log("거래완료",res)
                })
                .catch(err => {
                    console.log(err)
                })
    
    // this.makeContractRow(b)

}

render() {
    const HandytableRow = this.state.HandytableRow
    // 일거리 요청 테이블 행
    const jobContractColumn = [ 
        { field: 'id',headerName:"순서",width:100},
        { field: 'contractStatus', headerName: '요청상태', width: 120 },
        { field: 'nickname',
            headerName: '요청한 핸디',
            description: '게시글에 요청한 핸디',
            width: 350,
            renderCell: (params) =>{
                <Link to={"/profile/"+params.getValue('nickname') }>
                            {params.getValue('nickname')}
                </Link>
            },
        },
        { field: 'etc1',
            headerName: '메뉴',
            description: '게시글에 요청한 핸디',
            width: 200,
            renderCell: (params) =>{
                if(params.getValue('contractStatus')==("거래전")){
                    return (
                        <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{marginRight:"4px"}}
                        onClick={(e)=>{
                            // e.preventDefault()
                            e.stopPropagation()
                            // e.preventDefault()
                            // e.stopPropagation()
                            
                            this.setState({
                            contractAcceptData:{
                                contractJobId: params.getValue('contractJobId'),
                                handy:params.getValue('handy')
                            }
                            })                            
                            this.contractAcceptHandler(params.getValue('contractJobId'),
                            params.getValue('handy'),params.getValue('contractId'),params.getValue('hander'))
                             ;
                        }}>
                        수락
                        </Button>
                    )
                }else if(params.getValue('contractStatus')==("거래중")) {
                    return (
                        <>
                        <Link>
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{marginRight:"4px"}}
                            >
                            거래 정보 보기
                            </Button>
                        </Link>
                        <Link >
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{marginRight:"4px"}}
                            onClick={this.successHandler(params.getValue("handy"),params.getValue("contractJobId"))}
                            >
                            거래 완료하기
                            </Button>
                        </Link>
                        </>
                        
                    )
                }else if(params.getValue('contractStatus')==("거래완료")){
                    return (
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{marginRight:"4px"}}
                            onClick={(e)=>{
                                /*
                                거래 완료 상태 변경 메서드 (일거리와 contract 함께 axios 날려야함)
                                */
                            //    ToggleIsFindContract
                            }}>
                            영수증보기
                            </Button>
                    )
                }
                
            },
          },
          {
            field: 'etc2',
            headerName:'리뷰작성',
            description:'리뷰는 거래완료이후 작성 가능합니다',
            width:120,
            renderCell: (params) =>{
                        return(
                            <>
                                <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{backgroundColor:"#FF7000",marginRight:"2px"}}
                                value={params.getValue('contractId')}
                                onClick={this.insertReview}
                                >
                                리뷰작성
                                </Button>
                            </>
                        )
            }
     }
    ]

    

    const columns = [ // 열 정의(하나의 인덱스는 하나의 열을 대변)
        { field: 'id',headerName:"번호",width:100},
        { field: 'categoryId', headerName: '카테고리', width: 120 },
        {
            field: 'jobName',
            headerName: '이름',
            description: '게시글이름을 링크로 변환',
            width: 350,
            renderCell: (params) =>{
                var ji=params.getValue('id');
                return (
                        <Link to={"/job/"+ji}>
                            {params.getValue('jobName')}
                        </Link>
                        )
            },
          },
        { field: 'jobCredit', headerName: '가격', width: 90},
        { field: 'status',sortable:true, headerName: '거래상태', width: 120},
        {
          field: 'jobRegDate',
          headerName: '시간',
          description: '게시 시간을 yy-mm-dd hh:mm형태로 변환',
          sortable:true,
          sortingOrder:'desc',
          width: 150,
          valueGetter: (params) =>{
              return this.dateFormat2YYYMMDDHHMMSS(params.getValue('jobRegdate'))
              }
        },
        {
            field: 'etc',
            headerName:'관리',
            description:'버튼이 나열될 행',
            width:200,
            renderCell: (params) =>{
                        return(
                            <>
                                <Link to={"/updatejob/"+params.getValue('id')}>
                                <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{marginRight:"4px"}}
                                value={params.getValue('id')}
                                // onClick={this.moveUpdatePage}
                                
                                >
                                수정
                                </Button>
                                    </Link>
                                <Button
                                variant="contained"
                                color="default"
                                size="small"
                                style={{marginLeft:"2px",marginRight:"2px"}}
                                value={params.getValue('id')}
                                onClick={this.deleteJob}
                                >
                                삭제
                                </Button>
                            </>
                        )
                }
            },
            
    ]
    ////// 동민이형 칼럼
    const columns_handy = [ // 열 정의(하나의 인덱스는 하나의 열을 대변)
        { field: 'id',headerName:"번호",width:100},
        { field: 'categoryId', headerName: '카테고리', width: 120 },
        {
            field: 'jobName',
            headerName: '이름',
            description: '게시글이름을 링크로 변환',
            width: 350,
            renderCell: (params) =>{
                var ji=params.getValue('id');
                return (
                        <Link onClick={this.ToggleIsFindContract}>
                            {params.getValue('jobName')}
                        </Link>
                        )
            },
          },
        { field: 'jobCredit', headerName: '가격', width: 90},
        { field: 'status',sortable:true, headerName: '거래상태', width: 120},
        {
          field: 'jobRegdate',
          headerName: '시간',
          description: '게시 시간을 yy-mm-dd hh:mm형태로 변환',
          sortable:true,
          sortingOrder:'desc',
          width: 150,
          valueGetter: (params) =>{
              return this.dateFormat2YYYMMDDHHMMSS(params.getValue('jobRegDate'))
              }
        },
        {
            field: 'etc',
            headerName:'관리',
            description:'버튼이 나열될 행',
            width:200,
            renderCell: (params) =>{
                        if (params.getValue('status')=="거래전") {

                            return(
                                
                                <>
                                <Link to={"/updatejob/"+params.getValue('id')}>
                                <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{marginRight:"4px"}}
                                value={params.getValue('id')}
                                // onClick={this.moveUpdatePage}
                                
                                >
                                수정
                                </Button>
                                    </Link>
                                <Button
                                variant="contained"
                                color="default"
                                size="small"
                                style={{marginLeft:"2px",marginRight:"2px"}}
                                value={params.getValue('id')}
                                onClick={this.deletehandyJob}
                                >
                                요청취소
                                </Button>
                            </>
                        )
                        }
                        else {
                            return (

                                <>
                            <Link>
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{marginRight:"4px"}}
                            value={params.getValue('contractJobId')}
                            onClick={this.ToggleIsFindContract}
                            >
                            거래상세
                            </Button>
                            </Link>
                        </>
                                )
                        }
                }
            },
            {
                field: 'etc2',
                headerName:'리뷰작성',
                description:'리뷰는 거래완료이후 작성 가능합니다',
                width:120,
                renderCell: (params) =>{
                            return(
                                <>
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{backgroundColor:"#FF7000",marginRight:"2px"}}
                                    value={params.getValue('id')}
                                    onClick={this.insertReview}
                                    >
                                    리뷰작성
                                    </Button>
                                </>
                            )
                }
        }
    ]

    
    const postCodeStyle = {
        position: "absolute",
        top: 0,
        zIndex: "100",
        border: "1px solid #000000",
        overflow: "hidden"
    }

    return (
    <>
    <MainHeader></MainHeader>
    <Container fluid className={"mt-5 px-5"}>


    { this.state.is_findContract
        ?
        <Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
            <p className={"tabInnerDivHeader"}>거래상세</p>
            <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                <div className={"my-2"} style={{height: 400,width: '100%' }}>
                    <p>제목:{this.state.findContractInfo.jobName}</p>
                    <p>내용:{this.state.findContractInfo.content}</p>
                    <p>크레딧:{this.state.findContractInfo.jobCredit}</p>
                    <p>{this.state.findContractInfo.status}</p>
                </div>
            </Col>
        </Row>
    : null
    }

    <Row style={{marginTop:"6rem"}}>    
        <Col md={12} style={{paddingTop:"3rem;"}}>
            <Tabs fill
                id="controlled-tab-example"
                activeKey={this.state.key}
                className={"rounded-nav my-2 py-3"}
                style={{paddingLeft:"10%",paddingRight:"10%"}}
                onSelect={key => this.setState({ key })}
            >
                <Tab className={"rounded-nav my-2"} style={{borderColor:'#dee2e6'}}eventKey="home" title="계정 관리">
                    <Container style={{paddingLeft:"10%",paddingRight:"10%"}}>
                        <Row style={{paddingTop:"3rem",paddingBottom:"3rem",paddingRight:"5rem",paddingLeft:"5rem"}}>
                            <p className={"tabInnerDivHeader"}>내 프로필</p>
                            <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                                <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5 justify-content-center">
                                <Avatar src={this.state.avatarurl} 
                                        alt={"아바타"} style={{boxShadow:"1px 1px 4px 4px #000",border:'2px solid rgba(63,81,181,0.4)',width: '100px', height:'100px',verticalAlign: 'middle'}}/>
                                </div>
                                <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0 account-input-text">
                                        아이디
                                        </span>
                                    </div>
                                    <input id="username" type="text" name="username" value={this.props.id} placeholder="" class="form-control bg-white border-left-0 border-md" disabled/>
                                    </div>
                        
                                    <div class="input-group col-lg-12 mb-4 px-5">
                                    <div class="input-group-prepend">
                                        <span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
                                        닉네임
                                        </span>
                                    </div>
                                    <input id="nickname" type="text" name="nickname"  value={this.props.nickname} class="form-control bg-white border-md border-left-0" disabled/>
                                    <Button variant="contained" color="primary" onClick={this.toggleNickNameClick}>
                                        {
                                            (this.state.isNickNameClick) ? <span>취소</span> : <span>수정</span>
                                        }
                                        </Button>
                                
                                    </div>
                                    {
                                        (this.state.isNickNameClick ? 
                                            <div
                                                className={"py-3 mb-3 align-item-center justify-content-center"}
                                                style={{backgroundColor:"#f2f4f7"}}
                                            >
                                                <div class="input-group col-lg-6 offset-md-3">
                                                    <div class="input-group-prepend">
                                                        <span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
                                                        변경할닉네임
                                                        </span>
                                                    </div>
                                                    <input id="changedNickname" type="text" name="changedNickname"  
                                                        value={this.state.changedNickname} onChange={this.nickNameChangeHandler} class="form-control bg-white border-md border-left-0"/>
                                                    <Button variant="contained" color="secondary" onClick={this.changeNickname}>확인</Button>

                                                </div>
                                            </div>
                                        : null)
                                    }
                        
                                
                                    <div class="input-group col-lg-12 mb-4 px-5">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0 account-input-text">
                                        연락처
                                        </span>
                                    </div>

                                    <input id="phone" type="tel" name="phone" value={this.props.phone} placeholder="" class="form-control bg-white border-md border-left-0" disabled/>
                                    <Button variant="contained" color="primary" onClick={this.togglePhoneClick}>
                                    {
                                            (this.state.isPhoneClick) ? <span>취소</span> : <span>수정</span>
                                        }
                                        </Button>
                                    </div>
                                    {
                                        (this.state.isPhoneClick ? 
                                            <div
                                                className={"py-3 mb-3 align-item-center justify-content-center"}
                                                style={{backgroundColor:"#f2f4f7"}}
                                            >
                                                <div class="input-group col-lg-6 offset-md-3">
                                                    <div class="input-group-prepend">
                                                        <span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
                                                        전화번호
                                                        </span>
                                                    </div>
                                                    <input id="changedNickname" type="text" name="changedNickname"  
                                                        value={this.state.changePhone} onChange={this.phoneChangeHandler} class="form-control bg-white border-md border-left-0"/>
                                                    <Button variant="contained" color="secondary" onClick={this.changePhone}>확인</Button>

                                                </div>
                                            </div>
                                        : null)
                                    }
                                    <div class="input-group col-lg-12 mb-4 px-5">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-3 border-md border-right-0 account-input-text">
                                        활동지역
                                        </span>
                                    </div>
                                    <input id="address" type="text" name="address" value={this.props.address} placeholder="" class="form-control bg-white border-md border-left-0" disabled/>
                                    <Button variant="contained" color="primary"  onClick={this.toggleDaumDiv}>주소변경</Button>
                                    {
                                        (this.state.isdaumpost ? 
                                            <DaumPostcode
                                                className={"mt-5"}
                                                onComplete={this.handleAddress}
                                                autoResize
                                                autoClose
                                                width={600}
                                                height={450}
                                                style={postCodeStyle}
                                                isdaumpost={this.state.isdaumpost}
                                            />
                                        : null)
                                    }
                                    </div>
                            </Col>

                            <p className={"tabInnerDivHeader mt-5"}>내 키워드</p>
                            <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                                <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5 justify-content-center">
                                    <span>{this.keywordList()}</span>
                                </div>
                                    <div class="input-group col-lg-12 mb-4 px-5">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white px-4 border-md border-right-0 account-input-text">
                                        키워드
                                        </span>
                                    </div>
                                    <input id="addkeywords" type="text" name="keyword" value={this.state.keyword} placeholder="" class="form-control bg-white border-md border-left-0"
                                    onChange={this.onKeywordHandler} onKeyPress={this.handleKeyPress}
                                    />
                                    <Button variant="contained" color="primary" onClick={this.handleKeyPress("Enter")}>수정</Button>
                                    </div>
                                    <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5 justify-content-center">
                                    <p>키워드단어 클릭시 삭제.</p>
                                </div>
                            </Col>

                            <p className={"mt-5 tabInnerDivHeader"}>내 크레딧</p>
                            <Col className={"tabInnerDiv pb-3"} style={{textAlign:"right"}} md={12} lg={12}>
                                <div class="d-flex justify-content-center align-item-center my-2 px-5">
                                    <div class={"d-flex justify-content-center align-item-center pt-2"}>
                                        <MonetizationOnRoundedIcon style={{marginTop:"2rem",fontSize:"3.4rem"}}/> <p style={{fontSize:"2rem",marginLeft:"15px",marginTop:"2.2rem",display:"inline-block"}}>{this.state.holdingcredit}</p>
                                    </div>
                                </div>
                                <Button variant="contained" color="secondary" onClick={this.creditClick}>크레딧 충전</Button>
                                <Button className={"mx-2"} variant="contained" color="link" onClick={this.credit_Click}>크레딧 환전</Button>
                                {/* 크레딧 충전 */}
                                {
                                        (this.state.isCreditClick ? 
                                            <div
                                                className={"py-3 mb-3 align-item-center justify-content-center mt-2"}
                                                style={{backgroundColor:"#f2f4f7"}}
                                            >
                                                <div class="input-group col-lg-6 offset-md-3">
                                                    <div class="input-group-prepend">
                                                        <span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
                                                        크레딧
                                                        </span>
                                                    </div>
                                                    <input id="changedCredit" type="text" name="changedCredit"  
                                                        value={this.state.changedCredit} onChange={this.CreditChangeHandler} class="form-control bg-white border-md border-left-0"/>
                                                    <Button variant="contained" color="secondary" onClick={this.changeCredit}>충전</Button>

                                                </div>
                                            </div>
                                        : null)
                                    }
                                    {/* 크레딧 환전 */}
                                    {
                                        (this.state.is_CreditClick ? 
                                            <div
                                                className={"py-3 mb-3 align-item-center justify-content-center mt-2"}
                                                style={{backgroundColor:"#f2f4f7"}}
                                            >
                                                <div class="input-group col-lg-6 offset-md-3">
                                                    <div class="input-group-prepend">
                                                        <span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
                                                        크레딧
                                                        </span>
                                                    </div>
                                                    <input id="changed_Credit" type="text" name="changed_Credit"  
                                                        value={this.state.changed_Credit} onChange={this.Credit_ChangeHandler} class="form-control bg-white border-md border-left-0"/>
                                                    <Button variant="contained" color="secondary" onClick={this.change_Credit}>환전</Button>

                                                </div>
                                            </div>
                                        : null)
                                    }
                            </Col>

                            <p className={"mt-5 tabInnerDivHeader"}>회원탈퇴신청</p>
                            <Col className={"tabInnerDiv "} md={12} lg={12}>
                                <div class="input-group justify-content-center align-item-center col-sm-12 col-mg-12 col-lg-12 my-2 px-5">
                                    <p style={{marginTop:"12px"}}>회원탈퇴를 신청할 경우 다시 되돌릴 수 없습니다</p>
                                    <Button style={{position:"absolute",right:70,top:6}} variant="contained" color="warning" onClick={this.onDeleteAccount}>회원탈퇴</Button>
                                    </div>
                            </Col>
                        </Row>
                    </Container>
                </Tab>
                
                
                
                
                
                <Tab eventKey="profile" title="일거리 관리">
                    <Container fluid >
                    <Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                        <p className={"tabInnerDivHeader"}>내가 만든 일거리</p>
                        <Col className={"tabInnerDiv"} md={12} lg={12}>
                            <div className={"my-2"} style={{ height: 400, width: '100%' }}>
                                <DataGrid rows={this.state.tableRow} 
                                            columns={columns} pageSize={5} 
                                            onSelectionChange={(newSelection) => {
                                                    
                                                    this.makeContractRow(newSelection.rowIds[0]);
                                                    
                                            }}
                                            // apiRef=
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                        <p className={"tabInnerDivHeader"}>일거리 거래 요청</p>
                        <Col className={"tabInnerDiv"} md={12} lg={12}>
                            <div className={"my-2"} style={{ height: 400, width: '100%' }}>
                                <DataGrid rows={this.state.jobContractRows} 
                                            columns={jobContractColumn} pageSize={5} 
                                />
                            </div>
                        </Col>
                    </Row>
                    </Container>
                </Tab>

                


                <Tab eventKey="contact" title="내 근무내역">
                    <Container fluid>
                        {/* { this.state.is_findContract
                         ?
                            <Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                                <p className={"tabInnerDivHeader"}>거래상세</p>
                                <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                                    <div className={"my-2"} style={{height: 400,width: '100%' }}>
                                        <p>제목:{this.state.findContractInfo.jobName}</p>
                                        <p>내용:{this.state.findContractInfo.content}</p>
                                        <p>크레딧:{this.state.findContractInfo.jobCredit}</p>
                                        <p>{this.state.findContractInfo.status}</p>
                                    </div>
                                </Col>
                            </Row>
                        : null
                        } */}
                        <Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
                            <p className={"tabInnerDivHeader"}>내가 수행한 일거리</p>
                            <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                                <div className={"my-2"} style={{height: 400,width: '100%' }}>
                                    <DataGrid rows={this.state.HandytableRow} columns={columns_handy} pageSize={5} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </Col>
    </Row>
        
    </Container>  
    </>
    )
    }
}

const mapStateToProps = (state) => {
// console.log(state)
if (state.userProfile) 
{
return {
  id:state.logined.id,
  userUuid:state.logined.userUuid,
  logintoken: state.token,

  profileId : state.logined.userProfile.profileId,
  email:state.logined.userProfile.email,
  name:state.logined.userProfile.name,
  
  phone:state.userProfile.phone,
  address:state.userProfile.address,
  gender:state.userProfile.gender,
  description:state.userProfile.description,
  nickname:state.userProfile.nickname,
  type:state.type,
  follows:state.follows
}
}
else if (state.logined) {
return {
  id:state.logined.id,
  userUuid:state.logined.userUuid,
  logintoken: state.token,
  type:state.type,
}
}
}

const mapDispatchToProps  = (dispatch) => {
return {
findfollow: (followinfo,token) => {dispatch(findfollow(followinfo,token))
},
checkprofile:(token_info) => {dispatch(checkprofile(token_info))
},
    updateprofile:(userinfo,token_info) => {dispatch(updateprofile(userinfo,token_info))
}
}
}
MypageComp = connect(mapStateToProps,mapDispatchToProps) (MypageComp);
export default withRouter(MypageComp);