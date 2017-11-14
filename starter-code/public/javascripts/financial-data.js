$( document ).ready(function() {

  axios({
   method:'get',
   url:'http://api.coindesk.com/v1/bpi/historical/close.json',
   responseType:'json'
  }).then(function(response) {
     //console.log(response);
     let data= response.data.bpi;

     let label= Object.keys(data);
     let value= Object.values(data);

     console.log(data);
   //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));

   let ctx = document.getElementById("myChart").getContext('2d');
   let myChart = new Chart(ctx, {
       type: 'line',
       data: {
           labels:label,
           datasets: [{
               label: '# of Votes',
               data: value,
               backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 206, 86, 0.2)',
                   'rgba(75, 192, 192, 0.2)',
                   'rgba(153, 102, 255, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                   'rgba(255,99,132,1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
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
   });













  });







// end of $ document
});
