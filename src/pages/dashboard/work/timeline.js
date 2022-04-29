import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { collection, where, query, orderBy } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { COLLECTIONS, DATE_FORMAT } from "../../../consts"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { getListFromFirebase } from "../../../utils/unit"
import { Timeline } from "antd"
import { capitalize, isEmpty } from "lodash"
import { format } from "date-fns"

const Wrap = styled.div`
  width: 400px;

  > h3 {
    color: #999;
    margin-bottom: 20px;
  }
`

const TimeLineEle = ({ code }) => {
   const timelineRef = query(
    collection(firestore, COLLECTIONS.ACTIVITY),
    where("code", "==", code),
    orderBy("at", "desc")
   )

   const timelineQuery = useFirestoreQuery(`WORK_${code}`, timelineRef)
   const acticityData = getListFromFirebase(timelineQuery)

   const getHelpingText = (other) => {
    if (isEmpty(other) || !other) {
      return ""
    }
    if (!isEmpty(other) && other.status) {
      return `${other.status}`
    }
    return ""
   }

   return (
    <Wrap>
      <h3>Timeline</h3>
      <Timeline>
        {acticityData && acticityData.length > 0 && acticityData.map(item => (
          <Timeline.Item key={item.id}>
            <h3 style={{ margin: 0 }}>{`${capitalize(item.task)} ${getHelpingText(item.other)}`}</h3>
            <h5 style={{ margin: 0 }}>{`at ${format(item.at.toDate(), DATE_FORMAT)}`}</h5>
          </Timeline.Item>
        ))}
      </Timeline>
      
    </Wrap>
  )
}

export default TimeLineEle