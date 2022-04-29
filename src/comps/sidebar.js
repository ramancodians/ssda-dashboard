import React from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const Wrap = styled.div`
  background: #333;
  width: 200px;
  height: calc(100vh - 50px);
  padding-top: 60px;
  position: sticky;
  ul {
    list-style: none;
    padding: 0px;
  }
`

const Li = styled.div`
  ${props => props.isActive && `
    background: rgba(255, 255, 255, 0.2);
  `}

  a {
    width: 100%;
    display: block;
    border-bottom: 1px solid #444;
    color: #fff;
    padding: 10px;
    font-weight: 500;
  }
`

const Sidebar = (props) => {
  const location = useLocation()
  console.log({ location });
  let isActive = null

  const getActiveSection = () => {
    const { pathname } = location
    if (pathname.includes("doctors")) {
      isActive = "doctors"
    }
    if (pathname.includes("entry")) {
      isActive = "entry"
    }
    if (pathname.includes("work-types")) {
      isActive = "work-types"
    }
    if (pathname.includes("staff")) {
      isActive = "staff"
    }
  }
  getActiveSection()
  return (
    <Wrap>
      <ul>
        <Li isActive={isActive === "dashboard"}>
          <Link to="/dashboard">
            Dashbaord
          </Link>
        </Li>
        <Li isActive={isActive === "doctors"}>
          <Link to="/dashboard/doctors">
            All Doctors
          </Link>
        </Li>
        <Li isActive={isActive === "entry"}>
          <Link to="/dashboard/entry">
            All Entry
          </Link>
        </Li>
        <Li isActive={isActive === "work-types"}>
          <Link to="/dashboard/work-types">
            Work Types
          </Link>
        </Li>
        <Li isActive={isActive === "billing"}>
          <Link to="/dashboard/billing">
            Billing
          </Link>
        </Li>
        <Li isActive={isActive === "staff"}>
          <Link to="/dashboard/staff">
            Staff
          </Link>
        </Li>
      </ul>
    </Wrap>
  )
}

export default Sidebar