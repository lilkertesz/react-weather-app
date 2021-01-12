import React from "react";
import styled from "styled-components";
import { 
  convertMpsToKph, 
  convertDegreeToDirection, 
} from "../../util";

const  Details = ({ weather }) => {

  const humidityImage =
    "https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519851-62_Raindrops-512.png";
  const windSpeedImage =
    "https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png";
  const pressureImage =
    "https://cdn2.iconfinder.com/data/icons/network-sensors/201/pressure-512.png";

  return (
    <React.Fragment>
      <Humidity>
        <SmallImg src={humidityImage} alt="humidity" />
        <p>{weather.humidity + "%"}</p>
      </Humidity>
      <Air>
        <SmallImg src={windSpeedImage} alt="windspeed" />
        <p>
          {convertDegreeToDirection(weather.windDirection)} <br />
          {convertMpsToKph(weather.windSpeed) + " km/h"}
        </p>
      </Air>
      <Air>
        <SmallImg src={pressureImage} alt="pressure" />
        <p>{weather.pressure + " hPa"}</p>
      </Air>
    </React.Fragment>
  );
};


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


export default Details
