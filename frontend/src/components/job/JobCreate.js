import React from 'react';
import { Link, Router } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import '../../styles/mypage.css'
import {TextField,Avatar,Button} from '@material-ui/core';
import { connect } from 'react-redux';

class JobCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobId : '',
            jobUserUUid : '',
            jobName : '',
            categoryId : '전체',
            content : '',
            workingHour : 0,
            jobCredit : 0,
            workingDate : '',
            workingAddress : '',
            status : '거래전',
            isdaumpost : false,
            fullAddress : '',
            detailAddress : '',
            zoneCode : '',
            keywords : [],
            keyword :'',
        };

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
            workingAddress: AllAddress,
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
    showtag = (tag) => {
        return ( `<p> {tag} </p>` )
    }

    insertTag = (e) => {
        console.log(e.key, e.target.value);
        if(e.key === 'Enter'){
            this.setState({
                keywords : this.state.keywords.concat(e.target.value)
            });
            e.target.value = '';
            
            // 하나씩 돔 생성
            this.showtag(e.target.value);
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);
        const body = {
            jobName : this.state.jobName,
            jobUserUUid : this.state.jobUserUUid,
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
                    this.props.history.push("/findjob");
            })
            .catch(error => {
                console(error)
            })
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
        const postCodeStyle = {
            position: "absolute",
            top: 0,
            zIndex: "100",
            border: "1px solid #000000",
            overflow: "hidden"
        }
        const {keywords} = this.state;
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
                                  <input id="input-jobName" type="text" name="jobName" value={this.state.jobName} placeholder="" class="form-control  border-left-0 border-md" onChange={(e) => this.setState({jobName: e.target.value})} />
                              </div>
                     
                              <div class="input-group col-lg-12 mb-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="account-input-text input-group-text px-3 border-md border-right-0">
                                                카테고리
                                                </span>
                                            </div>
                                            <select id="input-category" type="text" name="category"  value={this.state.categoryId} class="form-control  border-md border-left-0" onChange={(e) => this.setState({categoryId: e.target.value})}>
                                                <option value="전체"></option>
                                                <option value="펫">펫</option>
                                                <option value="수리">수리</option>
                                                <option value="학습">학습</option>
                                                <option value="기사님">기사님</option>
                                                <option value="심부름">심부름</option>
                                                <option value="힘노동">힘노동</option>
                                                <option value="청소">청소</option>
                                                <option value="물건보관">물건보관</option>
                                                <option value="기타">기타</option>
                                            </select>
                              </div>
                           


                                        <div class="input-group col-lg-12 mb-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text px-3 border-md border-right-0 account-input-text">
                                                활동지역
                                                </span>
                                            </div>
                                            <input id="input-address" type="text" name="address" value={this.state.workingAddress} onFocus={this.toggleDaumDiv} placeholder="" class="form-control bg-white border-md border-left-0"/>
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
                                            <textarea id="input-contents" rows={"10"} name="content"  value={this.state.content} class="form-control bg-white border-md border-left-0"  onChange={(e) => this.setState({content: e.target.value})}/>
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
                                                일하는 시간
                                                </span>
                                            </div>
                                  <input id="input-credit" type="number" name="credit" value={this.state.workingHour} onChange={(e) => this.setState({workingHour: e.target.value})} class="form-control  border-left-0 border-md"/>
                              </div>

                                        <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text px-4 border-md border-right-0 account-input-text">
                                                크레딧
                                                </span>
                                            </div>
                                  <input id="input-credit" type="number" name="credit" value={this.state.jobCredit} onChange={(e) => this.setState({jobCredit: e.target.value})} class="form-control  border-left-0 border-md"/>
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
                                            
                                        <Button variant="contained" color="secondary" className={"mx-2"} onClick={this.handleSubmit}>작성</Button>
                                        <Button variant="contained" color="primary"  onClick={ ()=>this.props.history.goBack()}>취소</Button>

                                        </div>


                                    </Col>
                     </Row>
                  </Container>


            </>
        );
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

JobCreate = connect(mapStateToProps) (JobCreate);
export default JobCreate;