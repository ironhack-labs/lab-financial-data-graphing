let url = 'http://api.coindesk.com/v1/bpi/historical/close.json';

function getData(url) {
  fetch(url)
  .then(res => {
    if(!res.ok) return Promise.reject(res.statusText);
    return res.json()
  })
  .then(data=>{
    console.log(data);
    sendData(data);
  })
  .catch(e=>console.log(e))
}

getData(url)

function sendData(dataObj) {
  var dates = Object.keys(dataObj.bpi)
  var values = Object.values(dataObj.bpi)
  console.log(dates, values)
  draw(dates, values)
}


function draw(dates, values) {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: "BPI Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,
          }]
        }
      });
}




