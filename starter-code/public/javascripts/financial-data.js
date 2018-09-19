const getData = () => {
    return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then( res => {
        printTheChart(res.data.bpi)    
    }).catch(e => console.log(e));
}

let printTheChart = ((datos) => {
    
    let stockLabels = Object.keys(datos)
    let stockPrice = Object.values(datos)
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Bicoin Price Index",
          backgroundColor: 'rgb(234, 242, 255)',
          borderColor: 'rgb(165, 217, 255)',
          data: stockPrice,
        }]
      }
    });
  });

document.getElementById("date-form").onsubmit = function() {
  event.preventDefault();

  const dataInfo = {
    startDate: document.getElementById("from-date").value,
    endDate: document.getElementById("to-date").value
  };
  axios.post(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
  .then(res => {
    printTheChart(dataInfo)  
  })
  .catch(e => {
    console.log(e);
    
  })
}

document.addEventListener("change", (e) => { 
  console.log(document.getElementById("from-date").value);
  const dataInfo = {
    startDate: document.getElementById("from-date").value,
    endDate: document.getElementById("to-date").value
  };
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dataInfo.startDate}&end=${dataInfo.endDate}`)
  .then(res => {
    printTheChart(res.data.bpi) 
    console.log(res);
     
  })
  .catch(e => {
    console.log(e);
    
  })
  
})





 getData();



    
  