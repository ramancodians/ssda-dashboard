import { Button, Space, Table } from "antd"
import { format, formatDistanceToNow } from "date-fns"
import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import styled from "styled-components"
import { getPricing } from "../utils/rupee"
import { getColorsAndIconForStatus, getLatestStatus } from "../utils/unit"
import ToothSelector from "./form/tooth-selector"

const Wrap = styled.div`
  
`
const DocInfo = styled.div`
  > p {
    margin: 0px;
  } 
`

const TimeWrap = styled.div`
  
`

const WorkList = ({
  data
}) => {
  const history = useHistory()
  return (
    <Wrap>
     <Table
        columns={[
          {
            title: 'Date',
            dataIndex: "created_on",
            key: "created_on",
            render: (record) => (
              <Space>
                <TimeWrap>
                  <p>
                    {format(record.toDate(), "hh:mm | dd MMM")}
                  </p>
                  <h4>
                    {formatDistanceToNow(record.toDate())} ago
                  </h4>
                </TimeWrap>
              </Space>
            ),
          },
          {
            title: 'Code',
            dataIndex: "code",
            key: "code",
            render: (record) => (
              <Space>
                {record}
              </Space>
            ),
          },
          {
            title: 'Doctor',
            dataIndex: "doctor",
            key: "doctor",
            render: (doctor) => (
              <DocInfo>
                <p>{doctor.full_name}</p>
                <p>{doctor.clinic_name || "N/a"}</p>
              </DocInfo>
            )
          },
          {
            title: 'Work',
            key: "tooth",
            render: (record) => (
              <Space>
                <ToothSelector
                  value={Object.keys(record.tooth).map(key => record.tooth[key])}
                  viewOnly
                  workType={record.work_type}
                />
              </Space>
            )
          },
          {
            title: 'Price',
            render: (record) => (
              <Space>
                {getPricing(record.work_type, record.unit_count)}
              </Space>
            )
          },
          {
            title: 'Status',
            render: (record) => (
              <Space>
                {getColorsAndIconForStatus(getLatestStatus(record.work_status))}
              </Space>
            )
          },
          {
            title: 'Actions',
            key: "tooth",
            render: (record) => (
              <Space>
                <Button onClick={() => { history.push(`/dashboard/entry/${record.code}`) }}>
                  View Details
                </Button>
              </Space>
            )
          },
        ]}
        dataSource={data}
      />
  </Wrap>
  )
}

export default WorkList