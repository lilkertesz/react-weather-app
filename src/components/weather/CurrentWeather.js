import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AddFavorite from "../favorites/AddFavorites";

import { 
  convertMpsToKph, 
  convertDegreeToDirection, 
  convertTimestampToTime, 
} from "../../util";
import Search from "../search/Search";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

const CurrentWeather = ({location}) => {

  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CURRENTWEATHER_URL}/20/20`)
    .then(res => setWeather(res.data))
    .catch((err) => {
      console.log(err);
    });  
    return () => {
      console.log("cleaned up");
    };
  }, [location])

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    gridTemplateRows: "1fr 2fr",
    gridTemplateAreas: `
    'box1 box2'
    'box3 box3'`,
    height: "auto",
    padding: "60px",
    paddingTop: "20px",
  };

  const box1Style = {
    gridArea: "box1",
    lineHeight: "1.5rem",
    fontSize: "1.15rem",
    padding: "15px 15px 25px 15px",
    border: "2px solid lightgray",
    borderRight: "0",
  };

  const box2Style = {
    gridArea: "box2",
    display: "flex",
    padding: "20px",
    textAlign: "center",
    justifyContent: "space-around",
    border: "2px solid lightgray",
    borderLeft: "0",
  };

  const box3Style = {
    gridArea: "box3",
    display: "flex",
    padding: "20px",
    textAlign: "center",
    justifyContent: "space-evenly",
  };

  const currentWeatherGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "0.5fr 0.5fr",
    gridTemplateAreas: `
      'currentbox1 .'
      'currentbox2 currentbox3'`,
    justifyItems: "center",
    alignItems: "center",
  };

  const infoStyle = {
    fontSize: "0.8rem",
  };

  const infoSpanStyle = {
    fontWeight: "700",
    fontSize: "0.9rem",
  };

  return (
    // <div>
    // {weather !== undefined && 
    //   <Container>
    //     <Main>
    //       Today:
    //       <div>
    //       <img src={`http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`} alt={weather.shortDescription}></img>
    //       </div>
    //       <div>{weather.description}</div>
    //       <div>{weather.temperature} C°</div>
    //       <div>feels like: {weather.feelsLike} C°</div>
    //     </Main>
    //     <Details>
    //       <div>Humidity: {weather.humidity}%</div>
    //       <div>Wind: {convertDegreeToDirection(weather.windDirection)} {convertMpsToKph(weather.windSpeed)}km/h</div>
    //       <div>Pressure: {weather.pressure} hPa</div>
    //       <div>Sunrise: {convertTimestampToTime(weather.sunrise)}</div>
    //       <div>Sunset: {convertTimestampToTime(weather.sunset)}</div>
    //     </Details>
    //   </Container>
    // }
    // </div>
    <div className="weather-box">
      <Search />
      {weather !== undefined && 
      <React.Fragment>
    <h2 style={{ marginLeft: "60px", display: "flex" }}>
      "budapest"
      <AddFavorite currentWeather={weather} />
    </h2>
    <div className="grid-container" style={gridStyle}>
      <div className="box1" style={box1Style}>
        <div className="current-weather" style={currentWeatherGridStyle}>
          <h2 style={{ gridArea: "currentbox1" }}>Now</h2>
          <div
            style={{
              gridArea: "currentbox2",
              lineHeight: "0",
              alignSelf: "start",
            }}
          >
            <img
              src={`http://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`}
              alt="weather"
              style={{ width: "auto" }}
            />
            <h3 style={{ textAlign: "center" }}>
              {Math.round(weather.temperature)}°
            </h3>
          </div>
          <div
            style={{
              gridArea: "currentbox3",
              justifySelf: "start",
              lineHeight: "2rem",
            }}
          >
            <p
              style={{
                fontWeight: "700",
                fontSize: "1rem",
              }}
            >
              {weather.description}
            </p>
            <p style={infoStyle}>
              Humidity{" "}
              <span style={infoSpanStyle}>{weather.humidity}%</span>
            </p>
            <p style={infoStyle}>
              Wind:{" "}
              <span style={infoSpanStyle}>
              {convertDegreeToDirection(weather.windDirection)} {convertMpsToKph(weather.windSpeed)} km/h
              </span>
            </p>
            <p style={infoStyle}>
              Pressure{" "}
              <span style={infoSpanStyle}>{weather.pressure} kPa</span>
            </p>
          </div>
        </div>
      </div>
      <div className="box2" style={box2Style}>
        <DailyForecast />
      </div>
      <div className="box3" style={box3Style}>
        <HourlyForecast />
      </div>
    </div>
    </React.Fragment>
}
  </div>
  )
}

const Container = styled.div`
  height: 195px;
  display: grid;
  grid-template-columns: 50% 50%;
  width: 30%;
  float: left;
  margin: 1px;
  background-color: rgba(226, 213, 212, 0.95);
  border-radius: 4px;
`

const Main = styled.div`
  grid-column-start: 1;
`

const Details = styled.div`
  grid-column-start: 2;
`

export default CurrentWeather
