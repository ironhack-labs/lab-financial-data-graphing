function getBitcoinInfo(id) {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.error(err)
        })
}

document.getElementById("BitButton").onclick = function () {
    getBitcoinInfo();
}