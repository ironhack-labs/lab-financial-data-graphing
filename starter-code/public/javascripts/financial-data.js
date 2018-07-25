
const coinDeskApi = axios.create({ 
    method: 'get',
    baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json',
 });

 coinDeskApi.get()
 .then((data) => {
     printChart(data.data.bpi)
 })
 .catch((error) => {
     console.log(error)
 })


 let printChart = ((data) => {
    let dateLabels = Object.keys(data);
    let coinPrice = Object.values(data);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateLabels,
        datasets: [{
          label: "Coin Price Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinPrice,
        }]
      }
    });
  });

const initDateInput = document.getElementById('finalDate')


const generateChart = () => {
    const initialDate = document.getElementById('initDate').value;
    const finalDate = document.getElementById('finalDate').value;
    
    const coinDeskApi = axios.create({ 
        method: 'get',
        baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${initialDate}&end=${finalDate}`,
    });
    
    coinDeskApi.get()
    .then((data) => {
        printChart(data.data.bpi)
    })
    .catch((error) => {
        console.log(error)
    });
}

initDateInput.addEventListener('change', generateChart)