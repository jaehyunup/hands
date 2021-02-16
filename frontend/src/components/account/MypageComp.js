import React from 'react';
import { Link } from "react-router-dom"
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import MainHeader from '../header/MainHeader'
import '../../styles/mypage.css'
import {Avatar,Button} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';

import DaumPostcode from 'react-daum-postcode';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

class MypageComp extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			key: 'home',
			userId:'test@naver.com',
			nickname:'nickname',
			phone:'01020355889',
			address:'경상북도 구미시 인동동 인동중앙로5길 28-15',
			isdaumpost:false,
			isPhoneClick:false,
			isNickNameClick:false,
			changedNickname:'',
			avatarurl:"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"
		};
		
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
        this.setState ({
            address: AllAddress,
            zoneCode : zoneCodes
        })
    }
	toggleNickNameClick= (e) =>{
		this.setState({
			isNickNameClick : !this.state.isNickNameClick
		  })
		if(this.state.isNickNameClick){ //클릭된 상태라면
			e.target.innerHTML="수정"
		}else{
			e.target.innerHTML="취소"
		}
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
		if(this.state.isPhoneClick){ //클릭된 상태라면
			e.target.innerHTML="수정"
		}else{
			e.target.innerHTML="취소"
		}
	}
	phoneCloseClick= () =>{
		this.setState({
			isPhoneClick : false
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
	deleteJob =(e)=>{
		console.log(e.currentTarget.value)
		// delete 요청 바로날리기
	}

	moveUpdatePage =(e)=>{
		console.log(e.currentTarget.value)
		// currentTarget.value = job id 키, 이걸로 수정 페이지 routing 하면됌
	}
	insertReview = (e)=>{
		console.log(e.currentTarget.value)
	}

    render() {
		const rows = [ // 행 정의(실제 데이터 json)
			{ id: '8061dee0-c9da-4c1a-a171-0de61c0e383d', categoryId: '펫', jobName: '우리집 강아지 산책시켜주세요', jobCredit: '3000',status:'거래전',jobRegdate:'2021-02-13T17:59:58.000+00:00' },
			{ id: '8bf2ba6d-64a2-4591-b335-30529fc2f803', categoryId: '심부름', jobName: '고구마좀 사다주세요', jobCredit: '2000',status:'거래전',jobRegdate:'2021-02-15T17:59:58.000+00:00' },

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
							<Link to={"/job/detail/"+ji}>
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
									<Button
									variant="contained"
									color="secondary"
									size="small"
									style={{marginRight:"4px"}}
									value={params.getValue('id')}
									onClick={this.moveUpdatePage}
									>
									수정

									</Button>
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
										<input id="username" type="text" name="username" value={this.state.userId} placeholder="" class="form-control bg-white border-left-0 border-md" disabled/>
										</div>
							
										<div class="input-group col-lg-12 mb-4 px-5">
										<div class="input-group-prepend">
											<span class="account-input-text input-group-text bg-white px-4 border-md border-right-0">
											닉네임
											</span>
										</div>
										<input id="nickname" type="text" name="nickname"  value={this.state.nickname} class="form-control bg-white border-md border-left-0" disabled/>
										<Button variant="contained" color="primary" onClick={this.toggleNickNameClick}>수정</Button>
									
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
															value={this.state.changedNickname} onChnage={this.nickNameChangeHandler} class="form-control bg-white border-md border-left-0"/>
														<Button variant="contained" color="secondary" >확인</Button>

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

										<input id="phone" type="tel" name="phone" value={this.state.phone} placeholder="" class="form-control bg-white border-md border-left-0" disabled/>
										<Button variant="contained" color="primary" onClick={this.togglePhoneClick}>수정</Button>
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
															value={this.state.changedNickname} onChnage={this.nickNameChangeHandler} class="form-control bg-white border-md border-left-0"/>
														<Button variant="contained" color="secondary" >확인</Button>

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
										<input id="address" type="text" name="address" value={this.state.address} placeholder="" class="form-control bg-white border-md border-left-0" disabled/>
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

										
								<p className={"mt-5 tabInnerDivHeader"}>내 크레딧</p>
								<Col className={"tabInnerDiv pb-3"} style={{textAlign:"right"}} md={12} lg={12}>
									<div class="d-flex justify-content-center align-item-center my-2 px-5">
										<div class={"d-flex justify-content-center align-item-center pt-2"}>
											<MonetizationOnRoundedIcon style={{marginTop:"2rem",fontSize:"3.4rem"}}/> <p style={{fontSize:"2rem",marginLeft:"15px",marginTop:"2.2rem",display:"inline-block"}}>23248 크레딧</p>
										</div>
									</div>
									<Button variant="contained" color="secondary" onClick={this.Addcredit}>크레딧 충전</Button>
									<Button className={"mx-2"} variant="contained" color="link" onClick={this.Addcredit}>크레딧 환전</Button>

								</Col>

								<p className={"mt-5 tabInnerDivHeader"}>회원탈퇴신청</p>
								<Col className={"tabInnerDiv "} md={12} lg={12}>
									<div class="input-group justify-content-center align-item-center col-sm-12 col-mg-12 col-lg-12 my-2 px-5">
										<p style={{marginTop:"12px"}}>회원탈퇴를 신청할 경우 다시 되돌릴 수 없습니다</p>
										<Button style={{position:"absolute",right:70,top:6}} variant="contained" color="warning" onClick={this.joinOut}>회원탈퇴</Button>
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
									<DataGrid rows={rows} columns={columns} pageSize={5} />
								</div>
							</Col>
						</Row>
						</Container>
					</Tab>
					<Tab eventKey="contact" title="내 근무내역">
						<Container fluid>

							<Row style={{paddingTop:"3rem",paddingBottom:"3rem"}}>
								<p className={"tabInnerDivHeader"}>내가 수행한 일거리</p>
								<Col className={"tabInnerDiv p-2"} md={12} lg={12}>
									<div className={"my-2"} style={{height: 400,width: '100%' }}>
										<DataGrid rows={rows} columns={columns} pageSize={5} />
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
}export default MypageComp;