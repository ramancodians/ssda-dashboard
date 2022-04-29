import { TWILIO_SID } from "../config/consts";

export const sendSMS = async (
  to = "+919632725300",
  body = "Hello Test",
  from = "+15017122661"
) => {
  try {
    const url = encodeURI(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json?To=${to}&Body=${body}`)
    console.log({ url });
    fetch(
      url , {
      headers: {
        Authorization: "Basic QUM5ZGJkNGM5NmZiNGQwNDRlYjU1M2QyMzdjNzg1ODNjZTo5OTBlM2RkNjJhZTk2ZjU2ODMxNTYyMzdjZGQwODE4ZQ=="
      },
      method: "POST"
    })
  } catch (error) {
    console.log("error", error);
  }
}