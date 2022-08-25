import { Button, Col, DatePicker, Input, Row } from "antd"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`

const Billing = ({ }) => {
  // const [ , ] = useState()
  // useEffetc(() => {
    
  // }, [])
  return (
    <Wrap>
      <Row gutter={20}>
        <Col flex={1}>
          <Input placeholder="Doctor Name"/>
        </Col>
        <Col>
          <DatePicker
            placeholder="Start Date"
          />
        </Col>
        <Col>
          <DatePicker
            placeholder="End Date"
          />
        </Col>
        <Col>
        <Button type="primary">
          Generate Bill
        </Button>
        </Col>
      </Row>
     
    </Wrap>
  )
}

export default Billing