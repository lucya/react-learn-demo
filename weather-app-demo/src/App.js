import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const API_KEY = 'c0e3e61bc552ba9f247ee5289f1b3974';
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const res = await axios({
          method: 'get',
          url: url

        });
        console.log(res);

        setResult(res.data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          alert('입력한 도시명을 확인해주세요.');
        } else {
          alert(error.response.status + ' : ' + error.response.statusText);
        }

      }
    }
  }

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder='도시를 입력하세요'
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchWeather}
        />
        {
          Object.keys(result).length !== 0 &&

          <ResultWrap>
            <div className="city">{result.name}</div>
            <div className='temperature'>
              {Math.round(((result.main.temp - 273.15) * 10)) / 10} ℃
            </div>
            <div className='sky'>{result.weather[0].main}</div>
          </ResultWrap>
        }
      </div>
    </AppWrap>
  );
}

export default App;


const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap{
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  input{
    padding: 16px;
    border: 2px black solid;
    border-radius: 16x;
  }
`;

const ResultWrap = styled.div`
 margin-top: 60px;
 padding: 10px;
 border: 1px black solid ;
 border-radius: 8x;
 .city{
  font-size: 24px;
 }
 .temperature{
  font-size: 60px;
  margin-top: 8px;
 }
 .sky{
  font-size: 20px;
  text-align: right;
  margin-top: 8px;
 }
`;