axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    handleErrors(error);
  });

  function handleErrors(err) {
    if (err.response) {
      console.log('Problem with the response', err.response.status);
    }  else if (err.request) {
      console.log('Problem with the request');
    } else {
      console.log('Error', err.message);

    }
  }
