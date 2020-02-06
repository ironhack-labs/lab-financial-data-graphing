axios.get('http://api.coindesk.com/v1/bpi/historical/close.json').then(response => {
  // console.log(response.data);
  const coinDataList = response.data.bpi;
  let dates = [];
  let values = [];
  for (let coinData in coinDataList) {
    dates.push(coinData);
    values.push(coinDataList[coinData]);
    // console.log(dates);
  }
  // console.log(Object.values(coinDataList));

  console.log(values);
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...dates],
      datasets: [
        {
          label: 'Coin Data',
          data: [...values],
        },
      ],
    },
  });
  console.log(response.data);
});
