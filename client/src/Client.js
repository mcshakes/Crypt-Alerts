
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
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { marketLeaders, searchList };
export default Client;
