const btcInfo = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/historical/'
  });

const datesInput = document.querySelectorAll('input')

let from;
let to;

btcInfo.get("close.json")
    .then(response => {
        printTheChart(response.data.bpi)
    })
    .catch(error => {
      console.log(error);
    });

datesInput.forEach(dateInput => {
    dateInput.addEventListener('input', () => {
        if (dateInput.className === 'from') {
            from = dateInput.value
            btcInfo.get(`close.json?start=${from}&end=${to}`)
            .then( response => {
                printTheChart(response.data.bpi)
            })
            .catch(error => {
                console.log(error);
              })
        } else {
            to = dateInput.value
            btcInfo.get(`close.json?start=${from}&end=${to}`)
            .then( response => {
                printTheChart(response.data.bpi)
            })
            .catch(error => {
                console.log(error);
              })
        }
    });
})
function printTheChart (financialData){
    let dates = Object.keys(financialData)
    let price = Object.values(financialData)
    const ctx = document.getElementById("myChart").getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Todays price',
            data: price,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    }
});
}
  
  