import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Switch, Route } from "react-router-dom"
import WorkList from "./workList"
import WorkEdit from "./edit-status"
import Header from "../../comps/header"

const Wrap = styled.div`
  
`

const ChildWrap = styled.div`
  max-width: 600px;
  margin: 50px auto 60px auto;
  padding: 16px;
  background: #eee;
  min-height: 100vh;
`

const StaffApp = ({ }) => {
  // const [ , ] = useState()
  // useEffetc(() => {
    
  // }, [])
   return (
    <Wrap>
      <Header isStaffView/>
      <ChildWrap>
        <Switch>
          <Route path="/staff" component={WorkList} exact />
          <Route path="/staff/work/:code" component={WorkEdit} exact />
        </Switch>
      </ChildWrap>
    </Wrap>
  )
}

export default StaffApp