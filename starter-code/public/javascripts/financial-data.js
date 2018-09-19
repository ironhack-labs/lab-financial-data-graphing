$(document).ready(function () {
  const coindesk = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical'
  })

  let startDate;
  let endDate;
  const Dates = () => {
    startDate = $("#start").val();
    endDate = $("#end").val();
  }
  let currency = 'EUR';

  let printTheChart = ((obj, keyDate, valuePrice) => {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: keyDate,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: valuePrice,
        }]
      }
    });
  })

 const print = () => {
  Dates();
  getCoin();
 }

  let getCoin = () => coindesk.get(`close.json?start=${startDate}&end=${endDate}`)
    .then(response => {
      const obj = response.data.bpi;
      const keyDate = Object.keys(obj);
      const valuePrice = Object.values(obj);

      printTheChart(obj, keyDate, valuePrice);


    }).catch(err => {
      console.log(err)
    })

  print();
  
  document.getElementById('buton').addEventListener('click', () => {
      print();
  }, false);
});