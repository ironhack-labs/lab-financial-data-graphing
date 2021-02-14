const myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

// min date max date


let initDate = document.getElementById('init-date')
let endedDate = document.getElementById('ended-date')


//GET the data
const coindeskRequest = (url) => {
console.log(`url`, url)
axios.get(url)
.then((response) => {

    const datesSerie = Object.keys(response.data.bpi);
    initDate.value = datesSerie[0];
    endedDate.value = datesSerie[datesSerie.length-1];    
    const valuesSerie = Object.values(response.data.bpi);
    paintBitcoinHistoric(datesSerie, valuesSerie);

})
.catch((e) => console.log(`Error getting data: `, e));


}

// paint the chart
const paintBitcoinHistoric = (xAxis, yAxis) => {

    const ctx = document.getElementById("my-chart").getContext("2d");
    
    const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                data: yAxis,
                label: `Bitcoin Price Index`,
                borderColor: 'grey',
                backgroundColor: 'transparent'
            }
    
            ]
        },
    
    
    });
    }
// filer request
    const filterRequest = (() => {
     //   let initDate = document.getElementById('init-date').value
     //   let endedDate = document.getElementById('ended-date').value

 //       if (!initDate.value) {initDate.value = minDate}

   //     if (!endedDate.value) { endedDate.value = maxDate}
        const url = myUrl+`?start=${initDate.value}&end=${endedDate.value}` 
        
        coindeskRequest(url);

    });    

  // call  request
    coindeskRequest(myUrl);

 

    // listener initial date
    document.getElementById('init-date').addEventListener('change', function (event) {
   //     console.log(`Entra en listener init date`)
        filterRequest();



    });

    // listener ended date
    document.getElementById('ended-date').addEventListener('change', function (event) {
     //   console.log(`Entra en listener ended date`)
        filterRequest();
    });





