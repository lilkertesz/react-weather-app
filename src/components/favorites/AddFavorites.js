import React, { useState, useEffect, useContext } from "react";
import FavoriteListContext from "../../context/FavoriteListContext";
import axios from "axios";

const AddFavorite = ({ currentWeather }) => {
  const [favoriteLocations, setFavoriteLocations] = useContext(
    FavoriteListContext
  );

  const [icon, setIcon] = useState();

  useEffect(() => {
    favoriteLocations.includes(currentWeather.city)
      ? setIcon("check")
      : setIcon("plus");
  }, [currentWeather.city, favoriteLocations]);

  const AddLocation = () => {
    axios.post(`${process.env.REACT_APP_FAVORITE_URL}/${currentWeather.city}`);
    setFavoriteLocations([...favoriteLocations, currentWeather.city]);
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
    <i onClick={AddLocation} className={`fa fa-${icon}`} style={ButtonStyle} />
  );
};

export default AddFavorite;
