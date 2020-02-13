/*jshint esversion: 6 */
const restCoinDeskApi = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

function getCoinDeskInfo() {
  restCoinDeskApi
    .get()
    .then(responseFromAPI =>
      console.log("HEY! Response from API is: ", responseFromAPI.data)
    )
    .catch(err => console.log("Error is: ", err));
}

document.getElementById("theButton").onclick = function() {
  getCoinDeskInfo();
};
