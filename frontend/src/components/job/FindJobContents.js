import React from 'react';
import axios from 'axios';
import {Button,Container,Row,Col} from 'react-bootstrap';
import {OutlinedInput,InputLabel,MenuItem,Select,FormControl,Fab} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { mapJoblist } from '../../actions';


class FindJobContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList : [],
            outputJobList : [],
            dong : "",
            category: "전체",
            minCredit: 0,
            maxCredit: 1000000,
            dday: "전체",
            searchHashTag: "",
        };

    }

    initDday() {
        if(this.state.dday === '전체') {
            return '100';
        }else {
            return this.state.dday;
        }
    }
    CategoryChange = (e) => {
        this.setState({
            category:e.target.value
        });
    }
    DdayChange = (e) => {
        this.setState({
            dday:e.target.value
        }); 
    }
    hashtagChange = async(e) => {
        console.log(e.target.value);
        console.log(this.state.jobList);
        for(var i=0; i<this.state.jobList.length; i++){
            if(this.state.jobList[i].hashtag === undefined) continue;
            for(var j=0; j<this.state.jobList[i].hashtag.length; j++){
                if(e.target.value === this.state.jobList[i].hashtag[j]){
                    this.setState({
                        outputJobList : this.state.outputJobList.push(this.state.jobList[i])
                    });
                }
            }
        }
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

    clickInfo = (e)=>{
        this.props.history.push('/job/2343')
    }
  

    loadList = async () => {
        this.setState({
            dong : this.props.currentlocation
        });
        console.log("전체 리스트 출력");
        const body = {
            dong : this.props.currentlocation,
            category: this.state.category,
            minCredit: this.state.minCredit,
            maxCredit: this.state.maxCredit,
            dday: this.initDday()
        }
        console.log(body);
        axios
        .post("http://i4d101.p.ssafy.io:8080/job/totalSearch",JSON.stringify(body),
        {headers:{
            'Content-Type': 'application/json'
        }})
        .then(res => {
            console.log(res);
            this.setState({
                jobList : res.data,
                outputJobList : res.data,
            } );
            for(var i=0; i<this.state.jobList.length; i++){
                var jobid = this.state.jobList[i].jobId;
                axios
                .get("http://i4d101.p.ssafy.io:8080/keyword/job/keywords?jobId="+jobid)
                .then(response => {

                    for(var i = 0; i < this.state.jobList.length; i++) {
                        if(this.state.jobList[i].jobId === response.data.jobId) {
                            var obj = this.state.jobList[i];
                            obj.hashtag = response.data.keywords;
                            var jobTmpList = this.state.jobList;
                            jobTmpList[i] = obj;
                            this.setState({
                                jobList : jobTmpList
                            })
                            break;
                        }
                    }
                    console.log(this.state.jobList);

                })
                .catch(e => {
                    console.error(e);
                })

            }
        })
        .catch(e => {
            console.error(e);
        });
    };

    // props가 변경되면 실행되는 lifecycle 함수
    // static getDerivedStateFromProps(prevState, nextProps) {
    //     console.log("getderived~~", prevState, nextProps);
    //     if (prevState.currentlocation !== nextProps.dong) {
    //         console.log("if문");
    //         c.loadList();
    //     }
        
    //     return null;
    // }

    //component update된 후 실행되는 lifecycle함수
    componentDidUpdate(prevState, nextProps) {
        if (prevState.currentlocation !== nextProps.dong) {
            console.log("if문");
            this.loadList();
        }
        this.props.joblistpass(this.state.outputJobList);
    }

    render() {
        const {outputJobList} = this.state;
        console.log("render", this.props.currentlocation);
        return (
             <Container fluid className={"px-5 py-1 vh-100"}>
                 <Row dFlex alignItemsStart>
                    <Col md={12} lg={12} className="px-0 mx-0 mt-0">
                        <h6>200개 이상의 일거리</h6>
                        <h4>{this.props.currentlocation} 근처 일거리</h4>
                    </Col>
                    <Col md={12} lg={12} className="pt-4">
                        <Row>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="mincredit-placeholder">최소크레딧</InputLabel>
                                <OutlinedInput labelId="mincredit-placeholder" label="최소크레딧" id="input-mincredit" value={this.state.minCredit} onChange={this.minCreditChange}/>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="mincredit-placeholder">최대크레딧</InputLabel>
                                <OutlinedInput labelId="mincredit-placeholder" label="최대크레딧" id="input-maxcredit" value={this.state.maxCredit} onChange={this.maxCreditChange}/>
                            </FormControl>
                        
                            
                        </Row>
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
                                    <MenuItem value="펫">펫</MenuItem>
                                    <MenuItem value="수리">수리</MenuItem>
                                    <MenuItem value="학습">학습</MenuItem>
                                    <MenuItem value="기사님">기사님</MenuItem>
                                    <MenuItem value="심부름">심부름</MenuItem>
                                    <MenuItem value="힘노동">힘노동</MenuItem>
                                    <MenuItem value="청소">청소</MenuItem>
                                    <MenuItem value="물건보관">물건보관</MenuItem>
                                    <MenuItem value="기타">기타</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="dday-placeholder">날짜</InputLabel>
                                <Select
                                    labelId="dday-select-label"
                                    id="dday-select-outlined"
                                    value={this.state.dday}
                                    onChange={this.DdayChange}
                                    label="날짜">
                                    <MenuItem value="전체">전체</MenuItem>
                                    <MenuItem value="3">3일이내</MenuItem>
                                    <MenuItem value="7">7일이내</MenuItem>
                                    <MenuItem value="14">14일이내</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <Fab size="small" color="secondary">
                                    <SearchIcon size={"extended"} onClick={this.loadList}></SearchIcon>
                                </Fab>
                            </FormControl>
                            <FormControl size="small" margin='dense' variant="outlined" className="mx-2">
                                <InputLabel shrink htmlFor="hashtag-placeholder">해시태그</InputLabel>
                                <OutlinedInput labelId="hashtag-placeholder" id="input-hashtag-outlined" value={this.state.searchHashtag} onChange={this.hashtagChange}/>
                            </FormControl>
                        </Row> 

                       

                        <Row>
                            <Col md={12} lg={12} className={"mt-4 px-4"} style={{maxHeight:"30rem",overflow:"scroll"}}>
                                {outputJobList.map( (job, index) => {
                                   return(
                                        <div className={"row d-flex joblist align-items-center"}>
                                            <div className={"col-md-2 col-sm-2 ml-0 pl-1"}>
                                                <img width={"60"} height={"60"} alt={"jobImage"} src={"https://source.unsplash.com/random"}/>
                                            </div>
                                  
                                            <div className={"col-md-6 col-sm-6"}>
                                                <div className={"article"}>
                                                    <div>
                                                        <div className={"articleheader"}>{job.workingAddress}</div>
                                                        <div className={"articlesubheader"}>{job.jobName}</div>
                                                        <div className={"articleHashTagDiv"}>
                                                            {
                                                                job.hashtag !== undefined
                                                                ? job.hashtag.map( tag => {return <p className={"btn btn-danger"}>#{tag}</p>} )
                                                                : null
                                                            }
                                                        </div>
                                                        <div className={"articlebody"}>{job.jobCredit}</div>
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
                                                            <DateRangeIcon style={{fontSize: "1rem"}}></DateRangeIcon> {job.workingDate}
                                                        </div>
                                                        <div className={"job-hour"}>
                                                            <HourglassEmptyIcon style={{fontSize: "1rem"}}></HourglassEmptyIcon> {job.workingHour}시간 근무
                                                        </div>
                                                        <div className={"job-dday"}>
                                                            <AvTimerIcon style={{fontSize: "1rem"}}></AvTimerIcon> {job.dday}일 남음
                                                        </div>
                                                        <div className={"job-user"}>
                                                            <PersonIcon style={{fontSize: "1rem"}}></PersonIcon> {job.userName}
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </Col>
                        </Row>
                    </Col>
                 </Row>
            
             </Container>
        )
    };
}

const mapStateToProps = (state) => {
    return {
      currentlocation: state.currentlocation
  }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        joblistpass: (list) => { dispatch(mapJoblist(list)) }
    }
}



FindJobContents = connect(mapStateToProps ,mapDispatchToProps) (FindJobContents);
export default withRouter(FindJobContents);
