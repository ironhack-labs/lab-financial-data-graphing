const apiCoins = axios.create({
    baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
})


function getCoinInfo(theName) {
    apiCoins
        .get(theName)
        .then(responseFromAPI => {
            console.log("Response from API is: ", responseFromAPI.data);
        })
        .catch(err => {
            console.log("Error while getting the data: ", err);
        });
}

document.getElementById("theButton").onclick = function() {
    const btCoin = document.getElementById("theInput").value;
    getCoinInfo(btCoin);
  };
  