import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ChosenDayContext } from "../../context/ChosenDayContext";
import { ChosenDayProvider } from "../../context/ChosenDayContext";
import { 
  convertMpsToKph, 
  convertDegreeToDirection, 
  getDayFromTimestamp,
  convertTimestampToTime 
} from "../../util";


const DailyForecast = ({ location }) => {

  const [dailyForecast, setDailyForecast] = useState([]);
  // const [chosenDay, setChosenDay] = useContext(ChosenDayContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DAILYFORECAST_URL}/${location.latitude}/${location.longitude}`)
    .then(res => setDailyForecast(res.data))
    .catch((err) => {
      console.log(err);
    });  
    return () => {
      console.log("cleaned up");
    };
  }, [location])

  const clickHandler = (e) => {
    // setChosenDay(parseInt(e.currentTarget.dataset.dayofweek));

    const elem = e.currentTarget;
    const currentChosenDayElement = document.querySelector(".chosen-day");

    if (currentChosenDayElement) {
      currentChosenDayElement.style.borderTop = "5px solid transparent";
      currentChosenDayElement.classList.remove("chosen-day");
    }
    elem.classList.add("chosen-day");
    elem.style.borderTop = "5px solid orange";
  };

  const mouseEnterHandler = (e) => {
    const elem = e.currentTarget;

    elem.classList.add("hovered-day");

    elem.style.borderTop = elem.classList.contains("chosen-day")
      ? "5px solid #fc6203"
      : "5px solid #fcd303";
  };

  const mouseLeaveHandler = (e) => {
    const elem = e.currentTarget;

    elem.classList.remove("hovered-day");

    elem.style.borderTop = elem.classList.contains("chosen-day")
      ? "5px solid orange"
      : "5px solid transparent";
  };

  const loadHandler = (e) => {
    const elem = e.currentTarget;

    // if (parseInt(elem.dataset.dayofweek) === chosenDay) {
    //   elem.classList.add("chosen-day");
    //   elem.style.borderTop = "5px solid orange";
    // }
  };

  const initialStyle = {
    padding: "10px 7px 0 7px",
    borderTop: "5px solid transparent",
    cursor: "pointer",
  };

  return (
    <ChosenDayProvider>

    {dailyForecast.map((item) => (
    <div
      key={item.timestamp}
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onLoad={loadHandler}
      style={initialStyle}
      data-dayofweek={getDayFromTimestamp(item.timestamp)}
    >
      <h4>{getDayFromTimestamp(item.timestamp)}</h4>
      <img
        src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
        alt=""
        style={{ width: "auto" }}
      />
      <p>{item.temperature + "°"}</p>
      <p>{item.description}</p>
    </div>
  ))}
  </ChosenDayProvider>
  );
};

export default DailyForecast;
