import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import styled from "styled-components";
import { LocationContext } from "../../context/LocationContext";
import { 
    convertTimestampToTime, 
  } from "../../util";
import Details from './Details';

const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [location] = useContext(LocationContext);
  const url = `${process.env.REACT_APP_HOURLYFORECAST_URL}/${location.latitude}/${location.longitude}`;

  const loadHandler = (e) => {
    e.currentTarget.classList.add("hourly-forecast");
  };

  useEffect(() => {
    axios.get(url)
    .then(res => setHourlyForecast(res.data))
    .catch((err) => {
        console.log(err);
    });
  },[location, url]);

  return (
    <React.Fragment>
    {hourlyForecast.map((item) => (
    <Container key={item.timestamp} onLoad={loadHandler}>
      <Time> {convertTimestampToTime(item.timestamp)} </Time>
      <Main>
        <MediumImg
          src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
          alt="weather"
        />
        <p>{item.temperature + "°"}</p>
      </Main>
      <Details weather={item} />
    </Container>
  ))}
  </React.Fragment>
  )};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Time = styled.h4`
  padding: 20px 0;
`;

const Main = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid lightgray;
`;

const MediumImg = styled.img`
  height: 50px;
  width: 50px;
`;

export default HourlyForecast;
