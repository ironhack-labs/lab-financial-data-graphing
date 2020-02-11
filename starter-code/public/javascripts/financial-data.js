const axioApp = axios.create({
    baseURL: "http://api.coindesk.com/"
})

let currency = "USD"

document.querySelector(".date").onmouseleave = () => {
    const dateStart = document.querySelector("#start").value
    const dateEnd = document.querySelector("#end").value

    if (dateStart && dateEnd) {
        axioApp.get(`v1/bpi/historical/close.json?start=${dateStart}&end=${dateEnd}&currency=${currency}`)
            .then(response => printTheChart(response.data))
            .catch((err => console.log(err)))
    }
}

document.querySelector("#currency").onmouseleave = () => {
    currency = document.querySelector("#currency").value

    axioApp.get(`v1/bpi/historical/close.json?currency=${currency}`)
        .then(response => printTheChart(response.data))
        .catch(err => console.log(err))

    console.log(currency)
}


axioApp.get(`v1/bpi/historical/close.json`)
    .then(response => printTheChart(response.data))
    .catch(err => console.log(err))


function printTheChart(data) {
    const bpi = data.bpi

    const bpiDate = Object.keys(bpi)
    const bpiPrice = Object.values(bpi)



    const min = Math.min(...bpiPrice)
    const max= Math.max(...bpiPrice)

    document.querySelector("#min").innerText = min
    document.querySelector("#max").innerText = max

    const ctx = document.getElementById("myChart").getContext("2d")
    new Chart(ctx, {
        type: "line",
        data: {
            labels: bpiDate,
            datasets: [{
                label: "price",
                data: bpiPrice,
                borderColor: "rgb(255, 99, 132)",
            }]
        }
    })
}