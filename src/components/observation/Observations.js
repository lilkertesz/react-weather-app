import React, { useState, useEffect } from "react";
import axios from "axios";
import AddObservation from "./AddObservation";
import { Comment, Header } from 'semantic-ui-react'
import { convertDateTime } from "../../util";


const Observations = ({location}) => {
  const observationUrl = `${process.env.REACT_APP_OBSERVATION_URL}/${location.latitude}/${location.longitude}`;
  const [state, setState] = useState({
    observations: [],
  });
  const [posted, setPosted] = useState(true);

  useEffect(() => {
    if (posted === true){
      axios.get(observationUrl).then((res) => {
        setState({ observations: res.data });
      });
      setPosted(false);
    }
  }, [observationUrl, posted]);

  return (
  <div style={{width: "600px", margin: "auto"}}>
    <Comment.Group>
      <Header as='h3' dividing>
        User observations for {location.city}:
      </Header>
        {state.observations.map((observation) => (
        <Comment key={observation.id}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>{observation.userName}</Comment.Author>
            <Comment.Metadata>
              <div>{convertDateTime(observation.timeStamp)}</div>
            </Comment.Metadata>
            <Comment.Text>{observation.description}</Comment.Text>
          </Comment.Content>
        </Comment>
        ))}
      <AddObservation location={location} setPosted={setPosted}/>
    </Comment.Group>
  </div>  
  );
};


export default Observations;
