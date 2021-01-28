import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const Registration = () => (
  <Form>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Form.Field>
      <label>Confirm Password</label>
      <input placeholder='Confirm Password' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default Registration