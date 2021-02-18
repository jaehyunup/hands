import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import '../../styles/mypage.css'
import {TextField,Avatar,Button} from '@material-ui/core';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

class JobUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobUserUUid : '', //일단 박아넣음
            jobName : '',
            categoryId : '', //ui만들고 value값 받아오기
            content : '',
            workingHour : '',
            jobCredit : 0,
            workingDate : '',
            workingAddress : '',
            status : '',
            isdaumpost : false,
            fullAddress : '',
            detailAddress : '',
            zoneCode : '',
            jobId: props.match.params.jobId,
            keywords : [],
            keyword :'',
        };

    }

    async componentDidMount() {
      console.log(this.state.jobId)
      const _data = await axios.get("http://i4d101.p.ssafy.io:8080/job/jobInfo?",
      {
        params: {
          jobId:this.state.jobId
        }
      })
      .then(res => res.data)
      console.log(_data)
      this.setState({
        "jobId": _data.jobId,
        "jobUserUUid": _data.jobUserUUid,
        "categoryId": _data.categoryId,
        "content": _data.content,
        "jobRegdate": _data.jobRegdate,
        "workingHour": _data.workingHour,
        "jobCredit": _data.jobCredit,
        "workingDate": _data.workingDate,
        "workingAddress": _data.workingAddress,
        "status": _data.status,
        "jobName": _data.jobName,
        "dday": _data.dday,
        "userAddress": _data.userAddress,
        "userEmail": _data.userEmail,
        "userGender": _data.userGender,
        "userName": _data.userName,
        "userNickname": _data.userNickname,
        "userPhone": _data.userPhone,

      })
    }

    handleOpenPost = () => {
      console.log('hello');
        this.setState({
            isdaumpost : true
        })
    }

    handleAddress = (data) => {
        let AllAddress = data.jibunAddress;
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
        this.setState ({
            fullAddress: AllAddress,
            zoneCode : zoneCodes
        })
        this.toggleDaumDiv()
    }

    handleInput = (e) => {
        console.log('handleinput');
          this.setState({
            detailAddress : e.target.value
          })
    }
    
    handleWorkingAddress = async() => {
        await this.handleAddress();
        this.setState({
            workingAddress : this.fullAddress + this.detailAddress
        })
    }


    toggleDaumDiv = () => {
        this.setState({
          isdaumpost : !this.state.isdaumpost
        })
  }
  
    createJobHandler = () => {
        console.log("날라감")
    }


// 
handleSubmit = async (event) => {
  console.log(this.state);
  const body = {
      jobName : this.state.jobName,
      jobUserUUid : this.props.userUUid,
      categoryId : this.state.categoryId,
      content : this.state.content,
      workingHour : this.state.workingHour,
      jobCredit : this.state.jobCredit,
      workingDate : this.state.workingDate,
      workingAddress : this.state.workingAddress,
      status : this.state.status
  }
  const hashtag = {
      jobId : this.state.jobId,
      keywords : this.state.keywords
  }
  console.log("job서버에 넘길데이터",body);
  axios.post(
      'http://i4d101.p.ssafy.io:8080/job/insertJob',
      JSON.stringify(body),
      {headers:{
          'Content-Type': 'application/json'
      }})
      .then( async(res)=>{
          console.log(res)
          await this.setState({jobId : res.data.message});
              axios.post(
                      'http://i4d101.p.ssafy.io:8080/keyword/job/keywords',
                       JSON.stringify(hashtag),
                      {headers:{
                          'Content-Type': 'application/json'
                      }})
                  .then((response)=>{
                      console.log(response)
                  })
                  .catch((e)=>{console.log(e)});
            this.props.history.push(`/job/${this.state.jobId}`)
      })
      .catch(error => {
          console(error)
      })
}
// 
updateJobHandler = async e => {
    e.preventDefault()
    // await this.handleWorkingAddress();

    const body = {
      jobId: this.state.jobId,
      jobUserUUid:this.state.jobUserUUid,
      categoryId:this.state.categoryId,
      content:this.state.content,
      jobCredit:this.state.jobCredit,
      workingHour: this.state.workingHour,
      workingDate: this.state.workingDate,
      workingAddress: this.state.workingAddress,
      status: this.state.status,

    }
    const hashtag = {
      jobId : this.state.jobId,
      keywords : this.state.keywords
  }
    console.log("body",body)
    axios.put(
      "http://i4d101.p.ssafy.io:8080/job/updateJob",
      JSON.stringify(body),
      {headers:{
        'Content-Type': 'application/json'
      }})
      .then(res => {
        const jobId = this.state.jobId
        console.log("jobId : ",jobId)
        axios.post(
                'http://i4d101.p.ssafy.io:8080/keyword/job/keywords',
                 JSON.stringify(hashtag),
                {headers:{
                    'Content-Type': 'application/json'
                }})
            .then((response)=>{
                console.log(response)
            })
            .catch((e)=>{console.log(e)});
        this.props.history.push(`/job/${jobId}`)
        })
      .catch(err => {
        console.log(err)
      })
  }

    onChangeJobNameHandeler = e => {
      this.setState({
          jobName:e.target.value
      })
    }
  onChangeContentHandler=e=>{
      this.setState({
          content:e.target.value
      })
      }

  onChangeCategoryHandler = (val:any) => {
      this.setState({categoryId: val.currentTarget.value})    
   }

  //키워드 리스트 출력 함수
  keywordList = () => {
    const keywords = this.state.keywords
    if (!keywords) {
        return null
    }
    const keywordlist = keywords.map((keyword, index) =>
        <span key={index} keyword={keyword} value={keyword} onClick={this.deleteKeyword}> {keyword}&nbsp;&nbsp;</span>)

    return <div>{keywordlist}</div>
  }

  //키워드삭제 함수
  deleteKeyword =(e) => {
      e.preventDefault()
      var cur_keywords=this.state.keywords
      cur_keywords.splice(cur_keywords.indexOf(e.target.value),1);
      this.setState({
          keywords:cur_keywords
      })
  }

  //키워드추가 함수
  onAddKeyword = e => {
  e.preventDefault()
  const inputInfo = {
    userUuid: this.props.userUuid,
    keywords: [this.state.keyword]
  }
  console.log(inputInfo)
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
        //공백일경우 추가x
    if (!this.state.keyword) {
      return
    }
    var preKeywords=this.state.keywords;
    preKeywords.push(this.state.keyword);
    this.setState({
        keywords:preKeywords,
        keyword:'',
    })
  }

  }
  changeKeyword = e=>{
    this.setState({
        keyword:e.target.value
    })
  }
  render() { 
    const {jobUserUUid, jobName, categoryId, content, jobRegdate, workingHour, jobCredit, 
      workingDate, workingAddress, status, isdaumpost, fullAddress, detailAddress, zoneCode} = this.state;

      const postCodeStyle = {
          position: "absolute",
          top: 0,
          zIndex: "100",
          border: "1px solid #000000",
          overflow: "hidden"
      }

      return(

          <>
              <Container style={{paddingLeft:"10%",paddingRight:"10%"}}>
                          <Row style={{paddingTop:"3rem",paddingBottom:"3rem",paddingRight:"5rem",paddingLeft:"5rem"}}>
                              <p className={"tabInnerDivHeader"}>일거리 작성</p>
                              <Col className={"tabInnerDiv p-2"} md={12} lg={12}>
                                  
                                      <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text px-4 border-md border-right-0 account-input-text">
                                              제목
                                              </span>
                                          </div>
                                          <input id="input-jobName" type="text" name="jobName" value={this.state.jobName} placeholder="" class="form-control  border-left-0 border-md" onChange={this.onChangeJobNameHandeler}/>
                                      </div>
                          
                                      <div class="input-group col-lg-12 mb-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="account-input-text input-group-text px-3 border-md border-right-0">
                                              카테고리
                                              </span>
                                          </div>
                                          <select id="input-category" type="text" name="category"  value={this.state.category} onChange={this.onChangeCategoryHandler}  class="form-control  border-md border-left-0">
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                          </select>
                                      </div>
                                  


                                      <div class="input-group col-lg-12 mb-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text px-3 border-md border-right-0 account-input-text">
                                              활동지역
                                              </span>
                                          </div>
                                          {
                                            this.state.fullAddress
                                            ? <input id="input-address" type="text" name="address" value={this.state.fullAddress} onFocus={this.toggleDaumDiv} placeholder="" class="form-control bg-white border-md border-left-0"/>
                                            : <input id="input-address" type="text" name="address" value={this.state.workingAddress} onFocus={this.toggleDaumDiv} placeholder="" class="form-control bg-white border-md border-left-0"/>
                                          }
                                          {
                                              (this.state.isdaumpost ? 
                                                  <>
                                                  <Button variant="contained" color="primary"  onClick={this.toggleDaumDiv}>취소</Button>
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
                                                  </>
                                              : null)
                                          }
                                      </div>
                                      

                                      <div class="input-group col-lg-12 mb-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="account-input-text input-group-text px-4 border-md border-right-0">
                                              내용
                                              </span>
                                          </div>
                                          <textarea id="input-contents" rows={"10"} name="content"  value={this.state.content} onChange={this.onChangeContentHandler}
                                           class="form-control bg-white border-md border-left-0"/>
                                      </div>

                                          

                                      <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text px-4 border-md border-right-0 account-input-text">
                                              시작일
                                              </span>
                                          </div>
                                          <input id="input-startdate" type="date" name="credit" value={this.state.workingDate} onChange={(e) => this.setState({workingDate: e.target.value})} class="form-control  border-left-0 border-md"/>
                                      </div>
                  <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text px-4 border-md border-right-0 account-input-text">
                                              예상시간
                                              </span>
                                          </div>
                                          <input id="input-workingHour" type="number" name="workingHour" value={this.state.workingHour} onChange={(e) => this.setState({workingHour: e.target.value})} class="form-control  border-left-0 border-md"/>
                                      </div>
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
                                          onKeyPress={this.handleKeyPress} onChange={this.changeKeyword}
                                          />
                                          </div>
                                          <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5 justify-content-center">
                                          <p>키워드 클릭시 삭제</p>
                                      </div>
                                      <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                          <div class="input-group-prepend">
                                              <span class="input-group-text px-4 border-md border-right-0 account-input-text">
                                              크레딧
                                              </span>
                                          </div>
                                          <input id="input-credit" type="number" name="credit" value={this.state.jobCredit} onChange={(e) => this.setState({jobCredit: e.target.value})} class="form-control  border-left-0 border-md"/>
                                      </div>
                                      
                                      <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                          
                                      <Button variant="contained" color="secondary" className={"mx-2"} onClick={this.updateJobHandler}>수정</Button>
                                      <Button variant="contained" color="primary"  onClick={ ()=>this.props.history.goBack()}>취소</Button>

                                      </div>
                                      

      


                                  </Col>
                          </Row>
                      </Container>

       
          </>
      );
  }
}

export default JobUpdate;