
document.addEventListener(

  "DOMContentLoaded",
  () => {
  

    var fromDate = document.querySelector('#fromDate')
    var toDate = document.querySelector('#toDate')

    var currency = document.querySelector('#currency')


    fromDate.addEventListener('change', function(){
      fromDate.value = this.value;
      console.log(fromDate.value)
      newCanvas();
      getData()
      
    })
    toDate.addEventListener('change', function(){
      toDate.value = this.value;
      console.log(toDate.value)
      newCanvas();
      getData()
      
    })

    currency.addEventListener('change', function(){
      currency.value = this.value;
      console.log(currency.value)
      newCanvas();
      getData()
      
    })

    getData();
    function getData(){

    
  const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate.value}&end=${toDate.value}&currency=${currency.value}`
    axios
    axios.get(apiUrl)
    .then(responseFromAPI => {

      printTheChart(responseFromAPI.data)
    })
    .catch(err => console.log('Error while getting the data: ', err));
  }

   
  function printTheChart(stockData) {

    const ctx = document.getElementById('myChart').getContext('2d');
     chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bitcoin Price',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockData.bpi
          }
        ]
      }
    }); 
    
  } 

  function newCanvas(){
    const canvas = document.querySelector('#myChart');
    const canvasContainer = document.querySelector('#ctn-canvas')
    canvas.remove()
    canvasContainer.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`;

  }
  

    console.log("lab-financial-data-graphing JS imported successfully!");
  },
  false
);


