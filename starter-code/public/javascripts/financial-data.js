function makeCurrencyAJAXRequest() {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
      .then((currencyData) => {
          //renders the data obtained and passes it to the view renderer
          //we are instantiating a CurrencyData object, so we can have the information in one place
          console.log(currencyData)
      })
      .catch((err)=> {console.log(err)});
}
 makeCurrencyAJAXRequest();