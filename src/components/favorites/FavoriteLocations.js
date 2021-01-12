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
    <React.Fragment>
      {state.map((item) => (
        <Container key={item.city}>
          <City> {item.city} </City>
          <Main>
            <MediumImg
              src={`http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`}
              alt="weather"
            />
            <p>{item.temperature + "°"}</p>
          </Main>
          <Details weather={item} />
        </Container>
      ))}
    </React.Fragment>
  );
};

const Container = styled.div`
  display: inline-block;
  width: 200px;
  justify-content: space-around;
`;

const City = styled.h4`
  padding: 20px 0;
`;

const Main = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid lightgray;
`;

const MediumImg = styled.img`
  height: 50px;
  width: 50px;
`;

export default FavoriteLocations;
