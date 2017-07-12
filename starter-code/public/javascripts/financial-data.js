$.ajax({
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  method: "GET",
  success: showMeTheMoney,
  error: thereIsNoMoney
});

function showMeTheMoney(response) {
  console.log(response);
}

function thereIsNoMoney(error) {
  console.log(error);
}
