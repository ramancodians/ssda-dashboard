import { Button, Card, Input, DatePicker } from "antd"
import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
  max-width: 300px;
  margin: 40px auto;
`

const Login = (props) => (
  <Wrap>
    <Card title="Login">
      <Input type="email" placeholder="Email" name="email" />
      <br />
      <Input placeholder="Password" type="password" name="password" />
      <br />
      <br />
      <Button type="primary">
        Login
      </Button>
    </Card>
  </Wrap>
)

export default Login