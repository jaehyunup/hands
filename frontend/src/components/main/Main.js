import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import main_1 from '../../img/mainimg_1.jpg';
import main_2 from '../../img/mainimg_2.jpg';
import main_3 from '../../img/mainimg_3.jpg';



class Main extends React.Component {
  render() {
    return (
      <div style={{
        width:'1200px',
        height:'650px',
        margin: '100px 100px'
      }}>
        <Carousel  
              style={{
                position:'relative'
              }}
            >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={main_1}
              alt="First slide"
              style={{
                width:'1200px',
                height:'650px',
                opacity: '0.9'
              }}
            />
            <div 
              style={{
                position:'absolute',
                top:'30%',
                left:'60%',
                color:'white'
              }}
            >
              <h1>고양이를 키워보셨나요?</h1>
              <p>고양이도 돌보며, 용돈도 벌어봐요!</p>
            </div>
          </Carousel.Item>
          <Carousel.Item  
              style={{
                position:'relative'
              }}
            >
            <img
              className="d-block w-100"
              src={main_2}
              alt="Third slide"
              style={{
                width:'1200px',
                height:'650px',
                opacity: '0.9',
              }}
            />
            <div  
              style={{
                position:'absolute',
                top:'65%',
                left:'5%',
                color:'white'
              }}
            >
              <h1>자전거? 걸어서도되요!</h1>
              <p>가볍게 운동도하며, 용돈도 벌어봐요!</p>
            </div>

          </Carousel.Item>
          <Carousel.Item  
              style={{
                position:'relative'
              }}
            >
            <img
              className="d-block w-100"
              src={main_3}
              alt="Third slide"
              style={{
                width:'1200px',
                height:'650px',
                opacity: '0.9',
              }}
            />
            <div  
              style={{
                position:'absolute',
                top:'70%',
                left:'60%',
                color:'white'

              }}
            >
              <h1>못하겠다구요 ??</h1>
              <p>핸즈에서 도움을 청해봐요!</p>
            </div>

          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}


export default Main;
