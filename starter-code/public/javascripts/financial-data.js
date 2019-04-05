var url = 'http://api.coindesk.com/v1/bpi/historical/close.json'


/* GET home page */
  axios.get(url)
    .then(result => {
      //console.log(result.data.bpi)
      printTheChart(result)
    })
    .catch(err => console.log(err))


function printTheChart(something){
      //get keys and values from Object:
      const value = Object.values(something.data.bpi)
      const date = Object.keys(something.data.bpi)
      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: date,
          datasets: [{
            label: "Bitcoin price index",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: value,
          }]
        }
      });
    };

    // Add a listener to this input to search the data every time that its values changes.
     // Add the dates  to the API URL to get the correct data.
    document.getElementById("submitDate").addEventListener("click", function(){
      debugger

      const start = document.getElementById("startDate").value;
      const end = document.getElementById("endDate").value;
      // var urlDate = 
      // console.log(urlDate)
      
      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then(result => {
        console.log(result.data.bpi)
        printTheChart(result)
      })
      .catch(err => console.log(err))
    });

   

  

    

 