
  const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

  function requestCoinPromise(coinID) {
    return $.ajax({
      url: `${baseURL}`,
      dataType: 'json',
    }).then(data => {
      let coin = data;
      console.log(coin);
    });
  }


  requestCoinPromise();
