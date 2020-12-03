import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const AddObservation = () => {
    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log(userName)
    }, []);

    const submitHandler = () => {
        setUserName(userName);
        setDescription(description);
    };

    const nameInputChangeHandler = (event) => {
        setUserName(event.target.value);
    };

    const descriptionInputChangeHandler = (event) => {
        setDescription(event.target.value);
    };

    return (
    <React.Fragment>
    <div>Name</div>
      <input type="text" value={userName} onChange={nameInputChangeHandler}></input>
    <div>Observation</div>
      <input type="text" value={description} onChange={descriptionInputChangeHandler}></input>
    <button onClick={submitHandler}>Submit</button>
    </React.Fragment>
    )
}

export default AddObservation;
