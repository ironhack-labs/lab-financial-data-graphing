const createChart = async () => {
  try {
    const response = await axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`);

    const bpiDates = Object.keys(response.data.bpi);
    const bpiPrices = Object.values(response.data.bpi);

    const ctx = document.getElementById('myChart').getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: bpiDates,
        datasets: [{
          label: 'Stock price',
          backgroundColor: 'rgb(224, 224, 210)',
          borderColor: 'rgb(171, 171, 135)',
          data: bpiPrices
        }]
      }
    })
  }

  catch (error) {
    console.log(error);
  }
      
}

createChart();

