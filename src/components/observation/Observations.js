import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import AddObservation from "./AddObservation";
import { Comment, Header } from 'semantic-ui-react'
import { convertDateTime } from "../../util";

const Observations = ({location}) => {
  const observationUrl = `${process.env.REACT_APP_OBSERVATION_URL}/${location.latitude}/${location.longitude}`;
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const avatars = ["matt", "elliot", "jenny", "joe", "christian", "stevie"]

  useLayoutEffect(() => {
    axios.get(observationUrl)
    .then((res) => {
      setObservations(res.data);
    })
  }, [observationUrl, isLoading]);

  return (
  <div style={{width: "600px", margin: "auto", paddingBottom: "40px"}}>
    <Comment.Group>
      <Header as='h3' dividing>
        User observations for {location.city}:
      </Header>
      {!isLoading ? (
      observations.map((observation) => (
        <Comment key={observation.id}>
          <Comment.Avatar src={`https://react.semantic-ui.com/images/avatar/small/${avatars[Math.floor(Math.random()*avatars.length)]}.jpg`} />
          <Comment.Content>
            <Comment.Author as='a'>{observation.userName}</Comment.Author>
            <Comment.Metadata>
              <div>{convertDateTime(observation.timeStamp)}</div>
            </Comment.Metadata>
            <Comment.Text>{observation.description}</Comment.Text>
          </Comment.Content>
        </Comment>
        ))) : (
          <h3>Loading...</h3>
        )
      }
      <AddObservation location={location} setIsLoading={setIsLoading}/>
    </Comment.Group>
  </div>  
  );
};


export default Observations;
