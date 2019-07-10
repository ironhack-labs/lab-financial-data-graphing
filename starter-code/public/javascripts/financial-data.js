const stockInfo  = axios.create({
//   baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json',
});

let max = 0;
let min = 99999999;
let maxElem = document.getElementById('max');
let minElem = document.getElementById('min');

stockInfo.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then( (response) => {
    printTheChart(response.data);
  })
  .catch( (error) => {
    console.log(error);
  });
  
const printTheChart = (stockData => {
  const arr = Object.entries(stockData.bpi);
  const arrLabels = [];
  const arrPrices = [];
  arr.forEach((array) => {
    arrLabels.push(array[0]);
		arrPrices.push(array[1]);
		if (max < array[1]) {
			max = array[1];
			maxElem.innerHTML = max;
		}
		if (min > array[1]) {
			min = array[1];
			minElem.innerHTML = min;
		}
  });
  const ctx = document.getElementById('myCanvas').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: arrLabels,
      datasets: [{
        label: 'Stock Chart',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: arrPrices,
      }],
    },
  });
});

const printData = (dateBegin, dateEnd) => {
  stockInfo.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateBegin}&end=${dateEnd}&currency=USD`)
    .then((response) => {
      printTheChart(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
};

const printCurrency = (currency) => {
  stockInfo.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`)
		.then((response) => {
			printTheChart(response.data);
		})
		.catch((err) => {
			console.log(err)
		})
}

document.getElementById('theButton').onclick = function(){
  const dateBegin = document.getElementById('dateBegin').value;
  const dateEnd = document.getElementById('dateEnd').value;
  printData(dateBegin, dateEnd);
};

document.getElementById('currency').onchange = function(){
	const currency = document.getElementById('currency').value;
	printCurrency(currency)
}