const ctx = document.getElementById("chart");

const getBitcoinPriceIndex = (url = "https://api.coindesk.com/v1/bpi/historical/close.json" ) => {
  
  axios.get(url)
  .then( res => {

    const { bpi } = res.data;
    //const dates = Object.keys(bpi);
    //const prices = dates.map( date => bpi[date] )

    //console.log(typeof dates, typeof prices)
    printChart(bpi);
    
  })
  .catch(err => console.log("Error while getting the data: ", err));

}

const printChart = (bpiData) => {

  const dates = Object.keys(bpiData);
  const prices = dates.map( date => bpiData[date] )

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: prices
        }
      ]
    }
  });

}

getBitcoinPriceIndex();