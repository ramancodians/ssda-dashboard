import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Row, Col, Button, Modal, Form, Input, Radio, Table, Space } from "antd"
import { EditOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
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

  console.log({ workData });

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
          title="New work type"
          footer={null}
          onCancel={() => { setIsShowNewWorkTypeModal(false) }}
          initialValues={{}}
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
              <Input />
            </Form.Item>
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

            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Modal>
      )}
    </Wrap>
  )
}

export default Pricings