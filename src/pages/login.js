import { Button, Card, Input, notification, Form } from "antd"
import React, { useState } from "react"
import styled from "styled-components"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../config/firebase"


const Wrap = styled.div`
  max-width: 300px;
  margin: 40px auto;
`

const Login = (props) => {
  const [ isSigningIn, setisSigningIn ] = useState()

  const handleLogin = async (values) => {
    try {
      setisSigningIn(true)
      console.log({ values });
      await signInWithEmailAndPassword(auth, values.email, values.password)
      window.location.href = "/dashboard"
    } catch (error) {
      console.log(error.message);
      notification.open({
        message: error.message
      })
      setisSigningIn(false)
    }
  }

  return (
    <Wrap>
      <Card title="Login">
        <Form
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            label=""
            name="email"
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
          >
            <Input type="passowrd" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isSigningIn}>
            Login
          </Button>
        </Form>
      </Card>
    </Wrap>
  )
}

export default Login