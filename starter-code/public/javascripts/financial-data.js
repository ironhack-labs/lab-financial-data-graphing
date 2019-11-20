// const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`


// function getfinancial(theName) {
//     financialApi.get(theName)
//         .then(response => {
//             console.log("Response from API is: ", response.data);

//         })
//         .catch(err => {
//             console.log("Error is: ", err);
//         });
//}


function getData(to, from, currency = "EUR") {
    // console.log(to)
    // const financialApi = axios.create({
    //     baseURL: ""
    // });
    console.log(`http://api.coindesk.com/v1/bpi/historical?start=${to}&end=${from}&currency=${currency}`)
    axios
        .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=EUR`)
        .then(responseFromAPI => printTheChart(responseFromAPI.data, "response from the API"))

        .catch(err => console.log("Error while getting the data: ", err))

}

function printTheChart(stockData) {

    const dailyData = stockData["bpi"]
    console.log(stockData, "info")
    const bpiDate = Object.keys(dailyData)
    console.log(bpiDate)
    const coinPrices = bpiDate.map(date => dailyData[date])
    console.log(coinPrices)

    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: bpiDate,
            datasets: [
                {
                    label: "Bitcoin Price Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: coinPrices
                }
            ]
        }
    })
}
// const to = document.getElementById("to").value

document.getElementById("button").onclick = () => {


    const to = document.getElementById("to").value
    const from = document.getElementById("from").value

    getData(to, from)

    // printTheChart(5)



}
