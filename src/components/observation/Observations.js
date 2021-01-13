import React, { useState, useEffect } from "react";
import axios from "axios";
import AddObservation from "./AddObservation";
import { Comment, Header } from 'semantic-ui-react'
import { convertDateTime } from "../../util";

const Observations = ({location}) => {
  const observationUrl = `${process.env.REACT_APP_OBSERVATION_URL}/${location.latitude}/${location.longitude}`;
  const [observations, setObservations] = useState();
  const avatars = ["matt", "elliot", "jenny", "joe", "christian", "stevie"]

  useEffect(() => {
    axios.get(observationUrl).then((res) => {
      setObservations(res.data);
    });
  }, [observationUrl]);

  return (
  <div style={{width: "600px", margin: "auto", paddingBottom: "40px"}}>
    <Comment.Group>
      <Header as='h3' dividing>
        User observations for {location.city}:
      </Header>
      {observations !== undefined &&
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
        ))}
      <AddObservation location={location} setObservations={setObservations}/>
    </Comment.Group>
  </div>  
  );
};


export default Observations;
