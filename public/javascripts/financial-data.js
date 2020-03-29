const getGraph = (firstValue, secondValue, currency, maxV, minV) => {
    const ctx = document.getElementById("myChart").getContext("2d");

    let myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstValue}&end=${secondValue}&currency=${currency}`

    axios
        .get(myUrl)
        .then(response => {
            console.log("response: ", response.data);
            const dateArray = Object.keys(response.data.bpi);
            const valueArray = Object.values(response.data.bpi);
            console.log("dateArray", dateArray);
            maxV.innerText = Math.max.apply(null, valueArray)
            minV.innerText = Math.min.apply(null, valueArray)
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dateArray,
                    datasets: [{
                        label: "Bitcoin Price index",
                        backgroundColor: 'rgb(82, 137, 196)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: valueArray,
                        borderWidth: 5

                    }]
                }
            });
        })
}





document.addEventListener(
    "DOMContentLoaded",
    () => {
        const getGraphButton = document.getElementById("getGraph");
        const graphContainer = document.getElementById("graph-container");
        const firstInput = document.getElementById("start-date");
        const secondInput = document.getElementById("end-date");
        const currency = document.getElementById("select-currency");
        const maxValue = document.getElementById("max-value")
        const minValue = document.getElementById("min-value")
        getGraphButton.addEventListener("click", () => {
            console.log("here ana", firstInput.value)
            getGraph(firstInput.value, secondInput.value, currency.value, maxValue, minValue)
        })
    })