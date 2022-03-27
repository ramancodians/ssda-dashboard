import React, { useState } from "react"
import styled from "styled-components"

const Wrap = styled.div`
  
`

const Header = styled.div`
  
`

const InputWrap = styled.div`
  width: 500px;
  padding: 40px 0px;
  display: flex;
  flex-wrap: wrap;
`

const InputSectionWrap = styled.div`
  width: 50%;
  position: relative;
  &:nth-child(1) {
    border-bottom: 2px solid #444;
    border-right: 2px solid #444;
    input {
      text-align: right;
    }
  }
  &:nth-child(2) {
    border-bottom: 2px solid #444;
  }
  &:nth-child(3) {
    border-right: 2px solid #444;
    input {
      text-align: right;
    }
  }
`

const InputText = styled.input`
  letter-spacing: 20px;
  width: 100%;
  border: none;
  ${props => !props.isRight && `
    padding-left: 10px;
  `}
`

const ShadeSelectorWrap = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  pointer-events: none;
  top: -30px;
  padding-right: 10px;

  ${props => props.isRight ? `
    text-align: right;
  ` : `
    padding-right: 10px;
  `}

  ${props => props.isTop && `
    top: 30px;
  `}

  > span {
    border: 1px solid red;
    display: inline-block;
    margin: 0px 4px;
    width: 20px;
    height: 20px;

  }
`

const CHART = [
  [],
  [],
  [],
  [],
]

const ToothSelector = (props) => {
  const [ chatData, setChartData ] = useState(CHART)

  console.log(props);

  const handleUpdate = (index, input) => {
    const newData = [
      ...chatData,
    ]
    newData[index] = input
    setChartData(newData)
  }
  console.log(chatData);
  return (
    <Wrap>
      {/* <Header>
        <h5>Tooth Chart</h5>
      </Header> */}
      <InputWrap>
        {chatData.map((x, index) => (
          <InputSectionWrap key={index}>
            <InputText
              isRight={!(index%2)} isTop={index > 1}
              onChange={(e) => { handleUpdate(index, e.target.value) }}
            />
            {console.log("X => ", x)}
            {x && x.length > 0 && (
              <ShadeSelectorWrap isRight={!(index%2)} isTop={index > 1}>
                {x.length > 0 && x.split("").map(y => (
                  <span key={y}></span>
                ))}
              </ShadeSelectorWrap>
            )}
          </InputSectionWrap>
        ))}
      </InputWrap>
    </Wrap>
  )
}

export default ToothSelector