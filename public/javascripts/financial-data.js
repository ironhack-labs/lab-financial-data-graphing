
const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

let start_Date = document.getElementById('start-date');
let end_Date = document.getElementById('end-date');

function getResponse(url){
axios
    .get(url)
    .then (responseFromAPI => {
        printTheChart(responseFromAPI.data)})
    .catch(err => console.log('Error while getting the data: ', err)); 
}

function printTheChart(btPriceData) {
    const intervalData = btPriceData['bpi'];

    const datesInterval = Object.keys(intervalData);
    const pricesInterval = datesInterval.map(date => intervalData[date]);
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: datesInterval,
        datasets: [
          {
            label: 'Bitcoin Prince Index',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(233,233,233)',
            data: pricesInterval
          }
        ]
      }
    });
  }

    getResponse(apiUrl);

    function filterData() {
      const urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start_Date.value}&end=${end_Date.value}`;
      getResponse(urlFilter);
    }
    
    start_Date.addEventListener("change", () => {
      if (end_Date.value) {
        filterData();
      }
    });
    
    end_Date.addEventListener("change", () => {
      if (start_Date.value) {
        filterData();
      }
    });


const currency = document.getElementById("currency");

function changeCurrency() {
  const currencyUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency.value}`;
  getResponse(currencyUrl);
}

currency.addEventListener("change", () => {
  changeCurrency();
});