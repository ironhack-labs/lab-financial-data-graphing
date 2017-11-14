$( document ).ready(function() {
    console.log( "ready!" );
    axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
      .then(function(response){
        console.log(response.data.bpi);        
      }).catch(e => {
    console.log(e);
  });
});
