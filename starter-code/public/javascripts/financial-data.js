let fecha1 = document.getElementById("start").value
let fecha2 = document.getElementById("end").value
let urlBtc = `https://api.coindesk.com/v1/bpi/historical/close.json`

const stockInfo = () => {
    axios.get(urlBtc)
        .then(res => {
            let objData = res.data.bpi;
            let datesBtc = Object.keys(objData);
            let priceBtc = Object.values(res.data.bpi)
            let maxVal = Math.max(...Object.values(res.data.bpi))
            let minVal = Math.min(...Object.values(res.data.bpi))
            console.log(datesBtc)
            printTheChart(datesBtc, priceBtc, maxVal, minVal)
            
        })
}

let printTheChart = (datesBtc, priceBtc, maxVal, minVal) => {
    let ctx = document.getElementById("myChart").getContext("2d")
    let chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: datesBtc,
            datasets: [
                {
                    label: "Stock Chart",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: priceBtc
                }
            ]
        }
    })
}

function changeDates() {
    document.addEventListener("change", e => {
        fecha1 = document.getElementById("start").value
        fecha2 = document.getElementById("end").value
        stockInfo()

    })
}



changeDates()
stockInfo()

