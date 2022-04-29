import { Form, Input, Button, Row, Col, Select, notification } from "antd"
import React from "react"
import styled from "styled-components"
import { collection, doc } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { firestore, auth } from "../../../config/firebase";
import { COLLECTIONS } from "../../../consts";
import { createUserWithEmailAndPassword, updateProfile,  } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Wrap = styled.div`
  background: #fff;
  padding: 20px;
`

const NewStaff = () => {
  const history = useHistory()
  const ref = collection(firestore, COLLECTIONS.STAFF);
  const mutation = useFirestoreCollectionMutation(ref);

  const handleCreateStaff = async (values) => {
    await createNewUser(values)
    mutation.mutate({
      ...values,
      created_on: new Date(),
    })
    
  }

  const createNewUser = async (values) => {
    try {
      console.log({ auth });
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      updateProfile(user, {
        displayName: values.full_name,
      })
      notification.success({
        message: "Staff Created successfully!"
      })
      history.goBack()
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Something went wrong!"
      })
    }
  }

  return (
    <Wrap>
      <h1>New Staff Member</h1>
      <Form
        layout="vertical"
        onFinish={handleCreateStaff}
      >
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              label="Full Name"
              name="full_name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Name of the staff"/>
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="8823-232342" type="number" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input placeholder="name-staff@ssdentalarts.in"/>
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="password"/>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add Staff
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
      </Form>
    </Wrap>
  )
}

export default NewStaff
