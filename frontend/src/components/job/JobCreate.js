import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import '../../styles/mypage.css'
import {TextField,Avatar,Button} from '@material-ui/core';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

class JobCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobUserUUid : 'af0ba8e1ed614e809d967c718f11913f', //일단 박아넣음
            jobName : '',
            categoryId : '전체', //ui만들고 value값 받아오기
            content : '',
            workingHour : '',
            jobCredit : 0,
            workingDate : '',
            workingAddress : '',
            status : '거래전',
            isdaumpost : false,
            fullAddress : '',
            detailAddress : '',
            zoneCode : ''
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


    handleSubmit = async (event) => {
        alert("axios!!");
        event.preventDefault();
        await this.handleWorkingAddress();
        console.log(this.state);
        const body = {
            jobName : this.state.jobName,
            jobUserUUid : this.state.jobUserUUid,
            categoryId : '수리',
            content : this.state.content,
            workingHour : this.state.workingHour,
            jobCredit : this.state.jobCredit,
            workingDate : this.state.workingDate,
            workingAddress : '경상북도 구미시 진평동',
            status : this.state.status,
        }
        console.log(body);
        axios.post(
            'http://i4d101.p.ssafy.io:8080/job/insertJob',
            JSON.stringify(body),
            {headers:{
                'Content-Type': 'application/json'
            }})
        .then((res)=>{
            alert("성공")
        })
        .catch(error => {
            alert(error)
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
									    	<input id="input-jobName" type="text" name="jobName" value={this.state.jobName} placeholder="" class="form-control  border-left-0 border-md"/>
										</div>
							
										<div class="input-group col-lg-12 mb-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="account-input-text input-group-text px-3 border-md border-right-0">
                                                카테고리
                                                </span>
                                            </div>
                                            <select id="input-category" type="text" name="category"  value={this.state.category} class="form-control  border-md border-left-0">
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
                                            <input id="input-address" type="text" name="address" value={this.state.fullAddress} onFocus={this.toggleDaumDiv} placeholder="" class="form-control bg-white border-md border-left-0"/>
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
                                            <textarea id="input-contents" rows={"10"} name="content"  value={this.state.content} class="form-control bg-white border-md border-left-0"/>
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
                                                크레딧
                                                </span>
                                            </div>
									    	<input id="input-credit" type="number" name="credit" value={this.state.jobCredit} onChange={(e) => this.setState({jobCredit: e.target.value})} class="form-control  border-left-0 border-md"/>
										</div>
                                        
                                        <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                            
                                        <Button variant="contained" color="secondary" className={"mx-2"} onClick={this.createJobHandler}>작성</Button>
                                        <Button variant="contained" color="primary"  onClick={ ()=>this.props.history.goBack()}>취소</Button>

                                        </div>
                                        

        


                                    </Col>
							</Row>
						</Container>

         
            </>
        );
    }
}

export default JobCreate;
