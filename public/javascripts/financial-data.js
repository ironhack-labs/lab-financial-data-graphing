const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"



// get

axios.get(apiUrl)
    .then((response) => {
        const {
            data
        } = response
        const xAxis = Object.keys(data.bpi)
        const yAxis = Object.values(data.bpi);
        paintChart(xAxis, yAxis)
        console.log(yAxis)
    })
    .catch((e) => console.log("Error geting data", e))


const paintChart = (xAxis, yAxis) => {
    const ctx = document.getElementById("my-chart").getContext("2d");
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label: "Price",
                borderColor: "blue",
                backgroundColor: "transparent"

            }]
        }
    })
}

