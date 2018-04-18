const api_url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(api_url)
  .then(res => {
    console.log(Object.keys(res.data.bpi));
    console.log(Object.values(res.data.bpi));
    res.data });
