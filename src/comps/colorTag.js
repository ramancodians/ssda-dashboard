import React from "react"
import styled from "styled-components"

const Wrap = styled.div`
 width: 5px;
 height: 30px; 
`

const ColorTag = ({ color = "#CCC" }) => (
  <Wrap style={{ backgroundColor: color }}/>
)

export default ColorTag