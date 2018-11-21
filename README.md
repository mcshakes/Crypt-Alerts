# Crypt-Alerts

## Motivation

Allow users to track diverse cryptocurrencies from a multitude of marketplaces. All prices and metadata are updated in real time with custom built streamers from [Nomics](https://docs.nomics.com/) and [CryptoCompare](https://min-api.cryptocompare.com/)

## Live App

https://crypt-alert.herokuapp.com/

Email: fake_man@test.com  
Password: password1

*Or, create new users and try it yourself.*

## Tech Used

1) React on the front end.
2) Express.js on the backend.
3) Socket.IO streaming prices from Nomics](https://docs.nomics.com/) and [CryptoCompare](https://min-api.cryptocompare.com/).
4) Cron-jobs acting as listeners for real time price changes within the database.
5) Mocha and Chai for API and Unit tests.

## Future plans

1) Implement proper alerting system. **This one was big;** Initially, I added a cronjob to check the delta between what a user would set as an "alert" and the actual real price. The issue happened using the Twilio WhatsApp API, which is in beta. Too many limitations (users need to be added to a *whitelist* from within the Twilio dashboard, and certain numbers in foreign countries were having trouble actually receiving the alert messages.

I plan on revisiting this and getting it to work.
