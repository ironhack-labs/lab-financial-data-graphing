const myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`
//GET data from API

axios.get(myUrl)
.then((response) =>{
  
   const datesSerie = Object.keys(response.data.bpi);
   const valuesSerie = Object.values(response.data.bpi);
   paintBitcoinHistoric(datesSerie,valuesSerie);
 
})
.catch((e) => console.log(`Error getting data: `, e));

const paintBitcoinHistoric = (xAxis,yAxis) =>{

    const ctx = document.getElementById("my-chart").getContext("2d");

    const myLineChart = new Chart(ctx, {
        type: 'line',
         data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label:`Bitcoin Price Index`,
                borderColor:'grey',
                backgroundColor: 'transparent'
            }

            ]
        },

     
    });
}
