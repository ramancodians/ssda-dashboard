import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Wrap = styled.div`
  background: #333;
  width: 200px;
  height: calc(100vh - 50px);
  padding-top: 20px;
  ul {
    list-style: none;
    padding: 0px;

    li {
      a {
        width: 100%;
        display: block;
        border: 1px solid #fff;
        color: #fff;
        padding: 10px;
      }
    }
  }
`

const Sidebar = (props) => (
  <Wrap>
    <ul>
      <li>
        <Link to="/dashboard/doctors">
          Doctors
        </Link>
      </li>
    </ul>
  </Wrap>
)

export default Sidebar