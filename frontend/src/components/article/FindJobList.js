import React from 'react';
import axios from "axios";

class FindJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false, //list가 호출되지 않은 경우 대비
            jobList : [],
            checkbox : '',
            keyword : '', //주소 검색
            minCredit : '',
            maxCredit : '',
            sortKeyword : '',
            dday : '',
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyword = this.handleKeyword.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleDday = this.handleDday.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handlemaxCredit = this.handlemaxCredit.bind(this);
        this.handleminCredit = this.handleminCredit.bind(this);
    }

    loadList = () => {
        console.log("전체 리스트 출력");
        axios
        .get("http://i4d101.p.ssafy.io:8080/job/findJobs")
        .then(res => {
            console.log(res);
            this.jobList = res.data;
        });
    };

    //주소검색 키워드 input 내용 변경될 때
    handleKeyword(event) {
        console.log("검색할 주소 키워드 : " + event.target.value);
        this.setState({
            keyword : event.target.value
        });
    }
    //주소 검색 버튼 눌렀을 때
    handleSearch(event) {
        //검색어 넘겨서
        alert(this.state.keyword);
        //검색어 포함된 데이터들 받아옴
        axios
        .get("http://i4d101.p.ssafy.io:8080/job/findJobsByDong?dong="+this.state.keyword)
        .then(res => {
            console.log("주소 키워드로 검색한 데이터");
            console.log(res);
            this.jobList = res.data;
        });
        
        event.preventDefault(); //클릭후에도 데이터 남아있음
    }

    //credit 검색 범위 정하기 (min, max)
    handleminCredit(event) { 
        this.setState({
            minCredit : event.target.value
        }, (event) => {
            axios
            .get("http://i4d101.p.ssafy.io:8080/job/findJobsByCredit?minValue=" + this.state.minCredit + "&&maxValue=" + this.state.maxCredit)
            .then(res => {
                console.log("크레딧 범위로 검색한 결과");
                console.log(res);
                this.jobList = res.data;
            });
        });
    }

    handlemaxCredit(event) {
        this.setState({
            maxCredit : event.target.value
        }, (event) => {
            //검색어 넘겨서
            //검색어 포함된 데이터들 받아옴
            axios
            .get("http://i4d101.p.ssafy.io:8080/job/findJobsByCredit?minValue=" + this.state.minCredit + "&&maxValue=" + this.state.maxCredit)
            .then(res => {
                console.log("크레딧 범위로 검색한 결과");
                console.log(res);
                this.jobList = res.data;
            });
        });
    }   

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  백엔드랑 얘기할 부분  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    //select로 정렬 (sortKeyword에 따라)
    handleSort(event) {
        this.setState({sortKeyword : event.target.value});
        axios
        .get("http://i4d101.p.ssafy.io:8080/job/SortByCredit?order=Down")
        .then(res => {
            console.log("크레딧순 정렬");
            console.log(res);
            this.jobList = res.data;
        });
    }

    //조회할 기간(dday) 설정하기
    handleDday(event) {
        this.setState({dday : event.target.value},
            () => {
                axios
                .get("http://i4d101.p.ssafy.io:8080/job/findByTimeJob?day="+this.state.dday)
                .then(res => {
                    console.log("디데이로 검색");
                    console.log(res);
                    this.jobList = res.data;
                });
        });
        
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  미완성  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
    //카테고리 선택해서 검색 (체크는 하나만 되도록)
    handleCheckbox(event) {
        const checkboxes = document.getElementsByName("category");
        console.log(checkboxes);
        checkboxes.forEach( (chk)=> {
            chk.checked = false;
        });
        event.target.checked = true;
        this.setState({checkbox : event.target.value},
            () => {
                axios
                .get("http://i4d101.p.ssafy.io:8080/job/findJobsByCategory?category="+this.state.checkbox)
                .then(res => {
                    console.log("카테고리 검색");
                    console.log(res);
                    this.jobList = res.data;
                });
        );
    }

    //!!!!!!!!!!!!!!!!!!! job 컴포넌트로 for문 돌리는거 구현 필요 !!!!!!!!!!!!!!!!!!!!!!
    render() {
        return (
            <div
            className="item"
            style={{
                width: "500px",
                border: "1px solid black",
                margin: "0px 50px",
                marginBottom: "100px",
            }}>
                <div
                    className="item"
                    style={{
                    width: "500px",
                    height: "100px",
                    border: "1px solid black",
                    }}
                >
                    <form onSubmit={this.handleSearch}>
                        <input type="text" value={this.state.keyword} onChange={this.handleKeyword}/>
                        <input type="submit" value="Submit" /> 
                    </form>

                    <label><input type="checkbox" name="category" value="수리" onChange={this.handleCheckbox}/>수리</label>
                    <label><input type="checkbox" name="category" value="학습"  onChange={this.handleCheckbox}/>학습</label>
                    <label><input type="checkbox" name="category" value="기사님" onChange={this.handleCheckbox}/>기사님</label>
                    <label><input type="checkbox" name="category" value="심부름" onChange={this.handleCheckbox}/>심부름</label>
                    <label><input type="checkbox" name="category" value="힘노동" onChange={this.handleCheckbox}/>힘노동</label>
                    <label><input type="checkbox" name="category" value="청소" onChange={this.handleCheckbox}/>청소</label>
                    <label><input type="checkbox" name="category" value="물건보관" onChange={this.handleCheckbox}/>물건보관</label>
                    <label><input type="checkbox" name="category" value="기타" onChange={this.handleCheckbox}/>기타</label>
                    
                    <input type="number" value={this.state.minCredit} onChange={this.handleminCredit}/>
                    <input type="number" value={this.state.maxCredit} onChange={this.handlemaxCredit}/>
                        

                    <select value={this.state.sortKeyword} onChange={this.handleSort}>
                        <option value="">정렬하기</option>
                        <option value="credit">크레딧순</option>
                        <option value="distance">거리순</option>
                    </select>

                    <button value="3" onClick={this.handleDday}>3일 이내</button>
                    <button value="5" onClick={this.handleDday}>5일 이내</button>
                    <button value="7" onClick={this.handleDday}>7일 이내</button>

                </div>
                <div
                    className="item"
                    style={{
                    width: "500px",
                    height: "500px",
                    border: "1px solid black",
                    }}
                >
                </div>
            </div>
        );
    }
}

export default FindJobList;