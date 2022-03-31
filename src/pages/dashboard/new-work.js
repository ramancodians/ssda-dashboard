import { Button, Form, Input, Select, Steps, Step } from "antd"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ToothSelector from "./../../comps/form/tooth-selector"
import DoctorSearch from "../../comps/form/doctor_search"
import WorkTypeDropdown from "../../comps/form/workTypeDropdown"
import { COLLECTIONS } from "../../consts"
import { firestore } from "../../config/firebase"
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { collection } from "firebase/firestore"
import { generateNewCode, getCurrentWorkCode, updateWorkCode } from "../../utils/workcode"
import { get } from "lodash"
import { HeartFilled, FullscreenExitOutlined } from "@ant-design/icons"

const Wrap = styled.div`
  padding: 20px;
  margin: 20px auto;
  background: #fff;
  max-width: 900px;
  margin: 0px auto;
`

const Step2Wrap = styled.div`
  text-align: center;
  border-radius: 20px;
  border: 1px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  > h1 {
    font-size: 60px;
  }
`

const Step3Wrap = styled.div`
  
`

const FieldValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 5px;
  > p {
    flex: 1;
    margin: 0px;
  }
  span {
    text-align: right;
  }
`


const NewWork = () => {
  const [ workcode, setWorkCode ] = useState("A01")
  const [ basicFormData, setBasicForm ] = useState()
  const [ patientForm, setPatientForm ] = useState()
  const [ step, setStep ] = useState(0)
  const ref = collection(firestore, COLLECTIONS.WORK);
  const mutation = useFirestoreCollectionMutation(ref);

  const SUMMARY_KEYS = [
    { data: basicFormData, label: "Doctor Name", key: "doctor.full_name" },
    { data: basicFormData, label: "Phone", key: "doctor.phone" },
    { data: basicFormData, label: "Clinic Name", key: "doctor.clinic_name" },
  ]

  useEffect(() => {
    getWorkCode()
  }, [])

  const getWorkCode = async () => {
    const oldWorkCode = await getCurrentWorkCode()
    const newCode = generateNewCode(oldWorkCode)
    setWorkCode(newCode)
  }

  const next = () => {
    setStep(prevVal => {
      return prevVal + 1
     })
  }

  const basicFormSubmit = async (values) => {
    try {
      setBasicForm({
        ...values
      })
      next()
      // mutation.mutate({
      //   ...values,
      //   created_on: new Date(),
      //   code: workcode,
      // })
      // await updateWorkCode(workcode)
    } catch (error) {
      console.log(error);
    }
  }

  const handlePatientInfo = (values) => {
    setPatientForm(values)
    next()
  }

  console.log({ basicFormData });

  return (
    <Wrap>
      <h3>New Work Entry</h3>
      <div style={{ padding: "20px 0px" }}>
        <Steps size="small" current={step} onChange={setStep}>
          <Steps.Step title="Basic Details" />
          <Steps.Step title="Physical Entry" />
          <Steps.Step title="Patient Info" />
          <Steps.Step title="Photo and Confirm" />
        </Steps>
      </div>
      {step === 0 && (
        <Form
          name="new-work-entry"
          layout="vertical"
          onFinish={basicFormSubmit}
          initialValues={basicFormData}
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
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      )}

      {step === 1 && (
        <Step2Wrap>
          <h2>Write the code on the Model</h2>
          <h1>{workcode}</h1>
          <Button onClick={next} type="primary">
            I have written the code
          </Button>
        </Step2Wrap>
      )}

      {step === 2 && (
        <Step3Wrap>
          <h3>Patient Info</h3>
          <Form
            layout="vertical"
            onFinish={handlePatientInfo}
            initialValues={patientForm}
          >
            <Form.Item
              name="name"
              label="Name"
            >
              <Input placeholder="Patient's Name"/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
            >
              <Input placeholder="Patient's Phone"/>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Step3Wrap>
      )}
      {step === 3 && (
        <Step3Wrap>
          <h2>Summary</h2>
          {SUMMARY_KEYS.map((row, index) => (
            <FieldValue key={index}>
              <p>
                {row.label}
              </p>
              <span>
                {get(row.data, row.key)}
              </span>
            </FieldValue>
          ))}
          
          <Button onClick={next} type="primary">
            Finish
          </Button>
        </Step3Wrap>
      )}
    </Wrap>
  )
}

export default NewWork
