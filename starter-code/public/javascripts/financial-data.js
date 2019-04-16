axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));
