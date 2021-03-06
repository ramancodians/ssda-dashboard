import React, { useState } from "react"
import styled from "styled-components"
import { upperCase } from "lodash"
import { DENTAL_SHADES } from "./../../consts"
import { getUnitCount } from "../../utils/unit"
import { Row, Col } from "antd"

const Wrap = styled.div`
  width: 400px;
  ${props => props.viewOnly && `
    width: 100%;
    max-width: 400px;
  `}

  h6 {
    font-size: 12px;
  }

`

const InnerWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SectionWrap = styled.div`
  width: 50%;
  display: flex;
  padding: 5px;

  &:nth-child(1) {
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
  }
  &:nth-child(2) {
    border-bottom: 2px solid #333;
  }
  &:nth-child(3) {
    border-right: 2px solid #333;
  }
`

const TeethWrap = styled.div`
  flex: 1;
`

const Teeth = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-duration: 0.2s;

  ${props => props.isSelected && `
    background: green;
    color: #fff;
  `}

  ${props => props.viewOnly && `
    width: auto;
    height: auto;
    color: transparent;
    pointer-events: none;
    background: transparent;

    ${props.isSelected && `
      color: #333;
      font-weight: bold;
    `}
  `}

  &:hover {
    border: 1px solid #999;
  }
`


const createChart = () => {
  const fullList = {}
  for (let i = 1; i <= 4; i++) {
    const section = []
    for(let j = 1; j <= 8; j++) {
      
      section.push({
        name: j,
        shade: "",
        isSelected: false,
      })
    }
    fullList[i - 1] = i%2 ? section.reverse() : section
  }
  return fullList
}


const ToothSelector = ({ value, onChange, viewOnly, workType, ...props  }) => {
  const [ toothChart, settoothChart ] = useState(value || createChart())

  const onTeethSelect = (sectionIndex, teethIndex) => {
    const newChart = {...toothChart}
    newChart[sectionIndex][teethIndex].isSelected = !toothChart[sectionIndex][teethIndex].isSelected
    settoothChart(newChart)
    onChange?.(newChart)
  }

  return (
    <Wrap viewOnly={viewOnly}>
      <InnerWrap>
        {Object.values(toothChart).map((section, sectionIndex) => (
          <SectionWrap key={sectionIndex}>
            {section && section.map((teeth, teethIndex) => (
              <TeethWrap key={teeth.name} viewOnly={viewOnly}>
                <Teeth
                  isSelected={teeth.isSelected}
                  onClick={() => { onTeethSelect(sectionIndex, teethIndex) }}
                  viewOnly={viewOnly}
                >
                  {teeth.name}
                </Teeth>
              </TeethWrap>
            ))}
          </SectionWrap>
        ))}
      </InnerWrap>
      <Row>
        <Col flex={1}>
          <h6>Total Units: {getUnitCount(toothChart)}</h6>
        </Col>
        {workType && (
          <Col>
            <h6>Type: <strong>{workType.name}</strong></h6>
          </Col>
        )}
      </Row>
    </Wrap>
  )
}

export default ToothSelector