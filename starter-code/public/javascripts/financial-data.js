document.addEventListener("DOMContentLoaded",() => {
  let filterFrom="";
  let filterTo="";
  let currency="";
  
  function updateChart() {
    reqString="http://api.coindesk.com/v1/bpi/historical/close.json?start="+filterFrom+"&end="+filterTo+"&currency="+currency;
    //reqString="http://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-01-02";
    //console.log(reqString);
    
    axios.get(reqString).then(response => {
      // console.log(response);
      printTheChart(response.data.bpi);
    })
    .catch( error => {
      console.log(error);
    });
  }
  
  
  
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then(response => {
        // console.log(Object.keys(response.data.bpi));
        // console.log(Object.values(response.data.bpi));

        filterFrom=Object.keys(response.data.bpi)[0];
        filterTo=Object.keys(response.data.bpi)[Object.keys(response.data.bpi).length-1];
        
        document.getElementById("dateFrom").value=filterFrom;
        document.getElementById("dateTo").value=filterTo;
        
        console.log("Received Dates: "+filterFrom+","+filterTo);
        
        printTheChart(response.data.bpi);
        
        document.getElementById("dateFrom").addEventListener("change", function() {
          filterFrom=document.getElementById("dateFrom").value;
          console.log("changed Date Filter to "+filterFrom+"..."+filterTo);
          updateChart();
        });
      
        document.getElementById("dateTo").addEventListener("change", function() {
          filterTo=document.getElementById("dateTo").value;
          console.log("changed Date Filter to "+filterFrom+"..."+filterTo);
          updateChart();
        });

        document.getElementById("currency").addEventListener("change", function() {
          currency=document.getElementById("currency").value;
          console.log("changed Currency Filter to "+currency);
          updateChart();
        })
      })
      .catch( error => {
        console.log(error);
    });


  const printTheChart = (coinData => {
    const coinLabels = Object.keys(coinData);//coinData.map(element => Object.keys(element));
    const coinPrice = Object.values(coinData);//coinData.map(element => Object.values(element));
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinLabels,
        datasets: [{
          label: "Coin Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinPrice,
        }]
      }
    });
    chart.canvas.aspectRatio=0.5;
  }); 

    
  

  

 /*  document.getElementsByClassName("dateFilter").addEventListener("change", function() {
    console.log("changed DateFilter");
  }) */

  /* const dateFrom = document.getElementById("dateFrom");
  console.log(dateFrom); */



});