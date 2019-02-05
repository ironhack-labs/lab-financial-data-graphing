const coinInfo = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/',
   });

   coinInfo.get(`/historical/close.json`)
   .then((response) => {
     printTheChart(response.data);
   })
   .catch((error) => {
     console.log(error);
   }); 

const printTheChart = (coinData =>{
    const coinLabels = [];
    const coinValues = [];
    for (key in coinData.bpi){
        coinLabels.push(key);
        coinValues.push(coinData.bpi[key]);
    }

    console.log(coinLabels);
    console.log(coinValues);

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinLabels,
        datasets: [{
          label: "Bitcoin",
          backgroundColor: 'rgb(25, 9, 132)',
          borderColor: 'rgb(25, 9, 132)',
          data: coinValues,
        }]
      }
    });
})