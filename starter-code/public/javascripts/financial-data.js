const coinDeskService = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getHistoricalData() {
  coinDeskService
  .get()
  .then( response => {
    console.log(`RESPONSE FROM COIN DESK SERVICE ${JSON.stringify(response.data)}`);
    return response.data;
  })
  .catch( error => console.log(`ERROR: ${error}`));
}


getHistoricalData();