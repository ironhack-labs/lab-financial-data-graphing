const baseUri = 'https://api.coindesk.com/v1/bpi/historical/close.json';
let uri = baseUri;
const onDateChange = (e) => {
  if (e) {
    // on first run this is empty
    uri = `${baseUri}?start=${iniDateDom.value}&end=${endDateDom.value}`;
  }
  axios
    .get(uri)
    .then((response) => printChart(response.data))
    .catch((err) => console.log(err));
};
onDateChange();

const iniDateDom = document.querySelector('#iniDate');
const endDateDom = document.querySelector('#endDate');
const ctx = document.querySelector('#myChart').getContext('2d');
let ctxChart;

const printChart = (coindeskData) => {
  const chartData = coindeskData.bpi;
  const labelsData = Object.keys(chartData);
  const valuesData = Object.values(chartData);
  const chartLabel = 'Bitcoin price Index';
  //console.log(chartData);

  if (ctxChart) {
    ctxChart.destroy();
  } else {
    // on first run this is applied.
    iniDateDom.value = labelsData[0];
    endDateDom.value = labelsData[labelsData.length - 1];
    // after setting the first value so it does not trigger twice
    iniDateDom.onchange = onDateChange;
    endDateDom.onchange = onDateChange;
  }

  ctxChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelsData,
      datasets: [
        {
          label: chartLabel,
          backgroundColor: 'rgb(149, 165, 166)',
          borderColor: 'rgb(149, 165, 166)',
          data: valuesData,
        },
      ],
    },
  });
};
