import React, { useState, userEffect, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { firestore, auth } from "../../config/firebase"
import { COLLECTIONS, ACTIVITY_ITEMS } from "../../consts"
import { collection, query, where, doc, updateDoc } from "firebase/firestore"
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore"
import ToothSelector from "../../comps/form/tooth-selector"
import { Modal } from "antd"
import successSound from "./../../sound/success.mp3"
import { createActivity } from "../../utils/activity"


const SUCCESS_SOUND_AUDIO =  new Audio(successSound)

const Wrap = styled.div`
  
`

const WorkWrap = styled.div`
  padding: 20px;
  background: #fff;
`

const StatusButton = styled.div`
  
`

const WorkStatusWrap = styled.div`
  margin-top: 20px;
`

const Step = styled.div`
  background: #ccc;
  border-radius: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  min-height: 60px;
  cursor: pointer;

  ${props => props.isDone && `
    background: green;
    h1 {
      color: #fff;
    }
  `}

  > h1 {
    margin: 0px;
    font-size: 20px;
  }
`

const EditStatus = ({ }) => {
  const [ updatingStatus, setUpdatingStatus ] = useState()
  const params = useParams()
  const q = query(
    collection(firestore, COLLECTIONS.WORK),
    where("code", "==", params.code)
  )
  let workData
  const workQuery = useFirestoreQuery([COLLECTIONS.WORK, params.code], q);
  if (workQuery.isSuccess) {
    const list = workQuery.data.docs.map(x => ({
      ...x.data(),
      id: x.id,
    }))
    workData = list[0]
  }

  const confirmComplete = (status) => {
    Modal.confirm({
      title: 'Are you sure?',
      onOk() {
        updateWorkStatus(status)
        setUpdatingStatus(status.label)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  const updateWorkPayload = (step, userPayload) => {
    if (step) {
      const stepIndex = workData.work_status.findIndex(x => step.value === x.value)
      const newSteps = [
        ...workData.work_status,
      ]
      newSteps[stepIndex] = {
        ...newSteps[stepIndex],
        completed_on: new Date(),
        by: userPayload,
      }
      return newSteps
    }
  }

  const updateWorkStatus = async (step) => {
    console.log({ id: workData.id });
    const ref = doc(
      firestore,
      COLLECTIONS.WORK,
      workData.id)
    const { displayName, email, uid } = auth.currentUser
    const userPayload = {
      displayName: displayName || "",
      uid,
      email,
    }
    const upldatePayload = {
      updated_on: new Date(),
      work_status: updateWorkPayload(step, userPayload) || workData.work_status
    }
    await updateDoc(ref, upldatePayload)
    await createActivity(params.code, ACTIVITY_ITEMS.CHANGED_WORK_STATUS, {
      status: step.value,
    })
    workQuery.refetch()
    setUpdatingStatus()
    SUCCESS_SOUND_AUDIO.play()
  }

   return (
    <Wrap>
      {workData ? (
        <React.Fragment>
          <WorkWrap>
            <h2>{workData.code}</h2>
            <ToothSelector value={workData.tooth} viewOnly/>
            <WorkStatusWrap>
              {workData.work_status.map(step => (
                <Step
                  key={step.value}
                  onClick={() => { confirmComplete(step) }}
                  isDone={step.completed_on && step.by}
                >
                  <h1>{updatingStatus === step.label ? "Loading..." : step.label}</h1>
                </Step>
              ))}
            </WorkStatusWrap>
          </WorkWrap>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Loading...</h2>
        </React.Fragment>
      )}
    </Wrap>
  )
}

export default EditStatus