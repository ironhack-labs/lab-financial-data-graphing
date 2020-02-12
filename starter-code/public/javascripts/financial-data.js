axios({
  method: "GET",
  url: "/http://api.coindesk.com/v1/bpi/historical/close.json",
  params: "URL parameters to be sent with the request"
})
  .then(response => {
    console.log(response)
    // Here we can do something with the response object
  })
  .catch(err => {
    console.log(error)
    // Here we catch the error and display it
  });