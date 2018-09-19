
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then( res => {console.log(res);
    let labels = Object.keys(res.data.bpi);
    let datas = Object.values(res.data.bpi);
    console.log(datas);
    let data = res.data.bpi;
    let arr = [];
    for (const el in data){
      arr.push({
        x: el,
        y: data[el]
      })
    }
    console.log(arr)
    
    let ctx = document.getElementById("chart").getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {labels, 
            datasets:[{data:datas}]},
      options:   {legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }}
     /*  data: arr,
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 1000000
                }
            }]
        }
    } */
    })
    console.log(chart)
  } ) 

