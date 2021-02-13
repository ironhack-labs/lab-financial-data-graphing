
const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`
let from;
let to;

const apiRequest = (url) => {
    axios.get(url)
      .then((response) => {
        const {data} = response
        let xAxis = Object.keys(data.bpi);
        let yAxis = Object.values(data.bpi);
        drawChart(xAxis,yAxis)
      })
      .catch((error) => {
        console.log(error);
      })
}



  //DRAW CHART
  const drawChart= (xAxis,yAxis) => {
    const ctx = document.getElementById("myChart").getContext("2d")

    const chart = new Chart(ctx, {
        type: 'line',
        // The data for our dataset
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Bitcoin Price Index',
                borderColor: 'rgb(255, 99, 132)',
                data: yAxis
            }]
        },
        // Configuration options go here
        options: {}
    })
  }

  //Show default dates at the beggining
  apiRequest(apiUrl) 

  //Change values when change input field
  document.getElementById('from__date').addEventListener('change', () => {
     from = document.getElementById('from__date').value
     refreshChart()
  })
  document.getElementById('to__date').addEventListener('change', () => {
     to = document.getElementById('to__date').value  
     refreshChart()
  })

  //Refresh chart with new values if both inputs are changed
  const refreshChart = () => {
    if(to != undefined && from !=undefined){
        apiRequest(`${apiUrl}?start=${from}&end=${to}`)
    }else{
        apiRequest(apiUrl)  
    }
  }
  



