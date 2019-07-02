axios
.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then((datos) => {
   console.log(datos.data)
    const x = Object.keys(datos.data.bpi)
    const y = Object.values(datos.data.bpi)

    printChart(x, y)

}).catch(err => console.log(err));

const printChart = ((x, y) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            label: "Bitcoin Price Index",
            data: y,
            showLines: true
        }]
      },
    });
  })

  document.getElementById("check").onclick = () => {
      let ini = document.getElementById("from").value
      let end = document.getElementById("to").value

      axios
      .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${ini}&end=${end}`)
      .then((datos) => {
         console.log(datos.data)
          const x = Object.keys(datos.data.bpi)
          const y = Object.values(datos.data.bpi)
      
          printChart(x, y)
      
      })
      
      const printChart = ((x, y) => {
          const ctx = document.getElementById('myChart').getContext('2d');
          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: x,
              datasets: [{
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  label: "Bitcoin Price Index",
                  data: y,
                  showLines: true
              }]
            },
          });
        })
  }


