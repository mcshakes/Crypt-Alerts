const axios = require('axios');

function marketLeaders() {
  axios.get(`/api/market-leaders`)
  .then((response) => {
    console.log(response.data)
  });
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

const Client = { marketLeaders };
export default Client;
// Proxy error: Could not proxy request /api/market-leaders from localhost:3000 to http://localhost:3001/.
// [1] See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).
