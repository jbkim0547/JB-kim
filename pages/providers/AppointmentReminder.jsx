// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    to: "+13236387690",
    from: "+18183693890",
    body:
      "Hello [CUSTOMER-NAME] this is a reminder you have an appointment on [DATE-TIME] - thanks, [BUSINESS-NAME]",
  })
  .then((message) => console.log(message.sid));
