﻿import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FavoriteListContext } from "../../context/FavoriteListContext";

const AddFavorite = ({ currentWeather }) => {
  const [favoriteLocations, setFavoriteLocations] = useContext(
    FavoriteListContext
  );
  const [icon, setIcon] = useState();

  useEffect(() => {
    favoriteLocations.includes(currentWeather.city)
      ? setIcon("check")
      : setIcon("plus");
  }, [currentWeather.city, favoriteLocations, setFavoriteLocations]);


  const ToggleLocation = () => {
    if (favoriteLocations.includes(currentWeather.city)) {
      axios.delete(
        `${process.env.REACT_APP_FAVORITE_URL}/${currentWeather.city}`
      );
      setFavoriteLocations(favoriteLocations.filter(cities => cities !== currentWeather.city));
    } else {
      axios.post(
        `${process.env.REACT_APP_FAVORITE_URL}/${currentWeather.city}`
      );
      setFavoriteLocations([...favoriteLocations, currentWeather.city]);
    }
  };

  const ButtonStyle = {
    float: "left",
    fontSize: "22px",
    marginLeft: "15px",
    marginTop: "4px",
    display: "flex",
    cursor: "pointer",
  };

  return (
    <i onClick={ToggleLocation} className={`fa fa-${icon}`} style={ButtonStyle} />
  );
};

export default AddFavorite;
