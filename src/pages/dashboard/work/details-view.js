import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Row, Col, Select, Typography } from "antd"
import { firestore } from "../../../config/firebase"
import ToothView from "./../../../comps/form/tooth-selector"
import { COLLECTIONS, DATE_FORMAT } from "../../../consts"
import { collection, where, query, getDoc, getDocs } from "firebase/firestore"
import { useLocation, useParams } from "react-router-dom"
import { useFirestoreQuery } from "@react-query-firebase/firestore"
import { startCase } from "lodash"
import { format } from "date-fns"
import { getPricing } from "../../../utils/rupee"
import Timeline from "./timeline"

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const NonEditablefield = styled.div`
  border: 1px solid #777;
  margin-bottom: 30px;
`

const DataView = styled.div`
  border-bottom: 1px solid #777;
  padding: 10px;
  display: flex;
  align-items: center;
  p, h4 {
    margin: 0px;
  }
  p {
    color: #222;
    flex: 1;
  }
  > h4 {
    font-size: 18px;
  }
`



const DetailsView = () => {
  const params = useParams()
  const entryRef = query(collection(firestore, COLLECTIONS.WORK), where("code", "==", params.code))
  const entryHook = useFirestoreQuery([`${COLLECTIONS.WORK}_${params.code}`], entryRef)
  let entryData;

  if (entryHook.isSuccess) {
    const snap = entryHook.data.docs.map(x => ({
      ...x.data(),
      id: x.id,
    }))
    entryData = snap[0]
  }
  
   return (
    <Wrap>
      <Row>
        <Col flex={1}>
          <h3>Entry Details</h3>
        </Col>
        <Col style={{ width: 200 }}>
          <Select style={{ width: 200 }}>
            <Select.Option value="In Production">
              In production
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }} gutter={20}>
        <Col flex={1}>
        {entryData && (
          <React.Fragment>
            <h3>Basic Details</h3>
            <NonEditablefield>
              <DataView>
                <p>Code</p>
                <h4>
                  {entryData.code}
                </h4>
              </DataView>
              <DataView>
                <p>Added on</p>
                <h4>
                  {format(entryData.created_on.toDate(), DATE_FORMAT)}
                </h4>
              </DataView>
              <DataView>
                <p>Tooth</p>
                <ToothView value={entryData.tooth} viewOnly/>
              </DataView>
              <DataView>
                <p>Units</p>
                <h4>{entryData.unit_count || "N/a"}</h4>
              </DataView>
              <DataView>
                <p>Work Type</p>
                <h4>{entryData.work_type.name}</h4>
              </DataView>
              <DataView>
                <p>Pricing Type</p>
                <h4>{entryData.work_type.pricing_type}</h4>
              </DataView>
              <DataView>
                <p>Doctor name</p>
                <h4>
                  {entryData.doctor.full_name}
                </h4>
              </DataView>
              <DataView>
                <p>Clinic</p>
                <h4>
                  {entryData.doctor.clinic_name}
                </h4>
              </DataView>
            </NonEditablefield>
            <h3>Pricing</h3>
            <NonEditablefield>
              <DataView>
                <p>Total Price</p>
                <h4>
                  {getPricing(entryData.work_type, 2)}/-
                </h4>
              </DataView>
            </NonEditablefield>

            {entryData.patientInfo && (
              <React.Fragment>
                <h3>Patient Info</h3>
                <NonEditablefield>
                  <DataView>
                    <p>Name</p>
                    <h4>
                      {entryData.patientInfo.name}
                    </h4>
                  </DataView>
                  <DataView>
                    <p>Phone</p>
                    <h4>
                      {entryData.patientInfo.phone}
                    </h4>
                  </DataView>
                </NonEditablefield>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        </Col>
        <Col>
          <Timeline />
        </Col>
      </Row>
    </Wrap>
  )
}

export default DetailsView