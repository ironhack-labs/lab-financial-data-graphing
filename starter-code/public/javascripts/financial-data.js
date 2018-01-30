
//iteracion 1 Axios reference
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')

//iteracion 1 You have to create an Axios Request to this URL and get the date. Use a console.log() to be sure that we are getting the correct data
 .then(function (response) {
   console.log(response);
 })
 .catch(function (error) {
   console.log(error);
 });