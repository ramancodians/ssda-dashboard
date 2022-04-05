import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { collection } from "firebase/firestore"
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { Select, Row, Col, Button, Form, Radio, Input, Typography } from "antd"
import { firestore } from "../../config/firebase"
import { COLLECTIONS } from "../../consts";
import { rupeeFormatter } from "../../utils/rupee";
import Modal from "antd/lib/modal/Modal";

const Text = Typography.Text

const Wrap = styled.div`
  
`

const WorkTypeDropdown = ({ onChange, value, placeholder }) => {
  const [ selectedWork, selectWork ] = useState(value)
  const [ isShowPriceChangeModal, setisShowPriceChangeModal ] = useState(false)
  const workTypeRef = collection(firestore, COLLECTIONS.WORK_TYPES);
  const mutation = useFirestoreCollectionMutation(workTypeRef);
  const workList = []

  const workData = useFirestoreQuery([COLLECTIONS.WORK_TYPES], workTypeRef, {
    refetchOnWindowFocus: "always"
  });

  if (workData.data && workData.data) {
    workData.data.docs.map(x => {
      workList.push(
        {
          ...x.data(),
          id: x.id,
        }
      )
    })
  }

  const handleSelect = (row) => {
    const selectedItem = workList.find(x => x.id === row)
    console.log({  selectedItem });
    selectWork(selectedItem)
    onChange?.(
      selectedItem
    )
  }

  const handlePriceChange = (values) => {
    const newValue = {
      ...selectedWork,
      ...values,
      is_changed: true,
    }
    onChange?.({
      ...newValue,
    })
    selectWork(newValue)
    setisShowPriceChangeModal(false)
  }

  return (
     <Wrap>
        <Select
          onSelect={(row) => { handleSelect(row) }}
        >
          {workList && workList.map(option => (
            <Select.Option value={option.id} key={option.id} placeholder={placeholder}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
        {selectedWork && (
          <Row style={{ marginTop: 10 }}>
            <Col flex={1}>
              <p>
                <strong>{rupeeFormatter(selectedWork.price)}</strong> / <small>{selectedWork.pricing_type} </small>
                {selectedWork.is_forever === undefined ? (
                  <Text type="success">
                    Gloabl Pricing
                  </Text>
                ) : (
                  <React.Fragment>
                    {selectedWork.is_forever ? (
                      <Text type="danger">
                        Permanent Pricing
                      </Text>
                    ) : (
                      <Text type="warning">
                        Only for this work
                      </Text> 
                    )}
                  </React.Fragment>
                )}
              </p>
              <h6>Changing the pricng will notify the admins.</h6>
            </Col>
            <Col>
              <Button onClick={() => { setisShowPriceChangeModal(true) }}>
                Change
              </Button>
            </Col>
          </Row>
        )}

        {isShowPriceChangeModal && (
          <Modal
            title="Change Price"
            onCancel={() => { setisShowPriceChangeModal(false) }}
            visible={true}
            footer={null}
          >
            <Form
              onFinish={handlePriceChange}
              initialValues={value}
              layout="vertical"
            >
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="pricing_type"
                label="Pricing Type"
                rules={[{ required: true, message: "Required" }]}
              >
                <Radio.Group>
                  <Radio.Button value="Per Unit">Per Unit</Radio.Button>
                  <Radio.Button value="Fixed">Fixed</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="is_forever"
                label="Change Type"
                rules={[{ required: true, message: "Required" }]}
              >
                <Radio.Group>
                  <Radio.Button value={false}>Only for this entry</Radio.Button>
                  <Radio.Button value={true}>For future pricing as well</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Change
              </Button>
            </Form>
          </Modal>
        )}
     </Wrap>
  )
}

export default WorkTypeDropdown