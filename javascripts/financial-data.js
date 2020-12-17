const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

async function getInfo(start, end, currency) {
    try {
    const endpoint = `?start=${start}&end=${end}&currency=${currency}`
    const { data } = await axios.get(apiUrl+endpoint)
        return data;
    } catch (err) {
        console.error(err)
    }
}

async function createGraph() {
    try {
        const start = document.querySelector("#inicio").value;
        const end = document.querySelector("#fin").value;
        const currency = document.querySelector("#moneda").value;
        const min = document.querySelector("#min");
        const max = document.querySelector("#max");
        const valuesDiv = document.querySelector("#values")
        const data = await getInfo(start, end, currency);
        const stocks = data["bpi"];
        const labels = Object.keys(stocks);
        const stocksInfo = Object.values(stocks);
        const ordenados = stocksInfo.sort(ordena);
        values.style.display = "block"
        max.innerText = "Max: " + ordenados[ordenados.length - 1] + " " + currency
        min.innerText = "Min: " + ordenados[0] + " " + currency
        const canvas = document.querySelector("#grafico").getContext("2d");
        const grafico = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: `BPI in ${currency}`,
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

const btn = document.querySelector("#create")

btn.addEventListener("click", createGraph);

function ordena(a, b) {
  return a - b;
}