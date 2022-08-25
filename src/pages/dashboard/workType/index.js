import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Row, Col, Button, Modal, Form, Input, Radio, Table, Space, Typography } from "antd"
import { EditOutlined, CloseCircleOutlined, ExclamationCircleOutlined, PlusCircleFilled } from "@ant-design/icons"
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { COLLECTIONS, PROGESS_STATUS } from "../../../consts";
import { firestore } from "../../../config/firebase";
import { rupeeFormatter } from "../../../utils/rupee";
import ColorTag from "../../../comps/colorTag";
import { srLatn } from "date-fns/locale";

const Wrap = styled.div`
  padding: 20px;
  background: #fff;
`
const WorkWrap = styled.div`
  p {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
`

const StepsWrap = styled.div`
  .ant-form-item {
    margin-bottom: 5px;
  }
`

const StepsList = styled.ul`
  margin: 0px;
  list-style: none;
  font-size: 12px;
  padding: 0px;
  font-weight: 600;
  span {
    color: #888;
    font-weight: 500;
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

  const metaMetaDataInStatus = (step, isInProduction = false) => {
    return {
      step,
      completed_on: null,
      isInProduction,
    }
  }
  
  const handleAdd = (values) => {
    const payload = {
      ...values,
      steps: [
        ...PROGESS_STATUS.PREPEND.map(x => metaMetaDataInStatus(x.label, false)),
        ...values.steps.map(x => metaMetaDataInStatus(x, true)),
        ...PROGESS_STATUS.APPEND.map(x => metaMetaDataInStatus(x.label, false)),
      ],
      created_on: new Date(),
    }
    mutation.mutate(payload)
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
      key: 'name',
      render: (record) => (
        <Space>
          <ColorTag color={record.color} />
          <p>{record.name}</p>
        </Space>
      )
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
      title: 'Steps',
      key: 'steps',
      render: (record) => (
        <Space>
          <StepsList>
            {record.steps.map((x, index) => (
              <li key={x.step}>
                {`${index + 1}. ${x.step}`}
                {x.isInProduction && (
                  <span>
                    (In Production)
                  </span>
                )}
              </li>
            ))}
          </StepsList>
        </Space>
      )
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
                    Add Steps of tasks to finish this type of entry. This will useful when updating status for type of work in future.
                  </Typography.Text>
                  <br/>
                  <br/>
                  {console.log(fields)}
                  <Row align="center" justify="center">
                    <Col center>
                      <p style={{ marginTop: 5, marginRight: 10 }}>
                        Start
                      </p>
                    </Col>
                    <Col flex={1}>
                      <Input placeholder="Steps" disabled value="Received by Lab"/>
                    </Col>
                  </Row>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...field}
                    >
                      <Row align="center" justify="center" gutter={10}>
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
                  <br />
                  <Row align="center" justify="center">
                    <Col center>
                      <p style={{ marginTop: 5, marginRight: 10 }}>
                        End
                      </p>
                    </Col>
                    <Col flex={1}>
                      <Input placeholder="Steps" disabled value="Received by Doctor"/>
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