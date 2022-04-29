import { firestore } from "../config/firebase"
import { collection, addDoc } from "firebase/firestore"
import { COLLECTIONS, ACTIVITY_ITEMS } from "../consts"

export const createActivityPayload = (code, task, other = {}) => {
  return {
    task: task.task,
    at: new Date(),
    code,
    other,
  }
}

export const createActivity = async (code, task, other) => {
  try {
    const payload = createActivityPayload(code, task, other)
    const ref = collection(firestore, COLLECTIONS.ACTIVITY)
    await addDoc(ref, {
      ...payload
    })
  } catch (error) {
    console.log(error);
  }
}