document.addEventListener(

  "DOMContentLoaded",
  () => {

    axios
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(responseFromAPI => {
      printTheChart(responseFromAPI.data);
    })
    .catch(err => console.log('Error while getting the data: ', err));
   
  function printTheChart(stockData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bitcoin Price',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockData.bpi
          }
        ]
      }
    }); 
  } 
    console.log("lab-financial-data-graphing JS imported successfully!");
  },
  false
);


