import React from 'react';
import { Link } from "react-router-dom"

function Job ({jobUserUUid, categoryId, content, workingHour, jobCredit, workingAddress, dday}) {
    return(
        <div>
            {/* <img>회원이미지</img> */}
            <p>회원 : {jobUserUUid}</p>
            <p>카테고리 : {categoryId}</p>
            <p>내용 : {content}</p>
            <p>일하는 시간 : {workingHour}</p>
            <p>크레딧 : {jobCredit}</p>
            <p>주소 : {workingAddress}</p>
            <p>D-day : {dday}</p>
            <Link to="/jobDetail">상세보기</Link> 
        </div>
    );
}

export default Job;