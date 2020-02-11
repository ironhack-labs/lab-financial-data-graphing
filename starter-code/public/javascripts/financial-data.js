const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(baseURL)
  .then(dataPayload => {
    console.log(dataPayload.data.bpi);
    const myKeys = Object.keys(dataPayload.data.bpi);
    const myValues = Object.values(dataPayload.data.bpi);
  })
  .catch(err => console.log(err));
