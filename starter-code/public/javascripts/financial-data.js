// document.querySelector("#getAPIInfo").onclick = function() {


// }

axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05")
    .then(JSONPayload => {
        console.log(JSONPayload.data.bpi)
        JSONPayload.data.bpi.forEach(element => {
            console.log(element)
        });
    })