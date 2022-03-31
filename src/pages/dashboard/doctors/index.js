import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { COLLECTIONS } from "../../../consts";
import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../../config/firebase";
import { Table, Space } from "antd";
import { rupeeFormatter } from "../../../utils/rupee";

const Wrap = styled.div`
  
`

const Addwork = ({ }) => {
  const ref = collection(firestore, COLLECTIONS.DOCTORS);
  const mutation = useFirestoreCollectionMutation(ref);
  const doctorList = []

  const doctorData = useFirestoreQuery([COLLECTIONS.DOCTORS], ref);

  if (doctorData.data && doctorData.data) {
    doctorData.data.docs.map(x => {
      doctorList.push(
        {
          ...x.data(),
          id: x.id,
        }
      )
    })
  }
   return (
    <Wrap>
      <h1>Doctors</h1>
      {doctorList && doctorList.length > 0 && (
        <Table
          columns={[
            {
              title: 'Name',
              dataIndex: 'full_name',
              key: 'full_name',
            },
            {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone',
            },
            {
              title: 'Actions',
              dataIndex: 'price',
              key: "price",
              render: (record) => (
                <Space>
                  <p>{rupeeFormatter(record)}</p>
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