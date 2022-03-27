import { Button, Form, Input, Select } from "antd"
import React from "react"
import styled from "styled-components"
import ToothSelector from "./../../comps/form/tooth-selector"

const Wrap = styled.div`
  padding: 20px;
  margin: 20px auto;
  background: #fff;
  max-width: 900px;
  margin: 0px auto;
`

class NewWord extends React.PureComponent {
  state = {}

  componentDidMount() {
    // const {  } = this.props
  }

  render() {
    // const {  } = this.state
    // const {  } = this.props
    return (
      <Wrap>
        <h1>New Work Entry</h1>
        <Form
          name="new-work-entry"
          layout="vertical"
          onFinish={console.log}
        >
         <Form.Item
          label="Doctor Name"
         >
           <Select />
         </Form.Item> 
         <Form.Item
          label="Tooth Selector"
         >
           <ToothSelector />
         </Form.Item> 
         <Form.Item
          label="Work Type"
         >
           <Select />
         </Form.Item> 
         <Form.Item
          label="Notes"
         >
           <Input />
         </Form.Item> 
         <Button type="primary">
           Submit
         </Button>
        </Form>
      </Wrap>
    )
  }
}

export default NewWord
