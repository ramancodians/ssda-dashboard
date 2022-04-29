import React from "react"
import { Route, Switch, Routes } from "react-router-dom"
import styled from "styled-components"
import Header from "./../../comps/header"
import Sidebar from "../../comps/sidebar"

// Pages
import NewWork from "./new-work"
import Doctors from "./doctors"
import NewDoctors from "./doctors/new-doctor"
import DoctorDetails from "./doctors/doctor_full_details"
import Home from "./home"
import WorkType from "./workType"
import Work from "./work"
import Billing from "./billing"
import EditWork from "./work/edit-work"
import WorkDetails from "./work/details-view"
import StaffList from "./staff"
import StaffNew from "./staff/new-staff"

const Wrap = styled.div`
  background: #F6F7F9;
  
`

const MainWrap = styled.div`
  display: flex;
`

const ChildWrap = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
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
              <Route path="/dashboard" component={Home} exact />
              <Route path="/dashboard/new-work" component={NewWork} exact />

              <Route path="/dashboard/doctors" component={Doctors} exact />
              <Route path="/dashboard/doctors/new" component={NewDoctors} exact />
              <Route path="/dashboard/doctors/view/:docId" component={DoctorDetails} exact />

              <Route path="/dashboard/work-types" component={WorkType} exact />

              <Route path="/dashboard/entry" component={Work} exact />
              <Route path="/dashboard/entry/edit/:code" component={EditWork} exact />
              <Route path="/dashboard/entry/:code" component={WorkDetails} exact />

              <Route path="/dashboard/staff" component={StaffList} exact />
              <Route path="/dashboard/staff/new" component={StaffNew} exact />


              <Route path="/dashboard/billing" component={Billing} exact />

            </Switch>
          </ChildWrap>
        </MainWrap>
      </Wrap>
    )
  }
}

export default Dashboard
