const printTheChart = (coinData) => {
  // first get the daily data
  const dataFromDB = coinData.data.bpi;
  console.log(dataFromDB);

  // for the x axis
  const dataDates = Object.keys(dataFromDB);

    // Y axis
  const dataPrices = Object.values(dataFromDB);

  const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataDates,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: dataPrices
                }

            ]
        }
    })

};

//axios request

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json?start=<VALUE>&end=<VALUE>")
  .then((response) => {
    printTheChart(response);
  })
  // console.log(response.data.bpi))
  .catch((error) => {
    console.log(error);
  });

// X axis is the date which is:
//const dataDate = response.data.bpi
// Y axis
// const = response.data.bpi
