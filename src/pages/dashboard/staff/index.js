import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Row, Col, Button, Table } from "antd"
import { useHistory } from "react-router-dom"
import { collection } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { COLLECTIONS } from "../../../consts"
import { getListFromFirebase } from "../../../utils/unit"
import { useFirestoreQuery } from "@react-query-firebase/firestore"

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const StaffListView = ({ }) => {
  const history = useHistory()
  const ref = collection(firestore, COLLECTIONS.STAFF);

  const staffData = useFirestoreQuery([COLLECTIONS.STAFF], ref);
  const staffList = getListFromFirebase(staffData)
  console.log({ staffList });

   return (
    <Wrap>
      <Row>
        <Col flex={1}>
          <h2>All Staff</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={() => { history.push("/dashboard/staff/new") }}>
            New Staff
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: "full_name",
            key: "full_name",
          },
          {
            title: 'Email',
            dataIndex: "email",
            key: "email",
          },
          {
            title: 'Phone',
            dataIndex: "phone",
            key: "phone",
          }
        ]}
        dataSource={staffList}
      />
    </Wrap>
  )
}

export default StaffListView