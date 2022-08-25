import React, { useState, userEffect } from "react"
import styled from "styled-components"
import { Button } from "antd"
import { SMS_API_GATEWAY, SMS_SERVICE_KEY } from "../../../config/consts"
import { getSMSAPIOptions } from "../../../utils/unit"
import { createActivity } from "../../../utils/activity"
import { sendSMS } from "../../../utils/sms"
import { ACTIVITY_ITEMS } from "../../../consts"
import { useHistory } from "react-router-dom"

const Wrap = styled.div`
  margin-bottom: 20px;
`

const EntryActions = ({ code, entry, refetch }) => {
  const [ isSendingUpdates, setisSendingUpdates ] = useState(false)
  const history = useHistory()
  
  const sendUpdates = async () => {
    try {
      fetch(`${SMS_API_GATEWAY}/${SMS_SERVICE_KEY}/ADDON_SERVICES/SEND/TSMS`, {
        ...getSMSAPIOptions({
            "From":"SSDALB",
            "To": "9632725300",
            "TemplateName" : "Update SMS",
            "VAR1" : "Raman",
            "VAR2" : "A1222",
            "VAR3" : "28 March",
            "VAR4" : "3 April",
            "VAR5" : "12121",
          
          } 
        )
      }).then(res => {
        console.log("SUCCESS", res);
      }).catch(error => {
        console.log("FAILED", error);
      })

      await sendSMS()
      await createActivity(code, ACTIVITY_ITEMS.UPDATES_SENT)
      if (refetch) {
        refetch()
      }
    } catch (error) {
      console.log(error);
    }
  }

   return (
    <React.Fragment>
      <h4>Actions</h4>
      <Wrap>
        <Button  loading={isSendingUpdates} onClick={sendUpdates}>
          Send Updates
        </Button>
        <Button  loading={isSendingUpdates} onClick={sendUpdates}>
          Mark Done
        </Button>
        <Button  loading={isSendingUpdates} onClick={() => { history.push({ pathname: `/dashboard/entry/edit/${code}`, state: entry }) }}>
          Edit
        </Button>
      </Wrap>
    </React.Fragment>
  )
}

export default EntryActions