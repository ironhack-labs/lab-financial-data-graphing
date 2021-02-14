const apiUrl ="http://api.coindesk.com/v1/bpi/historical/close.json"


axios.get(apiUrl)
    .then(response => {
        //console.log(response.data);
        const {data} = response;
        const xAxis = Object.keys(data["bpi"]);
        const yAxis = Object.values(data["bpi"]);
        paintData(xAxis,yAxis)

})
    .catch(err => console.log('Error while getting the data: ', err))

   const paintData = (xAxis,yAxis)=> {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:xAxis,
           datasets:[{
               label: 'Date',
               data:yAxis,
               borderColor:'red'
           }]

        }
    })
   }
    
    