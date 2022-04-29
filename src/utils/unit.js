import { collection, setDoc } from "firebase/firestore"
import { firestore } from "../config/firebase"
import { COLLECTIONS } from "../consts"
import { Tag } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"

export const getUnitCount = (toothObj) => {
  if (!toothObj) {
    return 0
  }

  let count = 0
  Object.values(toothObj).forEach(section => {
    if (section) {
      section.forEach(teeth => {
        if (teeth.isSelected) {
          count++
        }
      })
    }
  })
  return count;
}

export const getLatestStatus = (overallStatus) => {
  if (overallStatus) {
    // get latest updated at
    let latest = 0
    let latestIndex = 0
    for(let i = 0; i < overallStatus.length; i++) {
      if (overallStatus[i] && overallStatus[i].completed_on && overallStatus[i].completed_on.seconds >= latest) {
        latest = overallStatus[i].completed_on.seconds
        latestIndex = i
      }
    }
    return overallStatus[latestIndex].label
  }
  return "N/a"
}

export const getListFromFirebase = (rq) => {
  if (rq && rq.status === "success" && rq.isSuccess && rq.data) {
    const list = []
    rq.data.docs.forEach(x => {
      list.push(
        {
          ...x.data(),
          id: x.id,
        }
      )
    })
    return list
  }
  return []
}

export const addActivity = (payload) => {
  const ref = collection(firestore, COLLECTIONS.ACTIVITY)
  setDoc(collection, {
    created_on: new Date(),
  })
}

export const getSMSAPIOptions = (payload = {}, ) => {
  const form = new FormData()
  Object.keys(payload).forEach(key => {
    form.append(key, payload[key])
  })
  return {
    method: "POST",
    body: form,
  }
}


export const getColorsAndIconForStatus = (status = "")  => {
  const lowerCaseStatus = status.toLowerCase()

  switch(lowerCaseStatus) {
    case "delivered":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {status}
        </Tag>
      )
    case "collected":
      return (
        <Tag color="warning">
          {status}
        </Tag>
      )
    default:
      return (
        <Tag>
          {status}
        </Tag>
      )
  }
}
