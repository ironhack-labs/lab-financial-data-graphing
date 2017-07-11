$(document).ready(() => {
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json`;
  console.log("Hello");
  $.ajax({url:baseURL, dataType:'json'}).then(data => console.log(data));
});
