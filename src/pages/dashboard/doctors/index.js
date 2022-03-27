import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Wrap = styled.div`
  
`

const Doctors = (props) => (
  <Wrap>
    <h1>All Doctors</h1>
    <Link to="/dashboard/doctors/new">
      New Doc
    </Link>
  </Wrap>
)

export default Doctors