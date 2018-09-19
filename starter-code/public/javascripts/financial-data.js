

const getFinancial = () => {
 return axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(res =>  {  
    return {
        dates: Object.keys(res.data.bpi),
        prices: Object.values(res.data.bpi)
    } 
      
  }).catch(e => console.log(e));
}

getFinancial().then(prices => 
    printTheChart(prices)
    );


let printTheChart = ((myObject) => {
    console.log(myObject.prices);
    console.log(myObject.dates);

    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: myObject.dates,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: myObject.prices,
        }]
      }
    });
  });
