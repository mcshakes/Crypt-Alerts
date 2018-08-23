const axios = require('axios');
const key = process.env.NOMICS_KEY

function marketLeaders(cb) {
  return fetch(`/api/market-leaders`)
  .then(checkStatus)
  .then(parseJSON)
  .then(cb)
}

function searchList(cb) {
  return fetch("/api/search")
  .then(checkStatus)
  .then(parseJSON)
  .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { marketLeaders, searchList };
export default Client;
// Proxy error: Could not proxy request /api/market-leaders from localhost:3000 to http://localhost:3001/.
// [1] See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).
