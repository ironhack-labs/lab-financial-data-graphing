axios({
  method: "GET",
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
})
  .then(response => {
    // Here we can do something with the response object
  })
  .catch(err => {
    // Here we catch the error and display it
  });

document.querySelector('#button').onclick = function () {
  const response = axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  response.then(res => console.log(res))
};