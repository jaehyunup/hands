import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"


class FindAccount extends React.Component {
  render() {
    return (
      <div className="item" 
      style={{
        width:'500px',
        height:'500px',
        margin: '100px 50px'
      }}>

      <h3>우리동네 파트너쉽,</h3>
      <p style={{
        fontSize:'50px'
      }}>HANDS</p>
      <div style={{
        marginTop:'50px'
      }}>
        <input placeholder="이름" style={{
          height:'40px',
          width:'300px'
        }}></input>
        <br/>
        <input placeholder="전화번호 ( '-' 빼고 입력해주세요.)" style={{
          height:'40px',
          width:'300px',
          marginTop:'25px'
        }}></input>

        
        <Button variant="secondary"
        style={{
          marginTop:'20px',
          marginLeft:'155px'
        }}
        >
        <Link to="/home/login/findAccountSuccess" 
        style={{
        marginTop:'10px',
        color:'black'
        }}>
          이메일확인하기
        </Link>
        </Button>
        <br/>
      </div>


    </div>
    );
  }
}


export default FindAccount;

