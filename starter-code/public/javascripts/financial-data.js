const stockInfo  = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
});


// const stock = "data";

// function getStockInfo(startDate, endDate) {
stockInfo.get('http://api.coindesk.com/v1/bpi/historical/close.json')
.then(response => {
    var key = '';
    var value = '';
    for ( [key, value] of Object.entries(response.data.bpi)) {
      // console.log(`${key} ${value}`);
      console.log(key);
      $('#stocky').append(`Date: ${key} | Price: ${value} <br>`);
    }

})
.catch(error => {
  console.log(error);
});

// }