import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS } from "../../../consts";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Table, Space, Tag, Button, Row, Col } from "antd";
import { rupeeFormatter, getPricing } from "../../../utils/rupee";
import { format, formatDistanceToNow } from "date-fns";
import ToothSelector from "../../../comps/form/tooth-selector";
import { useHistory } from "react-router-dom";
import { getLatestStatus, getListFromFirebase, getColorsAndIconForStatus } from "../../../utils/unit";
import WorkList from "../../../comps/workList";

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const DocInfo = styled.div`
  > p {
    margin: 0px;
  } 
`

const TimeWrap = styled.div`
  
`

const Addwork = ({ }) => {
  const entryQuery = query(
    collection(firestore, COLLECTIONS.WORK),
    orderBy("created_on", "desc")
  )
  const history = useHistory()
  const workData = useFirestoreQuery([COLLECTIONS.WORK], entryQuery);
  const data = getListFromFirebase(workData)
   return (
    <Wrap>
      <Row>
        <Col>
          <h2>
            All Entries
          </h2>
        </Col>
      </Row>
     <WorkList data={data} />
    </Wrap>
  )
}

export default Addwork