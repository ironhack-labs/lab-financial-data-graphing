const coinDeskService = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

async function getHistoricalData() {
  let result = "";

  await coinDeskService
  .get()
  .then( response => {
    result = response.data;
  })
  .catch( error => console.log(`ERROR: ${error}`));

  return result;
}

async function getHistoricalDataByDate(dateA, dateB) {
  let result = "";

  await coinDeskService
  .get('', {
    params: {
      start: dateA,
      end: dateB
    }
  })
  .then( response => {
    result = response.data;
  })
  .catch( error => console.log(`ERROR: ${error}`));

  return result;
}