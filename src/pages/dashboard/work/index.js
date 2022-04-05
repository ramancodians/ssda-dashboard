import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS } from "../../../consts";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Table, Space, Tag, Button, Row, Col } from "antd";
import { rupeeFormatter } from "../../../utils/rupee";
import { format } from "date-fns";
import ToothSelector from "../../../comps/form/tooth-selector";
import { useHistory } from "react-router-dom";

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const DocInfo = styled.div`
  > p {
    margin: 0px;
  } 
`

const Addwork = ({ }) => {
  const ref = collection(firestore, COLLECTIONS.WORK);
  const mutation = useFirestoreCollectionMutation(ref);
  const history = useHistory()
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
      <Row>
        <Col>
          <h2>
            All Entries
          </h2>
        </Col>
      </Row>
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
            title: 'Code',
            dataIndex: "code",
            key: "code",
            render: (record) => (
              <Space>
                {record}
              </Space>
            ),
          },
          {
            title: 'Doctor',
            dataIndex: "doctor",
            key: "doctor",
            render: (doctor) => (
              <DocInfo>
                <p>{doctor.full_name}</p>
                <p>{doctor.clinic_name || "N/a"}</p>
              </DocInfo>
            )
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
            key: "tooth",
            render: (record) => (
              <Space>
                <Button onClick={() => { history.push(`/dashboard/entry/${record.code}`) }}>
                  View Details
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