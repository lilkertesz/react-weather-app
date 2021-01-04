import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import styled from "styled-components";

const AddObservation = (props) => {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  const submitHandler = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_OBSERVATION_URL}/${props.city}`;
    const bodyFormData = qs.stringify({
      userName: userName,
      description: description,
    });

    axios
      .post(url, bodyFormData, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((res) => console.log(res));
  };

  const nameInputChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const descriptionInputChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  return (
    <ObservationForm>
      <form method="post" onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">User name: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={nameInputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            rows="5"
            cols="40"
            id="description"
            name="description"
            value={description}
            onChange={descriptionInputChangeHandler}
          />
        </div>
        {/* <button onClick={submitHandler}>Submit</button> */}
        <input type="submit" value="Send" />
      </form>
    </ObservationForm>
  );
};

const ObservationForm = styled.div`
  margin: 30px;
  padding: 30px;
`;

export default AddObservation;
