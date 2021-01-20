import React, { useContext } from "react";
import Search from "../search/Search";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";
import {LocationContext} from "../../context/LocationContext";
import AddFavorite from "../favorites/AddFavorites";
import Observations from "../observation/Observations";

const Weather = () => {
  const [location] = useContext(LocationContext)

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
    border: "2px solid lightgray",
    borderRight: "0",
  };

  const box2Style = {
    gridArea: "box2",
    display: "flex",
    padding: "10px",
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

  return (
    <div className="weather-box" style={{ margin: "auto", width: "fit-content" }}>
      <Search />
      <h2 style={{ marginLeft: "60px", display: "flex" }}>
        {location.city}
        <AddFavorite location={location} />
      </h2>
      <div className="grid-container" style={gridStyle}>
        <div className="box1" style={box1Style}>
          <CurrentWeather />
        </div>
        <div className="box2" style={box2Style}>
          <DailyForecast />
        </div>
        <div className="box3" style={box3Style}>
          <HourlyForecast />
        </div>
      </div>
      <Observations location={location} />
    </div>
  )
}

export default Weather;
