import React from 'react';
import axios from 'axios';
import { Row,Col,Tabs,Tab, Container } from 'react-bootstrap';
import '../../styles/mypage.css'
import {Avatar,Button} from '@material-ui/core';

class ReviewCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userUuid: '31b6c1ea100e4934b3969af8b49ed370',//this.props.logied.userUuid,
            contractId : 12,//this.props.contractId,
            reviewContent: '',
            score: null,
            imgs : undefined,
            avatarurl:"https://avatars.dicebear.com/4.5/api/male/"+Math.floor(Math.random() * 500)+".svg"
        };
    }

    createJobHandler = async (e) => {
        e.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        if(this.state.imgs){
                for(let i=0; i<this.state.imgs.length; i++){
                await formData.append("imgs", this.state.imgs[i]);
            }
        }
        console.log(formData);
        await formData.append("userUuid",this.state.userUuid);
        await formData.append("reviewContent",this.state.content);
        await formData.append("score",this.state.score);
        await formData.append("contractId",this.state.contractId);
        axios
        .post('http://172.30.1.51:8001/review/review/', formData, {headers : {'Content-Type' : 'multipart/form-data'}})
        .then(res => console.log(res))
        .catch(e=>alert(e))
    }

    handleScore = (e) => {
        this.setState({
            score : e.target.value
        })
    }
    handleContent = (e) => {
        this.setState({
            content : e.target.value
        })
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
                                                        <Avatar src={this.state.avatarurl}
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
                                            <select id="input-category" type="text" name="category"  value={this.state.category} class="form-control  border-md border-left-0" onChange={this.handleScore}>
                                                <option value='0'>☆☆☆☆☆</option>
                                                <option value='1'>★☆☆☆☆</option>
                                                <option value='2'>★★☆☆☆</option>
                                                <option value='3'>★★★☆☆</option>
                                                <option value='4'>★★★★☆</option>
                                                <option value='5'>★★★★★</option>
                                            </select>
                              </div>
                           

                                    

                                        <div class="input-group col-lg-12 mb-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="account-input-text input-group-text px-4 border-md border-right-0">
                                                내용
                                                </span>
                                            </div>
                                            <textarea id="input-contents" rows={"10"} name="content"  value={this.state.content} class="form-control bg-white border-md border-left-0" onChange={this.handleContent}/>
                              </div>

                                            

                                        <div class="input-group col-sm-12 col-mg-12 col-lg-12 my-4 px-5">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text px-3 mr-3 border-md border-right-0 account-input-text">
                                                이미지
                                                </span>
                                            </div>
                                            <div>
                                             <input className={"mt-1 form-controll"} type="file" multiple style={{fontSize:"0.8rem"}} onChange={e=>{this.setState({imgs : e.target.files})}}/>
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