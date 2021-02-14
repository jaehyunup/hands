import React from 'react';
import {Button,Image,Container,Row,Col,Form} from 'react-bootstrap';
import {OutlinedInput,FilledInput,TextField,InputLabel,MenuItem,Select,FormControl,Fab} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import jobImage from '../../img/logo.png';
import PersonIcon from '@material-ui/icons/Person';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InfoIcon from '@material-ui/icons/Info';

class FindJobContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalFlag: false,
          category:"전체",
          date:"전체",
          minCredit:0,
          maxCredit:0,
        };
    }
    CategoryChange = (e) => {

        this.setState({
            category:e.target.value
        });
    }
    DateChange = (e) => {

        this.setState({
            date:e.target.value
        });
    }
    minCreditChange = (e)=>{
        this.setState({
            minCredit: e.target.value
        });
    }
    maxCreditChange = (e)=>{
        this.setState({
            maxCredit: e.target.value
        });
    }
  
    render() {
        return (
            <>
             <Container fluid className={"px-5 py-1 vh-100"}>
                 <Row dFlex alignItemsStart>
                    <Col md={12} lg={12} className="px-0 mx-0 mt-0">
                        <h6>200개 이상의 일거리</h6>
                        <h4>구미시 진평동 근처 일거리</h4>
                    </Col>
                    <Col md={12} lg={12} className="pt-4">
                        <Row>  
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="category-placeholder">카테고리</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select-outlined"
                                    value={this.state.category}
                                    onChange={this.CategoryChange}
                                    label="카테고리">
                                    <MenuItem value="전체">전체</MenuItem>
                                    <MenuItem value="돌보기">돌보기</MenuItem>
                                    <MenuItem value="심부름">심부름</MenuItem>
                                    <MenuItem value="반려동물">반려동물</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="dday-placeholder">날짜</InputLabel>
                                <Select
                                    labelId="dday-select-label"
                                    id="dday-select-outlined"
                                    value={this.state.date}
                                    onChange={this.DateChange}
                                    label="카테고리">
                                    <MenuItem value="전체">전체</MenuItem>
                                    <MenuItem value="3">3일이내</MenuItem>
                                    <MenuItem value="10">10일이내</MenuItem>
                                    <MenuItem value="15">15일이내</MenuItem>
                                </Select>
                            </FormControl>
                        </Row>

                        <Row>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="mincredit-placeholder">최소크레딧</InputLabel>
                                <OutlinedInput labelId="mincredit-placeholder" label="최소" id="input-mincredit" value={this.state.minCredit} onChange={this.minCreditChange}/>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="mincredit-placeholder">최대크레딧</InputLabel>
                                <OutlinedInput labelId="mincredit-placeholder" label="최대" id="input-maxcredit" value={this.state.maxCredit} onChange={this.maxCreditChange}/>
                            </FormControl>
                            
                        </Row>

                        <Row>
                            <Col md={12} lg={12} className={"mt-4 px-4"} style={{maxHeight:"30rem",overflow:"scroll"}}>
                               
                                <div className={"row d-flex joblist align-items-center"}>
                                    <div className={"col-md-2 col-sm-2 ml-0 pl-1"}>
                                        <img width={"60"} height={"60"} alt={"jobImage"} src={"https://source.unsplash.com/random"}/>
                                    </div>
                                    <div className={"col-md-6 col-sm-6"}>
                                        <div className={"article"}>
                                            <div>
                                                <div className={"articleheader"}>구미시 인동중앙로5길 28-15</div>
                                                <div className={"articlesubheader"}>우리 고양이랑 놀아주실분</div>
                                                <div className={"articleHashTagDiv"}>
                                                    <p className={"btn btn-danger"}>#힘</p>
                                                    <p className={"btn btn-danger"}>#강아지</p>
                                                    <p className={"btn btn-danger"}>#고양이</p>
                                                    <p className={"btn btn-danger"}>#심부름</p>
                                                </div>
                                                <div classNmae={"articlebody"}>3000원</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-md-1 col-sm-2 mr-auto justify-content-right"}>
                                        <Button variant="outline-primary" style={{height:"40%",fontSize:"0.2rem"}}>정보</Button>{' '}
                                        <Button variant="outline-info" className={"mt-2"} style={{height:"40%",fontSize:"0.2rem"}}>위치</Button>

                                    </div>
                                    <div className={"col-md-3 col-sm-3"}>
                                        <div className={"articledata"}>
                                                <div className={"job-date"}>
                                                    <DateRangeIcon style={{fontSize: "1rem"}}></DateRangeIcon> 2021.02.25
                                                </div>
                                                <div className={"job-hour"}>
                                                    <HourglassEmptyIcon style={{fontSize: "1rem"}}></HourglassEmptyIcon> 2시간 근무
                                                </div>
                                                <div className={"job-dday"}>
                                                    <AvTimerIcon style={{fontSize: "1rem"}}></AvTimerIcon> 8일 남음
                                                </div>
                                                <div className={"job-user"}>
                                                    <PersonIcon style={{fontSize: "1rem"}}></PersonIcon> 갓동민
                                                </div>
                                        </div>
                                    </div>
                                </div>


                                
                                

                            </Col>
                        </Row>
                    </Col>
                 </Row>
            
             </Container>
            </>
        )
    };
};
export default FindJobContents;