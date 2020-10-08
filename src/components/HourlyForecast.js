import React from "react";
import { convertMpsToKph } from "../util/converters";

const HourlyForecast = (props) => {
  const humidityImage =
    "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519851-62_Raindrops-512.png";
  const windSpeedImage =
    "https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png";
  const pressureImage =
    "https://cdn2.iconfinder.com/data/icons/network-sensors/201/pressure-512.png";
  const imageStyle = {
    width: "25px",
    height: "25px",
  };

  const loadHandler = (e) => {
    e.currentTarget.classList.add("hourly-forecast");
  };

  return props.forecasts.map((item) => (
    <div
      key={item.dt}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
      onLoad={loadHandler}
    >
      <h4 style={{ padding: "20px 0" }}>
        {new Date(item.dt_txt).getHours() + ":00"}
      </h4>
      <div
        style={{ padding: "0 0 20px 0", borderBottom: "1px solid lightgray" }}
      >
        <img
          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="weather"
          style={{ width: "50px", height: "50px" }}
        />
        <p>{Math.round(item.main.temp) + "°"}</p>
      </div>
      <div>
        <img src={humidityImage} alt="humidity" style={imageStyle} />
        <p style={{ color: "lightblue" }}>{item.main.humidity + "%"}</p>
      </div>
      <div>
        <img src={windSpeedImage} alt="windspeed" style={imageStyle} />
        <p style={{ color: "gray", fontSize: "0.8rem" }}>
          {convertMpsToKph(item.wind.speed) + " km/h"}
        </p>
      </div>
      <div>
        <img src={pressureImage} alt="pressure" style={imageStyle} />
        <p style={{ color: "gray", fontSize: "0.8rem" }}>
          {item.main.pressure + " hPa"}
        </p>
      </div>
    </div>
  ));
};

export default HourlyForecast;
