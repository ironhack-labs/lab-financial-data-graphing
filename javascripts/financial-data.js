const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

async function getInfo() {
    try {
    const { data } = await axios.get(apiUrl)
        return data;
    } catch (err) {
        console.error(err)
    }
}

async function createGraph() {
    try {
        const data = await getInfo();
        const stocks = data["bpi"]
        console.log(data)
        console.log(stocks)
        const labels = Object.keys(stocks);
        const stocksInfo = Object.values(stocks);
        const canvas = document.querySelector("#grafico").getContext("2d");
        const grafico = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'BPI in Dollars',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor:
                        'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    data: stocksInfo
                }]
            }
        })
    } catch (err) {
        console.error(err)
    }
}

createGraph();