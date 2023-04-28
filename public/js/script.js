document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-financial-data-graphing JS imported successfully!");
    let dateFromVal = '2013-04-13';
    let dateToVal = '2023-02-15';
    let currencyVal = 'USD'
    // let currency = 
    let newChart; // Create a variable to hold the chart instance
    async function getPrices(dateFrom, dateTo, currency){
     const dataFromApi = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dateFromVal}&end=${dateToVal}`)
     .then(response => {
      const data = response.data;
      const labels = Object.keys(data.bpi);
      const values = Object.values(data.bpi);
      const minVal = Math.min(...values)
      const maxVal = Math.max(...values);
      console.log(minVal);
      console.log(maxVal);
      
      const ctx = document.getElementById('newChart').getContext('2d');
      newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bitcoin Price',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
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
      })
      const maxInput = document.getElementById('maxPrice').innerHTML = `${maxVal} ${currency}`
      const minInput = document.getElementById('minPrice').innerHTML = `${minVal} ${currency}`
     })
     .catch(err => {
      console.error("There was an error", err);
     })
  }

  getPrices(dateFromVal, dateToVal, currencyVal)
  

  const dateTo = document.getElementById('dateTo')
  dateTo.addEventListener('change', (event) => {
    dateToVal = event.target.value;
    if (newChart) {
      newChart.destroy(); // Call destroy method on the chart instance
    }
    getPrices(dateFromVal, dateToVal, currencyVal)
  })

  const dateFrom = document.getElementById('dateFrom')
  dateFrom.addEventListener('change', (event) => {
    dateFromVal = event.target.value;
    if (newChart) {
      newChart.destroy(); // Call destroy method on the chart instance
    }
    getPrices(dateFromVal, dateToVal, currencyVal)
  })

  const currency = document.getElementById('currency');
  currency.addEventListener('change', (event) => {
    currencyVal = event.target.value;
    console.log(event.target.value);
    if(newChart){
      newChart.destroy();
    }
    getPrices(dateFromVal, dateToVal, currencyVal)
  })
  },
  false
);