import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

class JobCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jobUserUUid : 'af0ba8e1ed614e809d967c718f11913f', //일단 박아넣음
            jobName : '',
            categoryId : '전체', //ui만들고 value값 받아오기
            content : '',
            workingHour : '',
            jobCredit : '',
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
    }

    handleInput = (e) => {
        console.log('handleinput');
          this.setState({
            detailAddress : e.target.value
          })
    }
    
    handleWorkingAddress = async() => {
        await this.handleAddress();
        console.log("찐주소 : " + this.fullAddress + this.detailAddress);
        this.setState({
            workingAddress : this.fullAddress + this.detailAddress
        })
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
            <form onSubmit={this.handleSubmit}>
                
                <input placeholder="게시글 제목" value={jobName} onChange={(e) => this.setState({jobName: e.target.value})} />
            
                <select value={categoryId} onChange={(e) => this.setState({categoryId: e.target.value})}></select>

                <textarea cols="50" rows="10" placeholder="내용을 입력하세요" value={content} onChange={(e) => this.setState({content: e.target.value})}></textarea>
                
                <label>크레딧 : <input type="number" value={jobCredit} onChange={(e) => this.setState({jobCredit: e.target.value})}/></label>
                
                <label>일하는 시간 : <input type="number" value={workingHour} onChange={(e) => this.setState({workingHour: e.target.value})}/></label>

                <label>일하는 날짜 : <input type="date" value={workingDate} onChange={(e) => this.setState({workingDate: e.target.value})}/></label>

                <div>
                    <div className="zipCode">{zoneCode}</div>
                    <input type="button" onClick={this.handleOpenPost} value="우편번호 찾기"/>
                    {
                        isdaumpost 
                        ? <DaumPostcode
                            onComplete={this.handleAddress}
                            autoResize
                            autoClose
                            width={600}
                            height={450}
                            style={postCodeStyle}
                            isdaumpost={isdaumpost}
                            />
                        : null
                    }
                    <div className="address">{fullAddress}</div>
                      <div className="addressBox">
                          <input type="text" value={detailAddress} name="address" onChange={this.handleInput}/>
                      </div>
                </div>
                <button type="submit">생성하기</button>

            </form>
        );
    }
}

export default JobCreate;
