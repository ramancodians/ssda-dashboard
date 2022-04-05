import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Row, Col, Button } from "antd"
import { useHistory } from "react-router-dom"

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const StaffListView = ({ }) => {
  const history = useHistory()

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
    </Wrap>
  )
}

export default StaffListView