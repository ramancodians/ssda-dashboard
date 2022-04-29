import { Button,  Menu, Dropdown, Input } from "antd"
import React from "react"
import styled from "styled-components"
import { PlusCircleOutlined, DownOutlined  } from "@ant-design/icons"
import { BASE_C, STAFF_HEADER_C } from "../consts"
import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { workIndex, doctorIndex } from "../config/algolia"

const Wrap = styled.div`
  background: ${BASE_C};
  color: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 10;

  ${props => props.isStaffView && `
    background: ${STAFF_HEADER_C};
  `}
`

const InnerWrap = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoWrap = styled.div`
   font-weight: bold;
   font-size: 20px;
   a {
     color: #fff;
   }
`

const OptionsWrap = styled.div`
  
`

const SearchWrap = styled.div`
  width:  400px;
  position: relative;
`

const ResultWrap = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  height: auto;
  background: #fff;
  border: 1px solid #ccc;
`

const ResultSectionWrap = styled.div`
  > h4 {
    border-bottom: 1px solid #ccc;
    padding: 0px 10px;
  }

  > ul {
    padding: 0px;
    padding: 0px 10px;
  }
`
class Header extends React.PureComponent {
  state = {}

  componentDidMount() {
    // const {  } = this.props
  }

  handleSeach = async (text) => {
    if (text === undefined || text === "") {
      this.setState({
        searchText: text,
        workHits: null,
        doctorHits: null
      })
      return
    }
    this.setState({
      searchText: text,
    })
    workIndex.search(text)
      .then(res => {
        console.log("work", res);
        this.setState({
          workHits: res.hits
        })
      })
   doctorIndex.search(text)
      .then(res => {
        console.log("Doctor", res);
        this.setState({
          doctorHits: res.hits
        })
      })
  }

  handleLogout = async () => {
    await auth.signOut()
  }

  render() {
    const { searchText, doctorHits, workHits } = this.state
    const { isStaffView } = this.props
    const isShowResults = !!doctorHits || !!workHits
    return (
      <Wrap isStaffView={isStaffView}>
        <InnerWrap>
          <LogoWrap>
            <Link  to={isStaffView ? "/staff" : "/dashboard"}>
              SSDA {isStaffView && " | Staff App" }
            </Link>
          </LogoWrap>
          {!isStaffView && (
             <SearchWrap>
              <Input
                placeholder="Search for doctors by name or phone"
                value={searchText}
                onChange={(e) => { this.handleSeach(e.target.value) }}
              />
              {isShowResults && (
                <ResultWrap>
                  {workHits && workHits.length > 0 && (
                    <ResultSectionWrap>
                      <h4>Entry</h4>
                      <ul>
                        {workHits.map(work => (
                          <li key={work.objectID}>
                            <h2>{work.code}</h2>
                          </li>
                         ))}
                      </ul>
                    </ResultSectionWrap>
                  )}
                  {doctorHits && doctorHits.length > 0 && (
                    <ResultSectionWrap>
                      <h4>Doctors</h4>
                      <ul>
                        {doctorHits.map(doc => (
                          <li key={doc.objectID}>
                            <h2>{doc.full_name}</h2>
                          </li>
                         ))}
                      </ul>
                    </ResultSectionWrap>
                  )}
                </ResultWrap>
              )}
            </SearchWrap>
          )}

          {isStaffView ? (
            <OptionsWrap>
              <Button danger>
                 Logout
              </Button>
            </OptionsWrap>
          ) : (
            <OptionsWrap>
              <Button type="primary" icon={<PlusCircleOutlined />}>
                <Link to="/dashboard/new-work" style={{ color: "#fff", marginLeft: 6 }}>
                  New Entry
                </Link>
              </Button>
            </OptionsWrap>
          )}
        </InnerWrap>
      </Wrap>
    )
  }
}

export default Header
