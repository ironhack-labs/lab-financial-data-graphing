

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
.then((data) => {
  const arrDate = Object.keys(data.data.bpi);
  const arrValue = Object.values(data.data.bpi)
  

    // renderHTMLIronhack(new CountryData(data.data[0].name, data.data.bpi))




  const ctx = document.getElementById('myChart').getContext('2d');



  const chart = new Chart(ctx, {
     // The type of chart we want to create
     type: 'line',

     // The data for our dataset
     data: {
         labels: arrDate,
         datasets: [{
             label: "My First dataset",
             backgroundColor: 'rgb(255, 99, 132)',
             borderColor: 'rgb(255, 99, 132)',
             data: arrValue,
         }]
     },

     // Configuration options go here
     options: {}
  });

})