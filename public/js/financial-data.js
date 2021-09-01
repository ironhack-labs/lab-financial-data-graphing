window.onload = () => {
    const url = 'http://api.coindesk.com/v1/bpi/historical/close.json'
    axios.get(url)
        .then((responseFromAPI) => {
            console.log(responseFromAPI)
            const timeSeries = responseFromAPI.data.bpi;
            const labels = Object.keys(timeSeries)
            const prices = labels.map((label) => timeSeries[label])
            const ctx = document.getElementById("myChart").getContext("2d");
            const myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [{
                        label: "Coin Prices",
                        data: prices,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                    }, ],
                },
            });
        });
    const fetchButton = document.getElementById("fetch");
    fetchButton.addEventListener("click", () => {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const currency = 'BTC'
        console.log(startDate);

        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
            .then((responseFromAPI) => {
                console.log(responseFromAPI);
                const timeSeries = responseFromAPI.data.bpi;
                const labels = Object.keys(timeSeries)
                const prices = labels.map((label) => timeSeries[label])
                const ctx = document.getElementById("myChart").getContext("2d");
                const myChart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels,
                        datasets: [{
                            label: "Coin Prices",
                            data: prices,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        }, ],
                    },
                });

            });
    });

}