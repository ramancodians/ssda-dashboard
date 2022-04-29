import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { ArrowLeftOutlined } from '@ant-design/icons'
import { query, collection, doc } from "firebase/firestore"
import { firestore } from "../../../config/firebase"
import { COLLECTIONS } from "../../../consts"
import { useParams, useHistory } from "react-router-dom"
import { useFirestoreDocument } from "@react-query-firebase/firestore"
import { Row, Col, Space, Button } from "antd"
import WorkByDoctor from "./work-by-doctor"

const Wrap = styled.div`
  background: #fff;
  padding: 20px; 
`
const BasicInfo = styled.div`
  margin-top: 30px;
`

const Dataview = styled.div`
  h5 {
    color: #799;
  }

  p {
    font-size: 18px;
  }
`

const DoctorFullDetails = ({ }) => {
  const params = useParams()
  const history = useHistory()
  const CollRef = collection(firestore, COLLECTIONS.DOCTORS)
  const DocRef = doc(CollRef, params.docId)
  const docLoader = useFirestoreDocument(["doctor", params.docId], DocRef)
  const docData = docLoader && docLoader.data && docLoader.data.data()

   return (
    <Wrap>
      <Row>
        <Col>
          <div style={{ marginRight: "20px" }}>
            <Button icon={<ArrowLeftOutlined />} danger onClick={() => { history.goBack() }}>
              Go Back
            </Button>
          </div>
        </Col>
        <Col flex={1}>
          <h3>
            Doctor Details
          </h3>
        </Col>
        <Col>
          <Space>
            <Button>
              Edit
            </Button>
          </Space>
        </Col>
      </Row>

      {docData && (
        <React.Fragment>
          <BasicInfo>
            <Row gutter={20}>
              <Col flex={1}>
                <Dataview>
                  <h5>Full Name</h5>
                  <p>
                    {docData.full_name}
                  </p>
                </Dataview>
              </Col>
              <Col flex={1}>
                <Dataview>
                  <h5>Clinic Name</h5>
                  <p>
                    {docData.clinic_name}
                  </p>
                </Dataview>
              </Col>
              <Col flex={1}>
                <Dataview>
                  <h5>Phone</h5>
                  <p>
                    {docData.phone}
                  </p>
                </Dataview>
              </Col>
              <Col flex={1}>
                <Dataview>
                  <h5>City</h5>
                  <p>
                    {docData.city}
                  </p>
                </Dataview>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col>
                <Dataview>
                  <h5>Address</h5>
                  <p>
                    {`${docData.street_address || ""}, ${docData.city || ""}, ${docData.state}`}
                  </p>
                </Dataview>
              </Col>
              <Col flex={1}>
                <Dataview>
                  <h5>Note</h5>
                  <p>
                    {`${docData.notes || ""}`}
                  </p>
                </Dataview>
              </Col>
            </Row>
          </BasicInfo>
          <WorkByDoctor docId={params.docId}/>
        </React.Fragment>
      )}
    </Wrap>
  )
}

export default DoctorFullDetails