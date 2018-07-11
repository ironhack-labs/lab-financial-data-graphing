

axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(res => {
    console.log(res.data)
    let arrDate = Object.keys(res.data.bpi);
    console.log(arrDate);
    let arrVal = Object.values(res.data.bpi);
    console.log(arrVal);

  })
  .catch(err => console.log(err));

  