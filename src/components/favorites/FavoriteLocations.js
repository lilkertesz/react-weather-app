import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Details from "../weather/Details";

const FavoriteLocations = () => {
  const [state, setState] = useState([]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FAVORITE_URL}`).then((res) => {
      setState(res.data);
    });
  }, []);

  return (
    <Container>
    {state.map((item) => (
      <div key={item.city} className={"flip-card"} >
        <div className={"flip-card-inner"}>
          <div className={"flip-card-front"}>
          <City> {item.city} </City>
          <Main>
            <img
              src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
              alt="weather"
            />
            <h2>{item.temperature + "°"}</h2>
          </Main>
          </div>
          <div className={"flip-card-back"}>
          <City> {item.city} </City>
          <Details weather={item} />
          </div>
        </div>
    </div>
    ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 25px;
  text-align: center;
`;

const City = styled.h4`
  padding: 20px 0;
`;

const Main = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid lightgray;
`;

export default FavoriteLocations;
