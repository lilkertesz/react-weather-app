import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";

const Registration = () => {
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_OBSERVATION_URL}`;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    let bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);


    if (password !== "") {
      setError("");
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(resp => resp.status === 200 ? console.log("success") : console.log("not yet"))
        .catch(err => setError("Ooops... something went wrong. Please try again later."));
      } else {
        setError("Please enter something.")
    };
  }

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserInput({
      [name]: value
    });
  }

  return(
  <Form onSubmit={submitHandler}>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' name={"username"} value={userInput.username} onChange={handleInputChange}/>
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' name={"email"} value={userInput.email} onChange={handleInputChange}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' name={"password"} value={userInput.password} onChange={handleInputChange}/>
    </Form.Field>
    <Form.Field>
      <label>Confirm Password</label>
      <input placeholder='Confirm Password' name={"confirmPassword"} value={userInput.confirmPassword} onChange={handleInputChange}/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  )
}

export default Registration