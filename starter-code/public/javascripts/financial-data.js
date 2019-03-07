//my API 
axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then(response => printTheChart(response.data.bpi))
        //console.log(response.data.bpi))
    .catch(error => console.log(error));

const printTheChart = stockData => {

    //Object.keys= gets keys of object = date ; Object.values = gets value of objects
    const stockLabels = Object.keys(stockData);
    const stockPrice = Object.values(stockData);


    //myChart = canvas
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx,
         {type: 'line',
          data: {
            labels: stockLabels,
            datasets: [{
                label: "Whatever",
                backgroundColor: 'rgb(245, 187, 66)',
                borderColor: 'rgb(25, 99, 22)',
                data: stockPrice, }]
        }
    })
}


