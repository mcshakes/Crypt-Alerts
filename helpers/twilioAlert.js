const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSID, authToken);

function createMessage(message) {
  console.log("INCOMING HIGH", message)
  // client.messages
  // .create({
  //   body: "TEST!",
  //   from: 'whatsapp:+14155238886',
  //   to: 'whatsapp:+19707691296'
  // })
  // .then(message => console.log(message.sid))
  // .catch(err => console.log(err));
  // .done();
}

module.exports = { createMessage }
