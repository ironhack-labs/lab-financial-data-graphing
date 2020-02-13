const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then(responseFromAPI => console.log("The response from API: ", responseFromAPI))
  .catch(err => console.log("Error while getting the data: ", err));