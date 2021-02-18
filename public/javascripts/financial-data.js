const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`
const startDate = document.getElementById('start-value')
const endDate = document.getElementById('end-value')
const currency = document.getElementById('currency')

const requestUrl = (apiUrl) => {
    axios
        .get(apiUrl)
        .then((response) => {
            const { data } = response;
            const xAxis = Object.keys(data['bpi'])
            const yAxis = Object.values(data['bpi'])
    
            paintData(xAxis, yAxis)
        })
        .catch((e) => console.error("Error getting data", e));
}

const paintData = (xAxis, yAxis) => {
    const ctx = document.getElementById("my-chart").getContext("2d");

    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: xAxis,
            datasets: [
                {
                    data: yAxis,
                    label: "Bitcoin Price Index",
                    borderColor: "green",
                    backgroundColor: "transparent",
                },
            ],
        },
    });
};

document.getElementById('getValueBtn').addEventListener('click', () => {
    const from = startDate.value
    const to = endDate.value

    const url = apiUrl + `?start=${from}&end=${to}`
    requestUrl(url)
})

document.getElementById('currency').addEventListener('input', () => {
    const cur = currency.value
    const url = apiUrl + `?currency=${cur}`
    requestUrl(url)
})

requestUrl(apiUrl)