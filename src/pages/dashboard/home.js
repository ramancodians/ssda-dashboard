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
  const ref = collection(firestore, COLLECTIONS.WORK);
  const [ stats, setStats ] = useState({})
  const mutation = useFirestoreCollectionMutation(ref);
  const workList = []
  const startDate = new Date()
    startDate.setUTCHours(0,0,0,0);

  useEffect(() => {
    getTotalWorkToday()
  }, [])

  const WorkData = useFirestoreQuery([COLLECTIONS.WORK], ref);

  const getTotalWorkToday = async () => {
    console.log("adasdasds");
    const q = query(
      collection(firestore, COLLECTIONS.WORK),
      where("created_on", ">", startDate)
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
        const recievedObj = item.overall_status.find(x => x.value === "received")
        const productionObj = item.overall_status.find(x => x.value === "in-production")
        const readyObj = item.overall_status.find(x => x.value === "ready")
        if (!isEmpty(recievedObj) && recievedObj.completed_on) {
          pendingCount = pendingCount + 1
        }
        if (!isEmpty(productionObj) && productionObj.completed_on) {
          inProduction = inProduction + 1
        }
        if (!isEmpty(readyObj) && readyObj.completed_on) {
          readyCount = readyCount + 1
        }
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

  if (WorkData.data && WorkData.data) {
    WorkData.data.docs.map(x => {
      workList.push(
        {
          ...x.data(),
          id: x.id,
        }
      )
    })
  }
   return (
    <Wrap>
      <h2>Overview</h2>
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
      <Table
        columns={[
          {
            title: 'Date',
            dataIndex: "created_on",
            render: (record) => (
              <Space>
                {format(record.toDate(), "hh:mm | dd MMM")}
              </Space>
            ),
          },
          {
            title: 'Doctor',
            dataIndex: ["doctor", "full_name"],
            key: ["doctor", "full_name"],
          },
          {
            title: 'Work',
            dataIndex: "tooth",
            key: "tooth",
            render: (record) => (
              <Space>
                <ToothSelector value={Object.keys(record).map(key => record[key])} viewOnly/>
              </Space>
            )
          },
          {
            title: 'Status',
            render: (record) => (
              <Space>
                <Tag>
                  Recieved
                </Tag>
              </Space>
            )
          },
          {
            title: 'Actions',
            dataIndex: "tooth",
            key: "tooth",
            render: (record) => (
              <Space>
                <Button>
                  View
                </Button>
              </Space>
            )
          },
        ]}
        dataSource={workList}
      />
        
    </Wrap>
  )
}

export default Home