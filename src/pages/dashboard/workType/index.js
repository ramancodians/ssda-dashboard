import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Row, Col, Button, Modal, Form, Input, Radio, Table, Space, Typography } from "antd"
import { EditOutlined, CloseCircleOutlined, ExclamationCircleOutlined, PlusCircleFilled } from "@ant-design/icons"
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { COLLECTIONS } from "../../../consts";
import { firestore } from "../../../config/firebase";
import { rupeeFormatter } from "../../../utils/rupee";

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`
const WorkWrap = styled.div`
  
`

const WorkItem = styled.div`
  
`

const StepsWrap = styled.div`
  .ant-form-item {
    margin-bottom: 5px;
  }
`

const Pricings = ({ }) => {
  const [ isShowNewWorkTypeModal, setIsShowNewWorkTypeModal ] = useState(false)
  const workTypeRef = collection(firestore, COLLECTIONS.WORK_TYPES);
  const mutation = useFirestoreCollectionMutation(workTypeRef);
  const workList = []

  // Loader
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
  
  const handleAdd = (values) => {
    console.log(values);
    mutation.mutate({
      ...values,
      created_on: new Date(),
    })
    setIsShowNewWorkTypeModal(false)
    workData.refetch()
  }

  const removeItem = async (uid) => {
    Modal.confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const removeWorkCollection = collection(firestore, COLLECTIONS.WORK_TYPES)
        const removeWorkDoc = doc(removeWorkCollection, uid)
        deleteDoc(removeWorkDoc)
        workData.refetch()
      },
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: "price",
      render: (record) => (
        <Space>
          <p>{rupeeFormatter(record)}</p>
        </Space>
      )
    },
    {
      title: 'Price Type',
      dataIndex: 'pricing_type',
      key: 'pricing_type',
    },
    {
      title: 'Action',
      key: 'action',
      render: (props) => (
        <Space size="middle">
          <Button icon={<CloseCircleOutlined />} onClick={() => { removeItem(props.id) }}/>
        </Space>
      )
    },
  ];

   return (
    <Wrap>
      <Row>
        <Col flex={1}>
          <h2>Work Types</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={() => { setIsShowNewWorkTypeModal(true) }}>
            New Work Type
          </Button>
        </Col>
      </Row>

      {workData.isLoading && (
        <h1>Loading..</h1>
      )}

      {workList && workList.length > 0 && (
        <WorkWrap>
          <Table
            dataSource={workList}
            columns={columns}
            handleRemove={removeItem}
          />
        </WorkWrap>
      )}
      {isShowNewWorkTypeModal && (
        <Modal
          visible={true}
          title="Adding new Work Type"
          footer={null}
          onCancel={() => { setIsShowNewWorkTypeModal(false) }}
          initialValues={{
            steps: [{}]
          }}
        >
          <Form
            layout="vertical"
            onFinish={handleAdd}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Zirconia, ceramic etc."/>
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="1,000"/>
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

            <Form.List
              name="steps"
              label="Production Steps"
            >
              {(fields, { add, remove }) => (
                <StepsWrap>
                  <h4>Production Steps</h4>
                  <Typography.Text type="secondary">
                    Add Steps of tasks to finish this type of entry. This will useful when updating status for this kinda of work in future.
                  </Typography.Text>
                  <br/>
                  <br/>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...field}
                    >
                      <Row align="center" justify="center">
                        <Col center>
                          <p style={{ marginTop: 5, marginRight: 10 }}>
                            ({index + 1})
                          </p>
                        </Col>
                        <Col flex={1}>
                          <Input placeholder="Steps"/>
                        </Col>
                        <Col>
                          <Button danger onClick={() => { remove(field.name) }} icon={<CloseCircleOutlined />} />
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Row>
                    <Col flex={1} />
                    <Col>
                      <Button onClick={add} icon={<PlusCircleFilled />}>
                        Add Step
                      </Button>
                    </Col>
                  </Row>
                </StepsWrap>
              )}
            </Form.List>

            <Form.Item
              name="color"
              label="Color Code"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input type="color" style={{ width: 50, height: 50, padding: 0 }}/>
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Add New Work
            </Button>
          </Form>
        </Modal>
      )}
    </Wrap>
  )
}

export default Pricings