import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS } from "../../../consts";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Table, Space, Row, Button, Col } from "antd";
import { rupeeFormatter } from "../../../utils/rupee";
import { getListFromFirebase } from "../../../utils/unit";
import { useHistory } from "react-router-dom";

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const DoctorAbout = styled.div`
  
`

const Addwork = ({ }) => {
  const history = useHistory()
  const ref = collection(firestore, COLLECTIONS.DOCTORS);
  const mutation = useFirestoreCollectionMutation(ref);

  const doctorData = useFirestoreQuery([COLLECTIONS.DOCTORS], ref);

  const doctorList = getListFromFirebase(doctorData)

  console.log({ doctorList  });
   return (
    <Wrap>
      <Row>
        <Col flex={1}>
          <h2>
            All Doctors
          </h2>
        </Col>
        <Col>
          <Button type="primary" onClick={() => { history.push("/dashboard/doctors/new") }}>
            New Doctor
          </Button>
        </Col>
      </Row>
      {doctorList && doctorList.length > 0 && (
        <Table
          columns={[
            {
              title: 'Docto',
              key: 'doctor_details',
              render: (record) => (
                <Space>
                  <DoctorAbout>
                    <h4>
                      {record.full_name}
                    </h4>
                    <h4>{record.phone}</h4>
                    <h4>{record.clinic_name}</h4>
                  </DoctorAbout>
                </Space>
              )
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Pending Bill',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Actions',
              key: "actions",
              render: (record) => (
                <Space>
                  <Button onClick={() => { history.push(`/dashboard/doctors/view/${record.id}`) }}>
                    View Details
                  </Button>
                </Space>
              )
            },
          ]}
          dataSource={doctorList}
        />
      )}
    </Wrap>
  )
}

export default Addwork