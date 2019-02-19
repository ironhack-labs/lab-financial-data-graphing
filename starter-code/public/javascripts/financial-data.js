


function onChange(e) {
  e.preventDefault()
  let from = document.getElementById('date-from').value
  let end = document.getElementById('date-end').value
  let currency = document.getElementById('currency').value
  console.log(currency);
  drawChart(from, end, currency)

}

function drawChart(start, end, currency) {
  let uri = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency || "USD"}&`
  let today = getDate()

  // console.log(today);
  if (!!start && !!end) {
    uri += `start=${start}&end=${end}`;
  } else if (!!start) {
    uri += `start=${start}&end=${today}`
  } else if (!!end) {
    uri += `end=${end}&start=2010-06-01`
  }

  console.log(uri);

  axios.get(uri).then(res => {
    // console.log(res)
    let data = Object.values(res.data.bpi);
    let max = Math.max(...data);
    let min = Math.min(...data);
    document.getElementById('max').innerText = max
    document.getElementById('min').innerText = min

    var ctx = document.getElementById("canvas").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(res.data.bpi),
        datasets: [{
          label: 'Price',
          data,
          borderWidth: 1
        }]
      },
    });
  });
}

function getDate(){
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  let yyyy = today.getFullYear()

  if (dd < 10){
    dd = '0' + dd
  }
  if (mm < 10 ){
    mm = '0' + mm
  }
  return yyyy + '-' + mm +'-'+ dd
}
drawChart("2018-01-01", "2018-03-24");
