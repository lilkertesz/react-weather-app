import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from 'semantic-ui-react'

const AddObservation = ({location, setIsLoading}) => {
  const [description, setDescription] = useState("");

  const descriptionInputChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setDescription("");
    const url = `${process.env.REACT_APP_OBSERVATION_URL}`;
    const data = e.target.description.value;

    var bodyFormData = new FormData();
    bodyFormData.append('city', location.city);
    bodyFormData.append('latitude', location.latitude);
    bodyFormData.append('longitude', location.longitude);
    bodyFormData.append('description', data);
    bodyFormData.append('username', "guest");

    axios({
      method: 'post',
      url: url,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(resp => resp.status === 200 ? setIsLoading(false) : console.log("not yet"))
      .catch(err => console.log(err));
    };


  return (
    <Form reply onSubmit={submitHandler}>
      <Form.TextArea 
        name="description" 
        value={description} 
        onChange={descriptionInputChangeHandler}
      />
      <Button content='Add Observation' labelPosition='left' icon='edit' primary type="submit"/>
    </Form>
  );
};

export default AddObservation;
