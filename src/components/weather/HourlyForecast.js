import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import styled from "styled-components";
import { LocationContext } from "../../context/LocationContext";
import { 
    convertMpsToKph, 
    convertDegreeToDirection, 
    convertTimestampToTime, 
  } from "../../util";

const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [location] = useContext(LocationContext);
  const url = `${process.env.REACT_APP_HOURLYFORECAST_URL}/${location.latitude}/${location.longitude}`;

  const humidityImage =
    "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519851-62_Raindrops-512.png";
  const windSpeedImage =
    "https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png";
  const pressureImage =
    "https://cdn2.iconfinder.com/data/icons/network-sensors/201/pressure-512.png";

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
      <Humidity>
        <SmallImg src={humidityImage} alt="humidity" />
        <p>{item.humidity + "%"}</p>
      </Humidity>
      <Air>
        <SmallImg src={windSpeedImage} alt="windspeed" />
        <p>
          {convertDegreeToDirection(item.windDirection)} <br />
          {convertMpsToKph(item.windSpeed) + " km/h"}
        </p>
      </Air>
      <Air>
        <SmallImg src={pressureImage} alt="pressure" />
        <p>{item.pressure + " hPa"}</p>
      </Air>
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

const Humidity = styled.div`
  color: lightblue;
`;

const Air = styled.div`
  color: grey;
  font-size: 0.8rem;
`;

const SmallImg = styled.img`
  height: 25px;
  width: 25px;
`;

const MediumImg = styled.img`
  height: 50px;
  width: 50px;
`;

export default HourlyForecast;
