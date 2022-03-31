import { Button,  Menu, Dropdown, Input } from "antd"
import React from "react"
import styled from "styled-components"
import { PlusCircleOutlined, DownOutlined  } from "@ant-design/icons"
import { BASE_C } from "../consts"
import { Link } from "react-router-dom"

const Wrap = styled.div`
  background: ${BASE_C};
  color: #fff;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 10;
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
`
class Header extends React.PureComponent {
  state = {}

  componentDidMount() {
    // const {  } = this.props
  }

  render() {
    // const {  } = this.state
    // const {  } = this.props
    return (
      <Wrap>
        <InnerWrap>
          <LogoWrap>
            <Link  to="/dashboard">
              SSDA
            </Link>
          </LogoWrap>
          <SearchWrap>
            <Input
              placeholder="Search for doctors by name or phone"
            
            />
          </SearchWrap>
          <OptionsWrap>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              <Link to="/dashboard/new-work" style={{ color: "#fff", marginLeft: 6 }}>
                New Entry
              </Link>
            </Button>
          </OptionsWrap>
        </InnerWrap>
      </Wrap>
    )
  }
}

export default Header
