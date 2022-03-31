import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS } from "../../../consts";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Table, Space, Tag, Button } from "antd";
import { rupeeFormatter } from "../../../utils/rupee";
import { format } from "date-fns";
import ToothSelector from "../../../comps/form/tooth-selector";

const Wrap = styled.div`
  
`

const Addwork = ({ }) => {
  const ref = collection(firestore, COLLECTIONS.WORK);
  const mutation = useFirestoreCollectionMutation(ref);
  const workList = []

  const workData = useFirestoreQuery([COLLECTIONS.WORK], ref);

  if (workData.data) {
    workData.data.docs.map(x => {
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
      <h1>Entries</h1>
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

export default Addwork