

let elem1 = document.getElementById("start");
let elem2 = document.getElementById("end");
let elemCurr = document.getElementById("currency");
//DEFAULT DATES
let startdate = '2018-08-01';
let enddate = '2018-08-31';
let curr = 'USD';
elem1.addEventListener('input', (evt) => {
    startdate = evt.target.value;
    getFinancial().then(prices => 
        printTheChart(prices)
        );

});

elem2.addEventListener('input', (evt) => {
    enddate= evt.target.value;
    getFinancial().then(prices => 
        printTheChart(prices)
        );
});

elemCurr.addEventListener('change', (evt) => {
    curr = evt.target.value;
    getFinancial().then(prices => 
        printTheChart(prices)
        );
});


const getFinancial = () => {
 return axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startdate}&end=${enddate}&currency=${curr}`)
  .then(res =>  {
    return {
        dates: Object.keys(res.data.bpi),
        prices: Object.values(res.data.bpi)
    } 
      
  }).catch(e => console.log(e));
}

getFinancial().then(prices => 
    printTheChart(prices)
    );


let printTheChart = ((myObject) => {

    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: myObject.dates,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: myObject.prices,
        }]
      }
    });
  });
