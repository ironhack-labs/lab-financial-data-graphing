const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

axios.get(apiUrl)
  .then((response) => {
    const {data} = response
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  })