var ticket;
    document.getElementById("applyDates").onchange = function (e) {
      ticket = e.value
      draw()
    }
    
    
    let start = document.querySelector("#dateStart")
    let end = document.querySelector("#dateEnd")
    
    document.querySelector("#applyDates").onclick = function (){
      draw();
    }
    
    // var companiesColors = {
    //   amzn: "#ffcc0099",
    //   micr: "#0044ff99"
    // }
    function draw() {
      axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start.value}&end=${end.value}`)
        .then(bitCoinData => {

          bitCoinData = bitCoinData.data
          const X1 = Object.keys(bitCoinData.bpi)
          const Y1 = Object.values(bitCoinData.bpi)
          console.log(X1,Y1)
          const ctx = document.getElementById('bitcointchart').getContext('2d');
          const chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: X1,
              datasets: [{
                label: "Stock Chart",
                borderWidth: 3,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132, 0.5)',
                data: Y1,
              }]
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }