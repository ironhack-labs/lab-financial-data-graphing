
//iteracion 1 Axios reference
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')

//iteracion 1 You have to create an Axios Request to this URL and get the date. Use a console.log() to be sure that we are getting the correct data
 //.then(function (response) {
   //console.log(response);

   //iteracion 2 Give the correct format to the data we get in the Iteration 1 to show it in a line chart

   console.log(response.data.bpi);
 
   const labels = Object.keys(response.data.bpi);
   const datas = Object.values(response.data.bpi);
 
     var ctx = document.getElementById("myChart").getContext('2d');
 
     var myLineChart = new Chart(ctx, {
         type: 'line',
         data: {
           labels: labels,
           datasets: [{ 
               data: datas,
               label: "Bitcoin Price Index",
               borderColor: "#3e95cd",
               fill: true
             }]
         },
         options: {
           title: {
             display: true,
             text: 'Bitcoins'
           }
         }
       });
 })

 .catch(function (error) {
   console.log(error);
 });