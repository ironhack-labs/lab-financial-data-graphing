document.addEventListener('DOMContentLoaded', () => {
  setTimeout(apiRequest,5000)
  //Javascript se comunica con el 
  function apiRequest(){
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(result=>{
      console.log(result)
    })
    .catch(e=>{
      console.log(e)
    })
  }
  console.log('Financial Data Graphing!');

}, false);
