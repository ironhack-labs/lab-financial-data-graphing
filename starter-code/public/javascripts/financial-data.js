const startEl = document.getElementById("start-date");
const endEl = document.getElementById("end-date");
const currencyEl = document.querySelector("select");
const maxPriceEl = document.getElementById("maxPrice");
const minPriceEl = document.getElementById("minPrice");


const printChart = () => {
axios({
    method: 'get',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json', 
    params: {
        currency: currencyEl.value,
        start: startEl.value,
        end: endEl.value
      },
  })
  .then(response => {
    console.log(response)
    const stockDate = Object.keys(response.data.bpi);
    const stockPrice = Object.values(response.data.bpi);
    const maxPrice = Math.max(...Object.values(response.data.bpi));
    maxPriceEl.innerHTML = maxPrice;
    const minPrice = Math.min(...Object.values(response.data.bpi));
    minPriceEl.innerHTML = minPrice;
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDate ,
            datasets: [{
                label: "Price index",
                data: stockPrice,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

  })
  .catch(err => {
    console.error(err)
  })
};


printChart()

// IF YOU CHANGE DATES

startEl.onchange = () => {
    printChart()
}

endEl.onchange = () => {
    printChart()
}

// IF YOU CHANGE CURRENCY

currencyEl.onchange = () => {
    printChart()
}