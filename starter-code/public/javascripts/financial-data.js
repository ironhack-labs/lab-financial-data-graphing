axios.get('http://api.coindesk.com/v1/bpi/historical/close.json', {responseType: 'json'}).then(response=>{
  console.log(response.data);
})
