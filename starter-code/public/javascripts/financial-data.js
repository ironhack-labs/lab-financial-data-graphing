axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
.then((x) => {
   console.log(x)
   const data= x.data.bpi
   console.log(data);
})