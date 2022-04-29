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
  const workList = getListFromFirebase(workData)
  console.log({ workList });
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
            key: "created_on",
            render: (record) => (
              <Space>
                <TimeWrap>
                  <p>
                    {format(record.toDate(), "hh:mm | dd MMM")}
                  </p>
                  <h4>
                    {formatDistanceToNow(record.toDate())} ago
                  </h4>
                </TimeWrap>
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
            key: "tooth",
            render: (record) => (
              <Space>
                <ToothSelector
                  value={Object.keys(record.tooth).map(key => record.tooth[key])}
                  viewOnly
                  workType={record.work_type}
                />
              </Space>
            )
          },
          {
            title: 'Price',
            render: (record) => (
              <Space>
                {getPricing(record.work_type, record.unit_count)}
              </Space>
            )
          },
          {
            title: 'Status',
            render: (record) => (
              <Space>
                {getColorsAndIconForStatus(getLatestStatus(record.work_status))}
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