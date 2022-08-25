import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { query, collection, where } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { COLLECTIONS } from "../../../consts"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { getListFromFirebase } from "../../../utils/unit"
import { useHistory } from "react-router-dom"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import WorkItem from "../../../comps/workList"

const Wrap = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin-top: 20px;
`

const WorkWrap = styled.div`
  
`

const NoWorkwrap = styled.div`
  text-align: center;
  color: red;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > h3 {
    margin-top: 20px;
  }
`

const WorkByDoctor = ({ docId }) => {
  const history = useHistory()
  const docWorkQuery = query(
    collection(firestore, COLLECTIONS.WORK),
    where("doctor.objectID", "==", docId),
  )

  const doctorWorkWatcher = useFirestoreQuery(["doctor", "work", docId], docWorkQuery)
  const workList = getListFromFirebase(doctorWorkWatcher)
  console.log({ workList, docId });

  
   return (
    <Wrap>
      <h3>Work</h3>
      {workList && workList.length > 0 && (
        <WorkItem data={workList}/>
      )}
      {workList && workList.length === 0 && (
        <NoWorkwrap>
          <ExclamationCircleOutlined style={{ fontSize: 60 }} />
          <h3>No Work</h3>
        </NoWorkwrap>
      )}
    </Wrap>
  )
}

export default WorkByDoctor