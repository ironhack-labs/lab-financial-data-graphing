document.addEventListener(
  'DOMContentLoaded',
  () => {
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=2022-05-01&end=2022-06-01")
      .then((responseFromAPI) => {
        console.log('The response from API: ', responseFromAPI.data.bpi);

        const data = {
          datasets: [{
            label: 'BTC',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: responseFromAPI.data.bpi,
          }]
        };

        const config = {
          type: 'line',
          data: data,
          options: {}
        };
      

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    )
})
      .catch((err) => console.log('Error while getting the data: ', err));



  })