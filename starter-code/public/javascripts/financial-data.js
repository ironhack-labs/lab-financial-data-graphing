axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(res => {
    console.log(res);
    let labels = Object.keys(res.data.bpi);
    let datas = Object.values(res.data.bpi);
    console.log(datas);
    let data = res.data.bpi;
    let arr = [];
    for (const el in data) {
      arr.push({
        x: el,
        y: data[el]
      })
    }
    console.log(arr)

    let ctx = document.getElementById("chart").getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: datas
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        }
      }
    })

    let dateFrom = document.getElementById('from').addEventListener('input', function (evt) {
      let from = evt.target.value;
      let to = document.getElementById('to').value;
      getNewData(chart, from, to);
    });

    let dateTo = document.getElementById('to').addEventListener('input', function (evt) {
      let to = evt.target.value;
      let from = document.getElementById('from').value;
      getNewData(chart, from, to);
    });
  })

let getNewData = (chart, start, end) => {
  console.log("console log aqui", chart.data)
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(res => {
      let labels = Object.keys(res.data.bpi);
      let datas = Object.values(res.data.bpi);
      updateDates(chart, labels, datas)
    })
}

const updateDates = (chart, labels, data) => {
  chart.data.labels = labels;
  chart.data.datasets[0] = {data};
  chart.update();
  console.log(chart)
}