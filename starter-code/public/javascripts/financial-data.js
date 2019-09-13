const getDataBit = currentPrice => {
    axios.get("http://api.coindesk.com/v1/bpi/historical/close")
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
};

getDataBit();


const drawCharts = (labels, values) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    label: "Bitcoin Price",
                    data: values
                }
            ]
        }
    });
};

// axios
//     .get(
//         "http://api.coindesk.com/v1/bpi/historical/close"
//     )
//     .then(response => {

//         const labels = Object.keys(response.data.bpi);

//         const values = Object.values(response.data.bpi);

//         drawCharts(labels, values);
//     });


// document.getElementById("date-from").value

function updateChart(start, end) {
    axios
        .get(
            `http://api.coindesk.com/v1/bpi/historical/close?start=${start}&end=${end}`
        )
        .then(response => {

            const labels = Object.keys(response.data.bpi);

            const values = Object.values(response.data.bpi);

            drawCharts(labels, values);
        });
}

// updateChart("2019-01-01", "2019-05-01");



document.querySelector("button").onclick = () => {
    const start = document.getElementById("date-from").value;
    const end = document.getElementById("date-to").value;
    updateChart(start, end);
};