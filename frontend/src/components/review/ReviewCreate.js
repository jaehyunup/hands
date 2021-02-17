import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import '../../styles/mypage.css'
import {TextField,Avatar,Button} from '@material-ui/core';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

class ReviewCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userUuid: this.props.userUuid,
            targetUuid: this.props.targetUuid,
            reviewContent: "",
            score: 0,
        };
    }

    render() {
        return(

            <>
            	<Container style={{paddingLeft:"10%",paddingRight:"10%"}}>
							<Row style={{paddingTop:"3rem",paddingBottom:"3rem",paddingRight:"5rem",paddingLeft:"5rem"}}>
								<p className={"tabInnerDivHeader"}>리뷰 작성</p>
								<Col className={"tabInnerDiv p-2 pt-3"} md={12} lg={12}>	
                                        <Row className={"d-flex justify-content-center"}>
                                            <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                                                <div>
                                                        <Avatar src={"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"} 
                                                        alt={"아바타"} style={{width: '60px', height:'60px',marginLeft:20,marginRight: 0, display: 'inline-block', verticalAlign: 'middle'}}/>
                                                        
                                                </div>
                                                <div>
                                                    <h4 style={{margin: '20px'}}>
                                                    구미왕자<p style={{marginTop:"10px"}}>"저랑 거래하니까 어떠신가요?"</p>             
                                                    </h4>
                                                </div>
                                            </div>
                                        </Row>
                                    

										<div class="input-group col-lg-12 mt-4 mb-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="account-input-text input-group-text px-4 border-md border-right-0">
                                                평점
                                                </span>
                                            </div>
                                            <select id="input-category" type="text" name="category"  value={this.state.category} class="form-control  border-md border-left-0">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
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
                                                <span class="input-group-text px-3 mr-3 border-md border-right-0 account-input-text">
                                                이미지
                                                </span>
                                            </div>
                                            <div>
                                             <input className={"mt-1 form-controll"} type="file" multiple style={{fontSize:"0.8rem"}}/>
                                            </div>
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

export default ReviewCreate;
