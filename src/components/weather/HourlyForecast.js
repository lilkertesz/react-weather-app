import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { 
    convertMpsToKph, 
    convertDegreeToDirection, 
    convertTimestampToTime, 
  } from "../../util";

const HourlyForecast = ({location}) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const humidityImage =
    "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519851-62_Raindrops-512.png";
  const windSpeedImage =
    "https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png";
  const pressureImage =
    "https://cdn2.iconfinder.com/data/icons/network-sensors/201/pressure-512.png";

  const smallIconStyle = {
    width: "25px",
    height: "25px",
  };

  const loadHandler = (e) => {
    e.currentTarget.classList.add("hourly-forecast");
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOURLYFORECAST_URL}/20/20`)
  .then(res => setHourlyForecast(res.data))
  .catch((err) => {
      console.log(err);
  });
  return () => {
      console.log("hourly");
      };
  },[location]);

  // return (
  //   <div className={classes.root}>
  //     <GridList className={classes.gridList} cols={4.5}>
  //     {hourlyForecast !== undefined &&  hourlyForecast.map((forecast) => (
  //         <GridListTile key={forecast.timestamp} className={classes.gridElement}>
  //             <div>{convertTimestampToTime(forecast.timestamp)}</div>
  //             <div>
  //         <img src={`http://openweathermap.org/img/wn/${forecast.weatherIcon}@2x.png`} alt={forecast.shortDescription} />
  //             </div>
  //         <div>{forecast.shortDescription}</div>
  //         <div>{forecast.temperature} C° (feels: {forecast.feelsLike} C°)</div>
  //         <div>Wind: {convertDegreeToDirection(forecast.windDirection)} {convertMpsToKph(forecast.windSpeed)}km/h</div>
  //         </GridListTile>
  //     ))}
  //     </GridList>
  //   </div>
  // );
  return (
    <React.Fragment>
          {hourlyForecast.map((item) => (

    <div
      key={item.timestamp}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
      onLoad={loadHandler}
    >
      <h4 style={{ padding: "20px 0" }}>
        {new Date(item.date).getHours() + ":00"}
      </h4>
      <div
        style={{ padding: "0 0 20px 0", borderBottom: "1px solid lightgray" }}
      >
        <img
          src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
          alt="weather"
          style={{ width: "50px", height: "50px" }}
        />
        <p>{Math.round(item.temperature) + "°"}</p>
      </div>
      <div>
        <img src={humidityImage} alt="humidity" style={smallIconStyle} />
        <p style={{ color: "lightblue" }}>{item.humidity + "%"}</p>
      </div>
      <div>
        <img src={windSpeedImage} alt="windspeed" style={smallIconStyle} />
        <p style={{ color: "gray", fontSize: "0.8rem" }}>
          {convertMpsToKph(item.wind) + " km/h"}
        </p>
      </div>
      <div>
        <img src={pressureImage} alt="pressure" style={smallIconStyle} />
        <p style={{ color: "gray", fontSize: "0.8rem" }}>
          {item.pressure + " hPa"}
        </p>
      </div>
    </div>
  ))}
  </React.Fragment>
  )};

export default HourlyForecast;
