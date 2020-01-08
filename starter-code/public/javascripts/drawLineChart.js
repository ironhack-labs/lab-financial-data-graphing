export const drawLineChart = async (ctx, data) => {
  const {labels, values} = await data;
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'last month price Index',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(0,0,0)',
          data: values,
        },
      ],
    },
  });
  return chart;
};