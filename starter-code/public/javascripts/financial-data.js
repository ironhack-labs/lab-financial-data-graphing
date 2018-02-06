axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=")
.then((data)=> {
 console.log(data);
})
.catch((error)=> {
  console.log(error);
});

  