const baseUrl = "https://api.coindesk.com/v1/bpi";

axios
  .get(`${baseUrl}/historical/close.json`)
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console - log("Error al recuperar datos de API de coindesk");
  });