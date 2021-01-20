import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../context/LocationContext";
import styled from "styled-components";
import { 
  convertMpsToKph, 
  convertDegreeToDirection, 
  convertTimestampToTime, 
  weatherCodeConverter
} from "../../util";

import Clear from '../../assets/clear.JPG';
import Cloud from '../../assets/cloud.JPG';
import Drizzle from '../../assets/drizzle.JPG';
import Mist from '../../assets/mist.JPG';
import Rain from '../../assets/rain.JPG';
import Snow from '../../assets/snow.JPG';
import Thunder from '../../assets/thunder.JPG';

function CurrentWeather() {
  const [weather, setWeather] = useState();
  const [location] = useContext(LocationContext);
  const url = `${process.env.REACT_APP_CURRENTWEATHER_URL}/${location.latitude}/${location.longitude}`;
  const backgrounds = [Clear, Thunder, Drizzle, Rain, Snow, Mist, Cloud]

  useEffect(() => {
    axios.get(url)
    .then(res => {setWeather(res.data)})
    .catch((err) => {
      console.log(err);
    });  
  }, [location, url])

  const infoStyle = {
    fontSize: "0.8rem",
  };

  const infoSpanStyle = {
    fontWeight: "700",
    fontSize: "0.9rem",
  };

  return (
    <React.Fragment>
    {weather !== undefined &&
      <CurrentWeatherGrid className="current-weather" style={{ backgroundImage: `url(${backgrounds[weatherCodeConverter(weather.code)]})`}}>
      <h2 style={{ gridArea: "currentbox1" }}>
        {convertTimestampToTime(weather.timestamp)}
      </h2>
      <div style={{ gridArea: "currentbox2", lineHeight: "0", alignSelf: "start" }}>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
          alt="weather"
          />
        <p style={{ textAlign: "center", fontSize: "2rem"  }}> {weather.temperature}°</p>
      </div>
      <div style={{ gridArea: "currentbox3", justifySelf: "start" }}>
        <p style={{ fontWeight: "700", fontSize: "1rem" }}>
          {weather.description}
        </p>
        <p style={infoStyle}> humidity:{" "}
          <span style={infoSpanStyle}>{weather.humidity}%</span>
        </p>
        <p style={infoStyle}> wind:{" "}
          <span style={infoSpanStyle}>
          {convertDegreeToDirection(weather.windDirection)}{" "}
          {convertMpsToKph(weather.windSpeed)} km/h
          </span>
        </p>
        <p style={infoStyle}> pressure:{" "}
          <span style={infoSpanStyle}>{weather.pressure} hPa</span>
        </p>
      </div>
    </CurrentWeatherGrid>
  }
  </React.Fragment>
  ) 
}

const CurrentWeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'currentbox1 .'
    'currentbox2 currentbox3';
  justify-items: center;
  align-items: center;
  padding: 15px 15px 25px 15px;
  background-size: cover;
`

export default CurrentWeather;
