import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Card, Table, Space, Button, Tag } from "antd"
import { collection } from "firebase/firestore"
import { firestore } from "../../config/firebase"
import { COLLECTIONS } from "../../consts"
import { useFirestoreQuery, useFirestoreCollectionMutation } from "@react-query-firebase/firestore"
import { format } from "date-fns"
import ToothSelector from "../../comps/form/tooth-selector"

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
  const mutation = useFirestoreCollectionMutation(ref);
  const workList = []

  const WorkData = useFirestoreQuery([COLLECTIONS.WORK], ref);

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
        ₹20,000
        </Card>
        <Card title="Units">
          20
        </Card>
        <Card title="New">
          10
        </Card>
        <Card title="Delivered">
          15
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