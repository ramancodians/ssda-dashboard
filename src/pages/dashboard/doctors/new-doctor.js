import { Form, Input, Button, Row, Col, Select } from "antd"
import React from "react"
import styled from "styled-components"
import { collection, doc } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from "../../../config/consts";
import { INDIAN_STATES, COLLECTIONS } from "../../../consts";
import { firestore } from "../../../config/firebase";

const Wrap = styled.div`
  background: #fff;
  padding: 20px;
`

const STATES = Object.keys(INDIAN_STATES).map(key => ({ value: INDIAN_STATES[key], label: INDIAN_STATES[key] }))
console.log({ STATES });

const NewDoc = () => {
  const ref = collection(firestore, COLLECTIONS.DOCTORS);
  const mutation = useFirestoreCollectionMutation(ref);

  const handleCreateDoc = (values) => {
    mutation.mutate({
      ...values,
      created_on: new Date(),
    })
  }

  return (
    <Wrap>
      <h1>New Doctor</h1>
      <Form
        layout="vertical"
        onFinish={handleCreateDoc}
      >
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Please enter doctor's name" }]}
        >
          <Input />
        </Form.Item>
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter doctor's Phone" }]}
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
        <Form.Item
          label="Clinic / Hospital"
          name="clinic_name"
          rules={[{ required: true, message: "Required Field" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Street Address"
          name="street_address"
          rules={[{ required: true, message: "Required Field" }]}
        >
           <Input />
        </Form.Item>
        <Row gutter={20}>
          <Col flex={1}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Required Field" }]}
            >
              <Select
                options={STATES}
                showSearch
              />
            </Form.Item>
          </Col>
          <Col flex={1}>
            <Form.Item
            label="Pin Code"
            name="pincode"
          >
            <Input />
          </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Notes"
          name="notes"
        >
          <Input.TextArea
            type="texh"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
      </Form>
    </Wrap>
  )
}

export default NewDoc
