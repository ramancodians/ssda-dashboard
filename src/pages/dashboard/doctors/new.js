import { Form, Input } from "antd"
import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
  background: #fff;
  padding: 20px;
`

class NewDoc extends React.PureComponent {
  state = {}

  componentDidMount() {
    // const {  } = this.props
  }

  render() {
    // const {  } = this.state
    // const {  } = this.props
    return (
      <Wrap>
        <h1>New Doctor</h1>
        <Form
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Clinic/Hospital"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Notes"
          >
            <Input.TextArea
              type="texh"
            />
          </Form.Item>
          

          
          
        </Form>
      </Wrap>
    )
  }
}

export default NewDoc
