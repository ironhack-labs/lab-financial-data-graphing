const myUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`
//GET data from API

axios.get(myUrl)
.then((response) =>{
   console.log(response.data)
})
.catch((e) => console.log(`Error getting data: `, e));
