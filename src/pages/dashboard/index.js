import React from "react"
import { Route, Switch, Routes } from "react-router-dom"
import styled from "styled-components"
import Header from "./../../comps/header"
import Sidebar from "../../comps/sidebar"

// Pages
import NewWork from "./new-work"
import Doctors from "./doctors"
import NewDoctors from "./doctors/new"

const Wrap = styled.div`
  
`

const MainWrap = styled.div`
  display: flex;
`

const ChildWrap = styled.div`
  flex: 1;
  background: #F6F7F9;
  padding: 20px;
`



class Dashboard extends React.PureComponent {
  state = {}

  componentDidMount() {
    // const {  } = this.props
  }

  render() {
    // const {  } = this.state
    // const {  } = this.props
    return (
      <Wrap>
        <Header />
        <MainWrap>
          <Sidebar />
          <ChildWrap>
            <Switch>
              <Route path="/dashboard/new-work" component={NewWork}/>
              <Route path="/dashboard/doctors" component={Doctors} exact/>
              <Route path="/dashboard/doctors/new" component={NewDoctors}/>
            </Switch>
          </ChildWrap>
        </MainWrap>
      </Wrap>
    )
  }
}

export default Dashboard
