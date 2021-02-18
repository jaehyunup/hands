import React from 'react';
import axios from 'axios';
import {Button,Container,Row,Col} from 'react-bootstrap';
import {Divider,OutlinedInput,InputLabel,MenuItem,Select,FormControl,Fab} from '@material-ui/core';
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
        console.log("loadList")

        this.setState({
            dong : this.props.currentlocation
        });
        
        const body = {
            dong : this.props.currentlocation+" "+this.props.currentlocation+" "+this.props.currentlocation,
            category: this.state.category,
            minCredit: this.state.minCredit,
            maxCredit: this.state.maxCredit,
            dday: await this.initDday()
        }

        console.log(body)

        await axios
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
        })
        if (this.state.jobList) {

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
            })
        }}
       

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
    // componentDidUpdate(prevState, nextProps) {
    //     if (prevState.currentlocation !== nextProps.dong) {
    //         console.log("if문");
    //         this.loadList();
    //     }
    //     this.props.joblistpass(this.state.outputJobList);
    // }
    async componentDidUpdate(prevState,prevProps) {
        // if (prevProps.currentlocation !== this.props.currentlocation) {
        //     console.log("if문");
        //     await this.loadList();
        // }
        // this.props.joblistpass(this.state.outputJobList);
    }

    moveJobDetail = (e) =>{
        this.props.history.push("/job/"+e.currentTarget.value)
    }
    // 요청 여부 확인
    checkContract = async props => {
        const check_Info = {
            contractJobId:props,
            handy:this.props.userUuid,
        }
        const _data = await axios.post("http://i4d101.p.ssafy.io:8080/contract/check",
                                    JSON.stringify(check_Info),
                                    {headers:{
                                        'Content-Type': 'application/json',
                                        'X-AUTH-TOKEN': this.props.logintoken
                                    }})
        // console.log('_data : ',_data.data.message)
        if (_data.data.message=="YES") {
            console.log(true)
            return true
        }
        else {
            console.log(false)
            return false
        }
        // return _data.data.message
    }

    render() {
        if (this.props.currentlocation) {
            if (!this.state.dong) {
                this.loadList()
            }
            else if (this.props.currentlocation != this.state.dong) {
                this.loadList()
            }
            
        }

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

                       

                        <Row className={"noscrollbar"}>
                            <Col md={12} lg={12} className={"noscrollbar mt-1 ml-0 pl-0"} style={{border:"none",mabackgroundColor:"#fff",maxHeight:"27rem",overflow:"scroll"}}>
                                
                                {outputJobList.map( (job, index) => {
                                    // const iscontract =  this.checkContract(job.jobId)
                                   return(
                                       <>
                                       <div class="mycar">
                                            <div class="description">
                                                <h4>{job.workingAddress}</h4>
                                                <h2>{job.jobName}</h2>
                                                {
                                                                job.hashtag !== undefined
                                                                ? job.hashtag.map( tag => {return <button className={"mt-1 mr-1 btn btn-sm btn-danger"}>#{tag}</button>} )
                                                                : null
                                                            }
                                                <h1>{job.jobCredit} 크레딧</h1>
                                            </div>
                                            <div class="jobData">
                                                                <div className={"job-date"}>
                                                                    <DateRangeIcon className={"mr-2"} style={{fontFamily:"gmarket-300",fontWeight:"400",fontSize: "0.8rem"}}></DateRangeIcon>{job.workingDate}
                                                                </div>
                                                                <div className={"job-hour"}>
                                                                    <HourglassEmptyIcon className={"mr-2"} style={{fontSize: "0.8rem"}}></HourglassEmptyIcon>{job.workingHour}시간 근무
                                                                </div>
                                                                <div className={"job-dday"}>
                                                                    <AvTimerIcon className={"mr-2"} style={{fontSize: "0.8rem"}}></AvTimerIcon>{job.dday}일 남음
                                                                </div>
                                                                <Button className={"mt-3"} variant="outline-primary" style={{fontFamily:"gmarket-700",width:"100%",height:"30%",fontSize:"0.9rem"}} value={job.jobId} onClick={this.moveJobDetail}>상세보기</Button>

                                            </div>
                                        </div>
                                        <Divider />

                                    </>
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
    if (state.logined) {
        return {
            userUuid:state.logined.userUuid,
            id : state.logined.id,
            logintoken: state.token,
            currentlocation: state.currentlocation
        }
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        joblistpass: (list) => { dispatch(mapJoblist(list)) }
    }
}



FindJobContents = connect(mapStateToProps ,mapDispatchToProps) (FindJobContents);
export default withRouter(FindJobContents);
