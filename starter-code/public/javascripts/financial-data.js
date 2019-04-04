window.onload = function () {

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
        .then(result => {
            printTheChart(result.data.bpi);
            console.log(result.data.bpi);
        })
        .catch(err => {
          console.log(err);
        });

        const printTheChart = (currencyData => {
            const date = Object.entries(currencyData).map( element => element[0]);
            const price = Object.entries(currencyData).map( element => element[1]);
            const ctx = document.getElementById('myChart').getContext('2d');
            const chart = new Chart(ctx, {
              type: 'line',
              data: { 
                  labels: date,
                  datasets: [{
                    label: "Currency Chart",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: price,  
                }]
              }
            });
          });

document.getElementById("checkbtn").addEventListener('click', function(){
    const start=document.getElementById('from').value;
    const end =document.getElementById('to').value;

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(result => {
      printTheChart(result.data.bpi);
    })
    .catch(err => {
      console.log(err);
    });
})

document.getElementById("changebtn").addEventListener('click', function(){

    const currency =document.getElementById('currency')
   const currencyvalue = currency.options[currency.selectedIndex].value;

    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyvalue}`)
    .then(result => {
      printTheChart(result.data.bpi);
    })
    .catch(err => {
      console.log(err);
    });

});

}

   
    
    
    