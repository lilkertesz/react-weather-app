import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";
import styled from "styled-components";

const Registration = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  })

  const submitHandler = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_REGISTRATION_URL}`;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    let bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    if (errors.usernameError === "" && errors.emailError === "" && errors.passwordError === "" &&
    userInput.username !== "" && userInput.email !== "" && userInput.password !== "") {
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(resp => resp.status === 200 ? console.log("success") : console.log("not yet"))
        .catch(err => console.log(err));
    };
  }

  const validEmailRegex = 
  // eslint-disable-next-line no-useless-escape
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "username": 
        errors.usernameError = 
        value.length < 4
          ? 'Username must be at least 4 characters long!'
          : '';
      break;
      case "email": 
        errors.emailError = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
      break;
      case "password": 
        errors.passwordError = 
          value.length < 4
            ? 'Password must be at least 4 characters long!'
            : '';
      break;
      default:
      break;
    }

    setUserInput({
      [name]: value
    });
  }

  return(
  <Form onSubmit={submitHandler}>
    <Form.Field>
      <Error>{errors.usernameError}</Error>
      <label>Username</label>
      <input placeholder='Username' name={"username"} value={userInput.username} onChange={handleInputChange}/>
    </Form.Field>
    <Form.Field>
      <Error>{errors.emailError}</Error>
      <label>Email</label>
      <input placeholder='Email' name={"email"} value={userInput.email} onChange={handleInputChange}/>
    </Form.Field>
    <Form.Field>
      <Error>{errors.passwordError}</Error>
      <label>Password</label>
      <input placeholder='Password' name={"password"} value={userInput.password} onChange={handleInputChange} type="password"/>
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
  )
}

const Error = styled.div`
  color: red
`

export default Registration