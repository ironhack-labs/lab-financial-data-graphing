axios.interceptors.response.use(config => {return config.data})

axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(data => console.log(data))
  .catch(error => console.error(error))