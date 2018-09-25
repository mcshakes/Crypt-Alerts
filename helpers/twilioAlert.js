const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSID, authToken);

function createMessage(message) {
  console.log("INCOMING HIGH", message)

  let phoneNumber = message[2].phoneNumber
  let alertPrice = message[1]
  let ticker = message[0].ticker
  let realPrice = message[0].price

   // INCOMING HIGH [ { _id: 5ba1959000775e0f229563e5,
   // ticker: 'ETH',
   // price: '210.31606',
   // updatedAt: 2018-09-19T00:17:20.996Z,
   // __v: 0 },
 // '208',
 // { watchlist: [],
    // _id: 5ba18ee300775e0f229563e3,
    // email: 'test_user@test.com',
    // phoneNumber: '9707691296',
     // password: '$2b$10$7sZdGHVzf2B6pIvg/2qfgufIaoArITlJcsYYJmkQtrXhqmiT/JLtG',
     // createdDate: 2018-09-18T23:48:51.227Z,
     // __v: 0 } ]

  client.messages
  .create({
    body: `This is an Alert that ${ticker} is approaching your custom price alert of $ ${message[1]} USD. The current price is ${realPrice}. Log in to your marketplace to take action`,
    from: 'whatsapp:+14155238886',
    to: `whatsapp:+19707691297`
  })
  .then(message => console.log("MESSAGE", message.sid))
  .catch(err => console.log(err))
  .done();
}

module.exports = { createMessage }
