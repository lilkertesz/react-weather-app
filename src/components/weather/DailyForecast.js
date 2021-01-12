import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LocationContext } from "../../context/LocationContext";
import { getDayFromTimestamp } from "../../util";
import DailyForecastDetails from './DailyForecastDetails';

const DailyForecast = () => {

  const [dailyForecast, setDailyForecast] = useState([]);
  const [location] = useContext(LocationContext);
  const url = `${process.env.REACT_APP_DAILYFORECAST_URL}/${location.latitude}/${location.longitude}`;

  useEffect(() => {
    axios.get(url)
    .then(res => setDailyForecast(res.data))
    .catch((err) => {
      console.log(err);
    });
  }, [location, url])

  const clickHandler = (e) => {
    const elem = e.currentTarget;

    if (elem.classList.contains("flipped")) {
      elem.style.transform = "rotateY(0deg)";
      elem.classList.remove("flipped");
    } else {
      elem.style.transform = "rotateY(180deg)";
      elem.classList.add("flipped");
    }
  };

  const mouseEnterHandler = (e) => {
    const elem = e.currentTarget;

    elem.classList.add("hovered-day");
    elem.style.borderTop = elem.classList.contains("flipped")
      ? "5px solid #fc6203"
      : "5px solid #fcd303";
  };

  const mouseLeaveHandler = (e) => {
    const elem = e.currentTarget;

    elem.classList.remove("hovered-day");
    elem.style.borderTop = elem.classList.contains("flipped")
      ? "5px solid orange"
      : "5px solid transparent";
  };

  const initialStyle = {
    padding: "10px 7px 0 7px",
    borderTop: "5px solid transparent",
    cursor: "pointer",
  };

  return (
    <React.Fragment>
      {dailyForecast.map((item) =>  (
      <div 
        className={"flip-card"} 
        key={item.timestamp}
      >
        <div
          onClick={clickHandler}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          style={initialStyle}
          className={"flip-card-inner"}
        >
          <div className={"flip-card-front"}>
            <h4>{getDayFromTimestamp(item.timestamp)}</h4>
            <img
              src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
              alt="weather"
            />
            <p>{item.temperature + "°"}</p>
            <p>{item.description}</p>
          </div>
          <DailyForecastDetails weather={item}/>
        </div>
      </div>
    ))}
    </React.Fragment>
  );
};

export default DailyForecast;
