window.onload = function() {
  function ajaxrequest() {
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then(data => {
        console.log(data);
      });
  }

  function getDataFromApi() {
    ajaxrequest();
  }

  document.getElementById("getData").onclick = getDataFromApi;
};
