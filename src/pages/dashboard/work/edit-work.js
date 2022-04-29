import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Form, Input, Button } from "antd"
import ToothSelector from "../../../comps/form/tooth-selector"
import DoctorSearch from "../../../comps/form/doctor_search"
import WorkTypeDropdown from "../../../comps/form/workTypeDropdown"
import { useParams, useLocation, useHistory } from "react-router-dom"
import { doc } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { COLLECTIONS, ACTIVITY_ITEMS } from "../../../consts"
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore"
import { createActivity } from "../../../utils/activity"
import { getUnitCount } from "../../../utils/unit"

const Wrap = styled.div`
  padding: 30px;
  background: #fff;

  form {
    max-width: 600px;
  }
`

const EditWork = ({
 }) => {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const workRef = doc(
    firestore,
    COLLECTIONS.WORK,
    location.state.id,
  )

  const mutation = useFirestoreDocumentMutation(workRef)

  const handleEdit = async (value) => {
    const payload = {
      ...location.state,
      ...value,
      updated_at: new Date(),
      unit_count: getUnitCount(value.tooth)
    }
    mutation.mutate(payload)
    await createActivity(location.state.code, ACTIVITY_ITEMS.ENTRY_UPDATED)
    history.goBack()
  }

  return (
    <Wrap>
      <h2>Edit Entry</h2>
      <Form
          name="new-work-entry"
          layout="vertical"
          onFinish={handleEdit}
          initialValues={location.state}
        >
          <Form.Item
            label="Doctor Name"
            name="doctor"
            rules={[{ required: true, message: "Required" }]}
          >
            <DoctorSearch />
          </Form.Item> 
          <Form.Item
            label="Tooth Selector"
            name="tooth"
            rules={[{ required: true, message: "Required" }]}
          >
            <ToothSelector />
          </Form.Item> 
          <Form.Item
            label="Work Type"
            name="work_type"
            rules={[{ required: true, message: "Required" }]}
          >
            <WorkTypeDropdown placeholder="Select a work type"/>
          </Form.Item> 
          <Form.Item
            label="Notes"
            name="notes"
          >
            <Input placeholder="Add notes about the work like delivery details"/>
          </Form.Item> 
          <Form.Item
            name={["patientInfo", "name"]}
            label="Name"
          >
            <Input placeholder="Patient's Name"/>
          </Form.Item>
          <Form.Item
            name={["patientInfo", "phone"]}
            label="Phone"
          >
            <Input placeholder="Patient's Phone"/>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
    </Wrap>
  )
}

export default EditWork