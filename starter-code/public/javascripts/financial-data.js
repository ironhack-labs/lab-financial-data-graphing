/* let keys;
let values;
document.addEventListener('DOMContentLoaded', () => {

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`).then(res=>{
        keys = Object.keys(res.data.bpi);
        values = Object.values(res.data.bpi);
        console.log(window.keys);
    })
  
  }, false);

  module.exports = {keys, values}; */