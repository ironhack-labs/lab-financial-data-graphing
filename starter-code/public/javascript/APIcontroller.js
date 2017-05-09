function coinDeskinfo() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {
      let data = JSON.parse(response);

      console.log(Object.keys(data.bpi));
      console.log(Object.values(data.bpi));

    },
    error: function (err) {
      console.log(err);
    },
  })
}

coinDeskinfo();
