const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const printTheChart = valueData => {
    //console.log(valueData);
    const dailyValue = valueData.bpi;
    const valueDates = Object.keys(dailyValue);
    //console.log(valueDates)
    const coinValue = Object.values(dailyValue);
    //console.log(coinValue)
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: valueDates,
            datasets: [{
                label: 'Bitcoin Chart',
                data: coinValue,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

axios
    .get(apiUrl)
    .then(response => {
        //console.log(response.data);
        printTheChart(response.data);
    })
    .catch(err => {
        console.log('Error while getting the data', err);
    })

    const updateInput = () => {
        console.log(`hello`)
        // get the dates from the input field , dom manipaltion 
      const startDate =  document.getElementById('start-date').value
        const endDate = document.getElementById('end-date').value;
        console.log(startDate)
        // create a url  using the start date and end date
        const newApiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
        // use url to call the api
        axios
        .get(newApiUrl)
        .then(response => {
            printTheChart(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
  
    console.log(document.querySelector('#start-date'))
    document.querySelector('#start-date').addEventListener('change', updateInput)
    document.querySelector('#end-date').addEventListener('change', updateInput)
