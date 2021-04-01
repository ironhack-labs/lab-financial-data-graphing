let startDate = '2021-03-01';
let endDate = '2021-03-31';
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios
  .get(apiUrl)
  .then((responseFromAPI) => {
    const dailyData = responseFromAPI.data.bpi;
    printChart(dailyData);
  })
  .catch((error) => {
    console.log('There has been an error ===> ', error);
  });

function printChart(data) {
  const context = document.getElementById('myChart').getContext('2d');

  context.clearRect(0, 0, 1600, 1000);

  const timeAxisValues = Object.keys(data);
  const chartValues = timeAxisValues.map((element) => {
    return data[element];
  });
  const chart = new Chart(context, {
    type: 'line',

    data: {
      labels: timeAxisValues,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: chartValues,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}

document.getElementById('startDate').addEventListener('input', function () {
  startDate = document.getElementById('startDate').value;
  const newUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  axios
    .get(newUrl)
    .then((responseFromAPI) => {
      const dailyData = responseFromAPI.data.bpi;
      printChart(dailyData);
    })
    .catch((error) => {
      console.log('There has been an error ===> ', error);
    });
});

document.getElementById('endDate').addEventListener('input', function () {
  endDate = document.getElementById('endDate').value;
  const newUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
  axios
    .get(newUrl)
    .then((responseFromAPI) => {
      const dailyData = responseFromAPI.data.bpi;
      printChart(dailyData);
    })
    .catch((error) => {
      console.log('There has been an error ===> ', error);
    });
});
