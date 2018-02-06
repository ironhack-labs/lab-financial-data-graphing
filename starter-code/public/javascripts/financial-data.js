function main () {
  axios({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json'
    // params: 'URL parameters to be sent with the request'
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
}

window.onload = main;
