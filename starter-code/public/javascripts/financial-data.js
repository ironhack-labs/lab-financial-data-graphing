//HTTP request
axios({
  //"The HTTP method (verb) we are going to use"
  method: 'get',
  //"The url the server is going to receive."
  url: '/',
  //"URL parameters to be sent with the request" 
  params: {ID: 12345}
})
.then(response => {
  //Here we can do whatever we want with the response object
  console.log('On fire');
})
.catch(err => {
  //Here we catch the error and display it
  console.log(err);
})

axios.get('/')
  .then((response) => {
    console.log(response.headers.date);
    //console.log(response.status);
    //console.log(response.statusText);
    //console.log(response.headers);
    //console.log(response.config);
  });
