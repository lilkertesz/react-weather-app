import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LocationContext } from "../../context/LocationContext";
import { 
  convertMpsToKph, 
  convertDegreeToDirection, 
  convertTimestampToTime, 
} from "../../util";

function CurrentWeather() {
  const [weather, setWeather] = useState();
  const [location] = useContext(LocationContext);
  const url = `${process.env.REACT_APP_CURRENTWEATHER_URL}/${location.latitude}/${location.longitude}`;

  useEffect(() => {
    axios.get(url)
    .then(res => setWeather(res.data))
    .catch((err) => {
      console.log(err);
    });  
  }, [location, url])

  const currentWeatherGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    // gridTemplateRows: "0.5fr 0.5fr",
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
    <React.Fragment>
    {weather !== undefined &&
      <div className="current-weather" style={currentWeatherGridStyle}>
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
    </div>
  }
  </React.Fragment>
  ) 
}

export default CurrentWeather;
