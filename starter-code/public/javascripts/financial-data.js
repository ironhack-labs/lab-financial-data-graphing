
axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
.then(response => {
  const dates = Object.keys(response.data.bpi);
  console.log("dates: " + dates);
  const values = Object.values(response.data.bpi)
  console.log("values: " + values);
})
.catch(err => {
  console.error("Error API", err);
});



