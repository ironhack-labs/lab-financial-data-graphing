

axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
  .then((data) => {
    console.log(data)
  });
