import React, { useState, userEffect, useEffect } from "react"
import styled from "styled-components"
import { Card, Table, Space, Button, Tag } from "antd"
import { collection, where, getDocs, query } from "firebase/firestore"
import { firestore } from "../../config/firebase"
import { COLLECTIONS } from "../../consts"
import { useFirestoreQuery, useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { format } from "date-fns"
import ToothSelector from "../../comps/form/tooth-selector"
import { getPricing, deformatCurrency, rupeeFormatter } from "../../utils/rupee"
import { isEmpty } from "lodash"
import { getListFromFirebase } from "../../utils/unit"
import WorkList from "../../comps/workList"

const Wrap = styled.div`
  
`

const StatusWrap = styled.div`
  display: flex;
  gap: 20px;

  > div.ant-card {
    flex: 1;
  }
`

const Home = ({ }) => {
  const [ stats, setStats ] = useState({})

  const startDate = new Date()
    startDate.setUTCHours(0,0,0,0)

  const entryQuery = query(
    collection(firestore, COLLECTIONS.WORK),
    where("created_on", ">", startDate)
  )
  
  useEffect(() => {
    getTotalWorkToday()
  }, [])



  const WorkData = useFirestoreQuery([COLLECTIONS.WORK], entryQuery);

  const workList = getListFromFirebase(WorkData)

  const getTotalWorkToday = async () => {
    const q = query(
      collection(firestore, COLLECTIONS.WORK),
      where("created_on", ">", startDate),
    )
    const snap = await getDocs(q)
    const list = snap.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
    let totalPriceLocal = 0
    let totalUnitLocal = 0
    let pendingCount = 0
    let inProduction = 0
    let readyCount = 0
    if (list && list.length > 0) {
      list.map(item => {
        totalPriceLocal = totalPriceLocal + deformatCurrency(getPricing(item.work_type, item.unit_count))
        totalUnitLocal = totalUnitLocal + item.unit_count
        //const recievedObj = item.steps.find(x => x.compel === "received")
        // const productionObj = item.overall_status.find(x => x.value === "in-production")
        // const readyObj = item.overall_status.find(x => x.value === "ready")
        // if (!isEmpty(recievedObj) && recievedObj.completed_on) {
        //   pendingCount = pendingCount + 1
        // }
        // if (!isEmpty(productionObj) && productionObj.completed_on) {
        //   inProduction = inProduction + 1
        // }
        // if (!isEmpty(readyObj) && readyObj.completed_on) {
        //   readyCount = readyCount + 1
        // }
      })
    }
    setStats({
      totalPrice: totalPriceLocal,
      totalUnits: totalUnitLocal,
      totalInPendind: pendingCount,
      totalInProduction: inProduction,
      totalInReady: readyCount,
    })
  }

   return (
    <Wrap>
      <h2>Today's Overview</h2>
      <StatusWrap>
        <Card title="Todays Est.">
          <h2>{rupeeFormatter(stats.totalPrice || 0)}</h2>
        </Card>
        <Card title="Units">
          <h2>{stats.totalUnits} Units</h2>
        </Card>
        <Card title="Pending">
          <h2>{stats.totalInPendind}</h2>
        </Card>
        <Card title="In Production">
          <h2>{stats.totalInProduction}</h2>
        </Card>
        <Card title="Ready">
          <h2>{stats.totalInReady}</h2>
        </Card>
      </StatusWrap>
      <br />
      <br />
      {WorkData.isFetching ? (
        <h1>Loading...</h1>
      ) : (
        <WorkList data={workList}/>
      )}
    </Wrap>
  )
}

export default Home