



/*const startDate = '2016-12-01'
const endDate = '2017-02-05'*/

function drawChart(xData,yData){
    const ctx = document.getElementById('myChart').getContext('2d')
    const myChart = new Chart(ctx,{
        type: 'line',
        data: {
            labels: xData,
            datasets: [
                {
                    label:'bitcoin value',
                    data: yData,
                    backgroundColor:'white',
                    borderColor: 'black',
                    borderWidth:1

                }
            ]
        }
    })
}

const selectedStartDate = document.getElementById('start-date')
const selectedEndDate = document.getElementById('end-date');

const filter = document.getElementById('filter')

function showChart() {
    const startDate = selectedStartDate.value;
    const endDate = selectedEndDate.value;

    const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;

axios.get(apiUrl)
  .then((responseFromApi) => {
      console.log(responseFromApi)
      const xData= Object.keys(responseFromApi.data.bpi)
      const yData = Object.values(responseFromApi.data.bpi)
      console.log(xData)
      console.log(yData)
      drawChart(xData,yData)
  })
  .catch(err =>('Error occurred while getting the data: ',err));
}

filter.addEventListener('change',event =>{
    event.preventDefault()
    showChart()
})
showChart()

