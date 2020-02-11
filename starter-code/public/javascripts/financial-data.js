const coinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getCoinInfo() {
  coinDeskApi
    .get()
    .then(responseFromAPI => console.log("Response from API is: ", responseFromAPI.data))
    .catch(err => console.log("Error is: ", err));
}

getCoinInfo();