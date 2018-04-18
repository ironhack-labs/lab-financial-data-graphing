const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios.get(api_url)
  .then(res => console.log(res.data))
  //.then(data => data.map(e => ({ date: e.date, close: e.close })))
  //.then(closes => drawChart(closes));