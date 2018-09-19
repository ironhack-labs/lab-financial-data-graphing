// var ctx = document.getElementById("btcChart").getContext('2d');
// eventlister the start y end
// pasar el start y end a Data(start y end)

startDate = $('#startDate').change( () => {
    res.val()
  });
  
  console.log(startDate);
  
  
  
  let data = (startDate, endDate) => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then( res => {
      data = res.data.bpi;
      let labels = Object.keys(data)
      let values = Object.values(data)
      console.log(labels)
      console.log(values)
    
      let ctx = document.getElementById("btcChart").getContext('2d');
      let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Bitcoin Price",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: values,      
          }]
        }
      })  
    }) 
  }
  
  data()
  
  
  // for (i = 0; i < data.length; i++) {
  //   console.log(data.keys)
  // }
  
  
  
  
  
  
  // var myLineChart = new Chart(ctx, {
  //     type: 'line',
  //     data: Object.data().,
  // });