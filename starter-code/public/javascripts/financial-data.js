// coinDesk required endPoint

const endpoint = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const getData = async (endpoint) => {
  const {data} = await axios.get(endpoint);
  const {bpi} = data;
  const labels = Object.keys(bpi);
  const values = Object.values(bpi);
  return {
    labels,
    values,
  };
};

const ctx = document.getElementById('chart').getContext('2d');
const data = getData(endpoint);

const drawLineChart = async (ctx, data) => {
  const {labels, values} = await data;
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'lala',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(0,0,0)',
          data: values,
        }
      ],
    },
  });
  return chart;
};
drawLineChart(ctx, data);