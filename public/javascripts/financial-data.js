const from = document.querySelector('.from');
const to = document.querySelector('.to');
const select = document.getElementById('currency');

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


const printChart = (data) => {
    const ctx = document.getElementById('canvas').getContext('2d');
    let dates = Object.keys(data);
    let prices = Object.values(data);
    let currentCurrency = currency.value;

    let min = document.querySelector('.min');
    let max = document.querySelector('.max');
    
    min.innerHTML = `Min: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: `${currentCurrency}` }).format( Math.min(...prices))}`
    max.innerHTML = `Max: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: `${currentCurrency}` }).format( Math.max(...prices))}`

    console.log(dates, prices);
    chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin Price Index",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: prices
            }
          ]
        }
      })
   }

   const getData = () => {
        // const select = document.querySelector('.currency').value;
         let currentFrom = from.value;
         let currentTo = to.value;
         let currentCurrency = currency.value;
        //Axios get request to BITCOIN INDEX API
    
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${currentFrom}&end=${currentTo}&currency=${currentCurrency}`)
        .then( bpi => {
            let data = bpi.data.bpi;
            printChart(data);
        })
        .catch(error => {
            console.log(error);
        });
   }


to.addEventListener('change', getData);
from.addEventListener('change', getData);
select.addEventListener('change', getData);