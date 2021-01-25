import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';

const AddFavorite = ({ location }) => {
  const [favoriteLocations, setFavoriteLocations] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FAVORITES_URL}`).then((res) => {
      setFavoriteLocations(res.data)
    })
  }, []);

  useEffect(() => {
    if (favoriteLocations !== undefined){
    favoriteLocations.includes(`${location.latitude}%${location.longitude}`)
      ? setIcon("check")
      : setIcon("plus");
    }
  }, [location, favoriteLocations]);

  const ToggleLocation = () => {
    if (favoriteLocations.includes(`${location.latitude}%${location.longitude}`)) {
      console.log(favoriteLocations)
      axios.delete(
        `${process.env.REACT_APP_FAVORITE_URL}/${location.latitude}/${location.longitude}`
      );
      setFavoriteLocations(favoriteLocations.filter(item => item !== `${location.latitude}%${location.longitude}`));
    } else {
      console.log(favoriteLocations)
      axios.post(
        `${process.env.REACT_APP_FAVORITE_URL}/${location.latitude}/${location.longitude}`
      );
      setFavoriteLocations([...favoriteLocations, `${location.latitude}%${location.longitude}`]);
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
    <Tooltip title={icon === "check" ? "Remove from favorites" : "Add to favorites"} placement="right">
      <i onClick={ToggleLocation} className={`fa fa-${icon}`} style={ButtonStyle} />
    </Tooltip>
  );
};

export default AddFavorite;
