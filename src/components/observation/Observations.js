import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AddObservation from "./AddObservation";

const Observations = (props) => {
  const observationUrl = `${process.env.REACT_APP_OBSERVATION_URL}/${props.city}`;
  const [state, setState] = useState({
    observations: [],
  });

  useEffect(() => {
    axios.get(observationUrl).then((res) => {
      setState({ observations: res.data });
    });
  }, [observationUrl]);

  return (
    <React.Fragment>
      <AddObservation city={props.city} />
      {console.log(state.observations)}
      <h2 style={{ marginLeft: "60px", display: "flex" }}>
        {" "}
        User Observations
      </h2>
      {state.observations.map((observation) => (
        <ObservationsContainer key={observation.id}>
          <ObservationItem>{observation.userName}</ObservationItem>
          <ObservationItem>{observation.timeStamp}</ObservationItem>
          <ObservationItem>{observation.description}</ObservationItem>
        </ObservationsContainer>
      ))}
    </React.Fragment>
  );
};

// TODO: styling

const ObservationsContainer = styled.div`
  margin-left: 60px;
`;
const ObservationItem = styled.div``;

export default Observations;
