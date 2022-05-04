import { TWILIO_SID, TWILIO_AUTH_TOKEN } from "../config/consts";

export const sendSMS = async (
  to = "+919632725300",
  body = "Hello Test",
) => {
  try {
    const url = encodeURI(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json?To=${to}&Body=${body}`)
    console.log({ url });
    fetch(
      url , {
      headers: {
        Authorization: `Basic ${window.btoa(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`)}`
      },
    })
  } catch (error) {
    console.log("error", error);
  }
}

export const sendSMSVia2Factor = (
  to = "+919632725300",
  body = "Hello Test",
  from = "+15017122661"
) => {
  try {

  } catch (error) {
    console.log(error);
  }
}