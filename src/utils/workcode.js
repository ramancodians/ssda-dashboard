import { COLLECTIONS } from "../consts"
import { firestore } from "../config/firebase"
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"

export const generateNewCode = (oldCode) => {
  let alpha = String(oldCode[0])
  const sn = Number(`${oldCode[1]}${oldCode[2]}`)
  let newSN = sn + 1
  if (newSN < 10) {
    newSN = `0${newSN}`
  }
  if (newSN == 100) {
    alpha = String.fromCharCode(alpha.charCodeAt() + 1)
    newSN = "01"
  }
  return `${alpha}${newSN}`.toUpperCase()
}

export const getCurrentWorkCode = async () => {
  const workCodeCollection = collection(firestore, COLLECTIONS.WORKCODE)
  const query = doc(workCodeCollection, "current")
  const snap = await getDoc(query)
  const data = snap.data()
  return data.code
}

export const updateWorkCode = async (newCode) => {
  const workCodeCollection = collection(firestore, COLLECTIONS.WORKCODE)
  const query = doc(workCodeCollection, "current")
  await updateDoc(query, {
    code: newCode
  })
}