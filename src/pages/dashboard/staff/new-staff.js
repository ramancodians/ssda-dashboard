import { Form, Input, Button, Row, Col, Select } from "antd"
import React from "react"
import styled from "styled-components"
import { collection, doc } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { COLLECTIONS } from "../../../consts";

const Wrap = styled.div`
  background: #fff;
  padding: 20px;
`

const NewStaff = () => {
  const ref = collection(firestore, COLLECTIONS.STAFF);
  const mutation = useFirestoreCollectionMutation(ref);

  const handleCreateStaff = (values) => {
    mutation.mutate({
      ...values,
      created_on: new Date(),
    })
  }

  return (
    <Wrap>
      <h1>New Staff Member</h1>
      <Form
        layout="vertical"
        onFinish={handleCreateStaff}
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
      </Form>
    </Wrap>
  )
}

export default NewStaff
