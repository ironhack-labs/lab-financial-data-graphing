let getDate = (lastMonth = false) => {
  let date = new Date();
  let day = date.getDate();
  if(day < 10){
    day = "0"+day
  }
  let month = date.getMonth() +1;
  if (lastMonth){
    month = date.getMonth();
  }
  if(month <10){
    month = "0"+month
  }
  return date.getFullYear()+"-"+month+"-"+day
}

document.getElementById("from").value = getDate(true)
document.getElementById("to").value = getDate()

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(res => {

    let labels = Object.keys(res.data.bpi);
    let datas = Object.values(res.data.bpi);
    let data = res.data.bpi;
    let arr = [];
    for (const el in data) {
      arr.push({
        x: el,
        y: data[el]
      })
    }

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
        },
        responsive: false
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

  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(res => {
      let labels = Object.keys(res.data.bpi);
      let datas = Object.values(res.data.bpi);
      updateDates(chart, labels, datas)
    })
}

const updateDates = (chart, labels, data) => {
  chart.data.labels = labels;
  chart.data.datasets[0] = {
    data
  };
  chart.update();
}

