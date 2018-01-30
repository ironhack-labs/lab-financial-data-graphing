
//Add the Axios reference in the HTML through CDN to be able to use it
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')

//You have to create an Axios Request to this URL and get the date. Use a console.log() to be sure that we are getting the correct data
 .then(function (response) {
   console.log(response);
 })
 .catch(function (error) {
   console.log(error);
 });