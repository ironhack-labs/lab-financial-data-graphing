

const getData = () => {
    return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
    .then( res => {
    
            console.log(res)
        
     }).catch(e => console.log(e));
  }
  

getData()